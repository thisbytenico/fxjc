<template>
    <div class="region-drilldown-map">
        <nav class="map-location" aria-label="地图区域导航">
            <span>{{ breadcrumbLabel }}</span>
            <button
                v-for="(route, index) in routes"
                :key="`${route.adcode}-${index}`"
                type="button"
                :disabled="index === routes.length - 1"
                @click="goToRoute(index)"
            >{{ route.displayName }}<em v-if="index < routes.length - 1">/</em></button>
        </nav>
        <div ref="chartRef" class="map-chart" role="img" :aria-label="ariaLabel"></div>
        <div v-if="showPedestal" class="map-pedestal" aria-hidden="true"></div>
        <div v-if="loading" class="map-status">地图加载中...</div>
        <div v-else-if="errorMessage" class="map-status is-error" role="alert">{{ errorMessage }}</div>
    </div>
</template>

<script>
import { nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';
import * as echarts from 'echarts';

const PROVINCE_FILES = {
    北京: 'beijing', 天津: 'tianjin', 河北: 'hebei', 山西: 'shanxi', 内蒙古: 'neimenggu',
    辽宁: 'liaoning', 吉林: 'jilin', 黑龙江: 'heilongjiang', 上海: 'shanghai', 江苏: 'jiangsu',
    浙江: 'zhejiang', 安徽: 'anhui', 福建: 'fujian', 江西: 'jiangxi', 山东: 'shandong',
    河南: 'henan', 湖北: 'hubei', 湖南: 'hunan', 广东: 'guangdong', 广西: 'guangxi',
    海南: 'hainan', 重庆: 'chongqing', 四川: 'sichuan', 贵州: 'guizhou', 云南: 'yunnan',
    西藏: 'xizang', 陕西: 'shanxi1', 甘肃: 'gansu', 青海: 'qinghai', 宁夏: 'ningxia',
    新疆: 'xinjiang', 香港: 'xianggang', 澳门: 'aomen'
};

const LEVEL_ORDER = ['country', 'province', 'city', 'district'];

export default {
    name: 'RegionDrilldownMap',
    props: {
        data: { type: Array, default: () => [] },
        loadRegionData: { type: Function, default: null },
        colors: {
            type: Array,
            default: () => ['#0d2b5e', '#0e4a8e', '#1565c0', '#1976d2', '#42a5f5', '#64b5f6']
        },
        maxLevel: {
            type: String,
            default: 'district',
            validator: value => LEVEL_ORDER.includes(value)
        },
        mapAssetBase: { type: String, default: '/lib/echart/map' },
        breadcrumbLabel: { type: String, default: '当前位置：' },
        valueLabel: { type: String, default: '主体数' },
        valueUnit: { type: String, default: '家' },
        ariaLabel: { type: String, default: '全国主体分布地图，点击行政区可下钻' },
        showNineDashLine: { type: Boolean, default: false },
        showPedestal: { type: Boolean, default: true }
    },
    emits: ['error', 'region-click', 'route-change'],
    setup(props, { emit, expose }) {
        const chartRef = ref(null);
        const loading = ref(false);
        const errorMessage = ref('');
        const routes = reactive([]);
        let chart = null;
        let currentGeo = null;
        let destroyed = false;
        let requestId = 0;
        let resizeObserver = null;

        const rootRoute = () => ({
            level: 'country',
            displayName: '全国',
            mapName: 'china',
            adcode: '100000',
            url: `${props.mapAssetBase}/china.json`
        });

        const formatNumber = value => Number(value || 0).toLocaleString('en-US');

        const getGeoBoundsCenter = geo => {
            let minX = Infinity;
            let maxX = -Infinity;
            let minY = Infinity;
            let maxY = -Infinity;
            const includePoint = point => {
                if (!Array.isArray(point) || typeof point[0] !== 'number' || typeof point[1] !== 'number') return;
                minX = Math.min(minX, point[0]);
                maxX = Math.max(maxX, point[0]);
                minY = Math.min(minY, point[1]);
                maxY = Math.max(maxY, point[1]);
            };
            const visitCoordinates = coordinates => {
                if (!Array.isArray(coordinates)) return;
                if (typeof coordinates[0] === 'number' && typeof coordinates[1] === 'number') {
                    includePoint(coordinates);
                    return;
                }
                coordinates.forEach(visitCoordinates);
            };
            (geo.features || []).forEach(feature => visitCoordinates(feature.geometry?.coordinates));
            if (!Number.isFinite(minX)) {
                (geo.features || []).forEach(feature => {
                    const featureProps = feature.properties || {};
                    includePoint(featureProps.centroid || featureProps.cp);
                });
            }
            return Number.isFinite(minX) ? [(minX + maxX) / 2, (minY + maxY) / 2] : undefined;
        };

        const mapUrl = route => {
            if (route.url) return route.url;
            if (route.level === 'province') {
                const filename = PROVINCE_FILES[route.displayName];
                return filename ? `${props.mapAssetBase}/province/${filename}.json` : '';
            }
            if (route.level === 'city') return `${props.mapAssetBase}/city/${route.adcode}.json`;
            return '';
        };

        const loadGeo = async route => {
            if (route.geo) return route.geo;
            const url = mapUrl(route);
            if (!url) throw new Error(`未找到${route.displayName}的地图资源`);
            const response = await fetch(url);
            if (!response.ok) throw new Error(`地图资源加载失败: ${response.status}`);
            return response.json();
        };

        const normalizeValues = (geo, suppliedValues) => {
            const supplied = new Map((suppliedValues || []).map(item => [item.name, item.value]));
            return (geo.features || []).map(feature => {
                const name = (feature.properties || {}).name;
                return { name, value: supplied.has(name) ? supplied.get(name) : 0 };
            });
        };

        const loadValues = async route => {
            if (route.level === 'country') return props.data;
            if (!props.loadRegionData) return [];
            const response = await props.loadRegionData({
                adcode: route.adcode,
                level: route.level,
                name: route.displayName,
                routes: routes.map(item => ({
                    level: item.level,
                    displayName: item.displayName,
                    adcode: item.adcode
                }))
            });
            return Array.isArray(response) ? response : response?.values || [];
        };

        const createOption = (route, geo, suppliedValues) => {
            const values = normalizeValues(geo, suppliedValues);
            const maxValue = Math.max(...values.map(item => Number(item.value) || 0), 1);
            const isCountry = route.level === 'country';
            return {
                animationDurationUpdate: 450,
                tooltip: {
                    trigger: 'item',
                    backgroundColor: 'rgba(3, 20, 39, .94)',
                    borderColor: '#36c9ef',
                    textStyle: { color: '#fff', fontSize: 12 },
                    formatter: params => `${params.name}<br/>${props.valueLabel}：${formatNumber(params.value)} ${props.valueUnit}`
                },
                visualMap: {
                    type: 'continuous',
                    show: false,
                    min: 0,
                    max: maxValue,
                    dimension: 0,
                    inRange: { color: props.colors }
                },
                series: [{
                    type: 'map',
                    map: route.mapName,
                    roam: true,
                    center: isCountry ? [104.3, 34.4] : getGeoBoundsCenter(geo),
                    zoom: isCountry ? 1.2 : .9,
                    layoutCenter: isCountry ? ['50%', '50%'] : ['50%', '46%'],
                    layoutSize: isCountry ? '100%' : '90%',
                    scaleLimit: { min: .8, max: 4 },
                    label: {
                        show: true,
                        color: '#f5fbff',
                        fontSize: isCountry ? 10 : 12,
                        textShadowColor: '#024d79',
                        textShadowBlur: 3
                    },
                    itemStyle: {
                        areaColor: '#0d2b5e',
                        borderColor: 'rgba(0,180,255,.4)',
                        borderWidth: .8
                    },
                    emphasis: { label: { color: '#fff' }, itemStyle: { areaColor: '#00b4ff' } },
                    select: { disabled: true },
                    data: values
                }]
            };
        };

        const renderMap = async route => {
            const activeRequest = ++requestId;
            loading.value = true;
            errorMessage.value = '';
            try {
                let geo;
                try {
                    geo = await loadGeo(route);
                } catch (error) {
                    if (!route.fallbackGeo || route.geo) throw error;
                    route.geo = route.fallbackGeo;
                    geo = route.geo;
                }
                if (route.level === 'country' && !props.showNineDashLine) {
                    geo = {
                        ...geo,
                        features: (geo.features || []).filter(feature => {
                            const featureProps = feature.properties || {};
                            return featureProps.adchar !== 'JD' && featureProps.adcode !== '100000_JD';
                        })
                    };
                }
                const values = await loadValues(route);
                if (destroyed || !chart || activeRequest !== requestId) return;
                currentGeo = geo;
                echarts.registerMap(route.mapName, geo);
                chart.setOption(createOption(route, geo, values), true);
                if (route.level !== 'country') {
                    const decodedGeo = echarts.getMap(route.mapName)?.geoJSON;
                    const preciseCenter = getGeoBoundsCenter(decodedGeo || geo);
                    if (preciseCenter) chart.setOption({ series: [{ center: preciseCenter }] });
                }
                emit('route-change', {
                    current: { level: route.level, name: route.displayName, adcode: route.adcode },
                    routes: routes.map(item => ({ level: item.level, name: item.displayName, adcode: item.adcode }))
                });
            } catch (error) {
                if (activeRequest !== requestId || destroyed) return;
                errorMessage.value = error.message || '地图数据加载失败';
                emit('error', error);
            } finally {
                if (activeRequest === requestId) loading.value = false;
            }
        };

        const drillMap = params => {
            if (loading.value || !params?.name || !currentGeo) return;
            const current = routes[routes.length - 1];
            emit('region-click', {
                name: params.name,
                value: params.value,
                level: current.level,
                adcode: current.adcode
            });
            if (LEVEL_ORDER.indexOf(current.level) >= LEVEL_ORDER.indexOf(props.maxLevel)) return;
            const feature = (currentGeo.features || []).find(item => (item.properties || {}).name === params.name);
            if (!feature) return;
            const featureProps = feature.properties || {};
            const adcode = String(featureProps.adcode || feature.id || '');
            if (current.level === 'country' && !PROVINCE_FILES[featureProps.name]) return;
            const nextLevel = LEVEL_ORDER[LEVEL_ORDER.indexOf(current.level) + 1];
            const singleGeo = { type: 'FeatureCollection', features: [feature] };
            const route = {
                level: nextLevel,
                displayName: featureProps.name,
                mapName: `${nextLevel}-${adcode}`,
                adcode,
                fallbackGeo: singleGeo,
                geo: nextLevel === 'district' ? singleGeo : undefined
            };
            routes.push(route);
            renderMap(route);
        };

        const goToRoute = index => {
            if (index >= routes.length - 1) return;
            routes.splice(index + 1);
            renderMap(routes[index]);
        };

        const resize = () => {
            if (chart && !chart.isDisposed()) chart.resize();
        };

        const reset = () => {
            routes.splice(0, routes.length, rootRoute());
            return chart ? renderMap(routes[0]) : Promise.resolve();
        };

        watch(() => props.data, () => {
            if (routes[routes.length - 1]?.level === 'country') renderMap(routes[0]);
        }, { deep: true });

        watch(() => props.mapAssetBase, reset);
        watch(() => props.showNineDashLine, () => {
            const current = routes[routes.length - 1];
            if (current) renderMap(current);
        });

        onMounted(async () => {
            if (!routes.length) routes.push(rootRoute());
            await nextTick();
            chart = echarts.init(chartRef.value);
            chart.on('click', drillMap);
            if (typeof ResizeObserver !== 'undefined') {
                resizeObserver = new ResizeObserver(resize);
                resizeObserver.observe(chartRef.value);
            } else {
                window.addEventListener('resize', resize);
            }
            renderMap(routes[0]);
        });

        onBeforeUnmount(() => {
            destroyed = true;
            requestId += 1;
            resizeObserver?.disconnect();
            window.removeEventListener('resize', resize);
            if (chart && !chart.isDisposed()) chart.dispose();
        });

        expose({ resize, reset });

        return { chartRef, errorMessage, goToRoute, loading, routes };
    }
};
</script>

<style lang="less" scoped>
.region-drilldown-map {
    position: relative;
    width: 100%;
    height: 100%;
    min-width: 0;
    min-height: 0;
    overflow: hidden;
}

.map-location {
    position: absolute;
    top: 8px;
    left: 8px;
    z-index: 3;
    min-height: 32px;
    display: flex;
    align-items: center;
    color: #dfe9f2;
    font-size: 19px;
}

.map-location button {
    padding: 0;
    border: 0;
    color: #55cfff;
    font: inherit;
    background: transparent;
    cursor: pointer;
}

.map-location button:disabled { color: #fff; cursor: default; }
.map-location em { padding: 0 6px; color: #7194ae; font-style: normal; }
.map-chart { position: relative; z-index: 1; width: 100%; height: 100%; }

.map-pedestal {
    position: absolute;
    right: 6%;
    bottom: 2px;
    left: 6%;
    z-index: 0;
    height: 78px;
    pointer-events: none;
    border-radius: 50%;
    border-bottom: 2px solid rgba(29, 151, 207, .32);
    background: repeating-radial-gradient(ellipse, rgba(24, 183, 238, .32) 0 2px, rgba(7, 55, 91, .12) 4px 11px, transparent 13px 20px);
    transform: perspective(120px) rotateX(42deg);
}

.map-status {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 4;
    padding: 8px 12px;
    color: #5adcea;
    font-size: 14px;
    background: rgba(3, 20, 39, .82);
    transform: translate(-50%, -50%);
    pointer-events: none;
}

.map-status.is-error { color: #ffd0d0; }
</style>
