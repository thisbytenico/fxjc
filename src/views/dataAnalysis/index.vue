<template>
    <div class="analysis-screen" :class="{ 'is-loading': loading }">
        <div v-if="errorMessage" class="data-error" role="alert">{{ errorMessage }}</div>

        <main v-if="dashboard" class="dashboard-grid">
            <section class="screen-panel subject-panel">
                <header class="panel-heading"><i></i><h2>主体情况分析</h2><span></span></header>
                <div class="subject-overview">
                    <div class="subject-totals">
                        <div class="metric-box blue-box">
                            <strong>{{ formatNumber(dashboard.subjects.total) }}</strong>
                            <span>主体总数(家) <small>活跃度 <b>{{ dashboard.subjects.activeRate }}%</b></small></span>
                        </div>
                        <div class="metric-box cyan-box">
                            <strong>{{ formatNumber(dashboard.subjects.recentActive) }}</strong>
                            <span>近7天活跃主体数(家)</span>
                        </div>
                    </div>
                    <div ref="subjectPieRef" class="subject-pie chart"></div>
                </div>
                <div class="subject-category-grid">
                    <article v-for="item in dashboard.subjects.categories" :key="item.name" class="subject-category">
                        <strong :style="{ color: item.color }">{{ formatNumber(item.value) }}</strong>
                        <span>{{ item.name }}(家)</span>
                        <div class="active-label"><span>活跃度</span><b>{{ item.activeRate }}%</b></div>
                        <div class="progress"><i :style="{ width: `${item.activeRate}%`, background: item.color }"></i></div>
                    </article>
                </div>
            </section>

            <section class="map-panel">
                <div class="map-stage">
                    <div class="map-location">
                        <span>当前位置：</span>
                        <button
                            v-for="(route, index) in mapRoutes"
                            :key="`${route.adcode}-${index}`"
                            type="button"
                            :disabled="index === mapRoutes.length - 1"
                            @click="goToMapRoute(index)"
                        >{{ route.displayName }}<em v-if="index < mapRoutes.length - 1">/</em></button>
                    </div>
                    <div ref="mapRef" class="china-map chart" aria-label="全国主体分布地图，点击行政区可下钻"></div>
                    <div class="map-pedestal" aria-hidden="true"></div>
                </div>
            </section>

            <section class="screen-panel trace-panel">
                <header class="panel-heading"><i></i><h2>追溯业务数据</h2><span></span></header>
                <div class="trace-content">
                    <article class="trace-card yellow-card">
                        <div><h3>{{ dashboard.traceability.production.label }}</h3><strong>{{ formatNumber(dashboard.traceability.production.value) }}<small>次</small></strong></div>
                        <dl><div><dt>{{ formatNumber(dashboard.traceability.production.lastYear) }}</dt><dd>去年同期</dd></div><div><dt>{{ dashboard.traceability.production.growth }}%</dt><dd>同比增长</dd></div></dl>
                    </article>
                    <article class="trace-card blue-card">
                        <div><h3>{{ dashboard.traceability.transaction.label }}</h3><strong>{{ formatNumber(dashboard.traceability.transaction.value) }}<small>次</small></strong></div>
                        <dl><div><dt>{{ formatNumber(dashboard.traceability.transaction.lastYear) }}</dt><dd>去年同期</dd></div><div><dt>{{ dashboard.traceability.transaction.growth }}%</dt><dd>同比增长</dd></div></dl>
                    </article>
                    <div ref="batchRankRef" class="batch-chart chart"></div>
                    <article class="trace-card cyan-card">
                        <div><h3>{{ dashboard.traceability.printed.label }}</h3><strong>{{ formatNumber(dashboard.traceability.printed.value) }}<small>次</small></strong></div>
                        <dl><div><dt>{{ formatNumber(dashboard.traceability.printed.lastYear) }}</dt><dd>去年同期</dd></div><div><dt>{{ dashboard.traceability.printed.growth }}%</dt><dd>同比增长</dd></div></dl>
                    </article>
                    <div ref="printRankRef" class="print-chart chart"></div>
                </div>
            </section>

            <section class="screen-panel certification-panel">
                <header class="panel-heading"><i></i><h2>认证主体总数</h2><span></span></header>
                <div class="certification-content">
                    <div class="certification-metric">
                        <strong>{{ formatNumber(dashboard.certifications.total) }}</strong>
                        <span>认证主体(家) <small>活跃度 <b>{{ dashboard.certifications.activeRate }}%</b></small></span>
                    </div>
                    <div class="certification-chart-row">
                        <div ref="certificationRef" class="certification-chart chart"></div>
                        <ul class="legend-list">
                            <li v-for="(item, index) in dashboard.certifications.industry" :key="item.name">
                                <i :class="`legend-${index}`"></i><span>{{ item.name }}：</span><b>{{ item.value }}</b>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <section class="screen-panel farming-panel">
                <header class="panel-heading"><i></i><h2>农事记录</h2><span></span></header>
                <div class="farming-content">
                    <div class="farming-chart-side">
                        <div class="farming-total"><strong>{{ formatNumber(dashboard.farming.total) }}</strong><span>农事记录(条)</span></div>
                        <div ref="farmingRef" class="farming-chart chart"></div>
                    </div>
                    <div class="news-board">
                        <h3>动态信息</h3>
                        <ul>
                            <li v-for="news in dashboard.farming.news" :key="`${news.time}-${news.text}`"><time>{{ news.time }}</time><span>{{ news.text }}</span></li>
                        </ul>
                    </div>
                </div>
            </section>

            <section class="screen-panel product-panel">
                <header class="panel-heading"><i></i><h2>追溯产品情况</h2><span></span></header>
                <div class="product-content">
                    <div class="product-top">
                        <div class="product-metric"><strong>{{ formatNumber(dashboard.products.varieties) }}</strong><span>追溯产品种类(种)</span></div>
                        <div ref="productPieRef" class="product-pie chart"></div>
                    </div>
                    <div class="product-bottom">
                        <div class="product-metric query-metric"><strong>{{ formatNumber(dashboard.products.queries) }}</strong><span>消费者查询总数(次)</span></div>
                        <div ref="queryRankRef" class="query-chart chart"></div>
                    </div>
                </div>
            </section>
        </main>

        <div v-else class="loading-state">数据加载中...</div>
    </div>
</template>

<script>
import { nextTick, onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import * as echarts from 'echarts';
import { getDataAnalysisDashboard, getDataAnalysisRegion } from '@/y_api/dataAnalysis';
import { SHOW_CHINA_MAP_NINE_DASH_LINE } from '@/config/dataAnalysis';

const CHART_COLORS = ['#31d3ae', '#f19a42', '#2faeea', '#f8ef51', '#51dce6'];
const CHINA_MAP_VIEW = {
    center: [104.3, 34.4],
    zoom: 1.2
};
const REGION_MAP_VIEW = {
    zoom: .9,
    layoutCenter: ['50%', '46%'],
    layoutSize: '90%'
};
const MAP_COLOR_PIECES = [
    { lte: 20000, color: '#0aa6df' },
    { gt: 20000, lte: 45000, color: '#0b96d7' },
    { gt: 45000, lte: 70000, color: '#08799f' },
    { gt: 70000, lte: 100000, color: '#0a8fce' },
    { gt: 100000, lte: 140000, color: '#0aa2dd' },
    { gt: 140000, color: '#0798d3' }
];
const PROVINCE_FILES = {
    北京: 'beijing', 天津: 'tianjin', 河北: 'hebei', 山西: 'shanxi', 内蒙古: 'neimenggu',
    辽宁: 'liaoning', 吉林: 'jilin', 黑龙江: 'heilongjiang', 上海: 'shanghai', 江苏: 'jiangsu',
    浙江: 'zhejiang', 安徽: 'anhui', 福建: 'fujian', 江西: 'jiangxi', 山东: 'shandong',
    河南: 'henan', 湖北: 'hubei', 湖南: 'hunan', 广东: 'guangdong', 广西: 'guangxi',
    海南: 'hainan', 重庆: 'chongqing', 四川: 'sichuan', 贵州: 'guizhou', 云南: 'yunnan',
    西藏: 'xizang', 陕西: 'shanxi1', 甘肃: 'gansu', 青海: 'qinghai', 宁夏: 'ningxia',
    新疆: 'xinjiang', 香港: 'xianggang', 澳门: 'aomen'
};

export default {
    name: 'DataAnalysis',
    setup() {
        const dashboard = ref(null);
        const loading = ref(true);
        const errorMessage = ref('');
        const subjectPieRef = ref(null);
        const mapRef = ref(null);
        const batchRankRef = ref(null);
        const printRankRef = ref(null);
        const certificationRef = ref(null);
        const farmingRef = ref(null);
        const productPieRef = ref(null);
        const queryRankRef = ref(null);
        const chartInstances = [];
        const mapRoutes = reactive([
            { level: 'country', displayName: '全国', mapName: 'china', adcode: '100000', url: '/lib/echart/map/china.json' }
        ]);
        let mapChart = null;
        let currentGeo = null;
        let destroyed = false;

        const formatNumber = value => Number(value || 0).toLocaleString('en-US');
        const tooltip = {
            trigger: 'item',
            backgroundColor: 'rgba(3, 20, 39, .94)',
            borderColor: '#36c9ef',
            textStyle: { color: '#fff', fontSize: 12 }
        };
        const initChart = (element, option) => {
            if (!element) return null;
            const chart = echarts.init(element);
            chart.setOption(option);
            chartInstances.push(chart);
            return chart;
        };
        const resizeCharts = () => chartInstances.forEach(chart => chart && !chart.isDisposed() && chart.resize());

        const pieOption = (data, colors, radius = ['54%', '76%']) => ({
            color: colors,
            tooltip,
            series: [{
                type: 'pie',
                radius,
                center: ['50%', '52%'],
                avoidLabelOverlap: true,
                itemStyle: { borderColor: '#dce9ed', borderWidth: 1 },
                label: { show: false },
                data
            }]
        });

        const axisText = { color: '#d8e5f2', fontSize: 12 };
        const subjectPieLabelLayout = params => {
            const width = subjectPieRef.value?.clientWidth || 220;
            const height = subjectPieRef.value?.clientHeight || 190;
            const radius = Math.min(width, height) * .67 / 2;
            const centerX = width * .67;
            const centerY = height * .52;
            const layouts = [
                { x: width * .14, y: height * .88, anchor: [centerX - radius * .35, centerY + radius * .92] },
                { x: 0, y: height * .58, anchor: [centerX - radius * .96, centerY + radius * .18] },
                { x: 0, y: height * .34, anchor: [centerX - radius * .78, centerY - radius * .55] },
                { x: 0, y: height * .12, anchor: [centerX - radius * .16, centerY - radius * .98] }
            ];
            const layout = layouts[params.dataIndex] || layouts[0];
            const lineEndX = layout.x + params.labelRect.width + 3;
            return {
                x: layout.x,
                y: layout.y,
                align: 'left',
                verticalAlign: 'middle',
                labelLinePoints: [layout.anchor, [lineEndX + 8, layout.y], [lineEndX, layout.y]]
            };
        };
        const initCharts = () => {
            const data = dashboard.value;
            initChart(subjectPieRef.value, {
                ...pieOption(data.subjects.industry, ['#2bd1ab', '#f09a42', '#2aa9e6', '#fff14f'], ['45%', '67%']),
                series: [{
                    ...pieOption(data.subjects.industry, [], ['45%', '67%']).series[0],
                    center: ['67%', '52%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: true,
                        color: '#ecf7ff',
                        fontSize: 11,
                        formatter: '{b}:{c}'
                    },
                    labelLine: { length: 8, length2: 6, lineStyle: { color: '#d9f8ff' } },
                    labelLayout: subjectPieLabelLayout,
                    data: data.subjects.industry
                }]
            });

            const rank = data.traceability.productionRank;
            initChart(batchRankRef.value, {
                tooltip: { ...tooltip, trigger: 'axis', axisPointer: { type: 'shadow' } },
                grid: { left: 8, right: 12, top: 10, bottom: 4, containLabel: true },
                xAxis: { type: 'value', max: 180000, splitNumber: 6, axisLabel: { color: '#526379', fontSize: 9 }, splitLine: { lineStyle: { color: 'rgba(105,140,175,.22)' } } },
                yAxis: { type: 'category', inverse: true, data: rank.map(item => item.name), axisLabel: axisText, axisTick: { show: false }, axisLine: { show: false } },
                series: [
                    { name: '生产批次', type: 'bar', stack: 'total', barWidth: 12, itemStyle: { color: '#269fdb' }, label: { show: true, position: 'insideRight', color: '#fff', fontSize: 8 }, data: rank.map(item => item.primary) },
                    { name: '交易批次', type: 'bar', stack: 'total', barWidth: 12, itemStyle: { color: '#e24a78' }, label: { show: true, position: 'insideRight', color: '#fff', fontSize: 8 }, data: rank.map(item => item.secondary) }
                ]
            });

            const printRank = data.traceability.printRank;
            initChart(printRankRef.value, {
                tooltip: { ...tooltip, trigger: 'axis', axisPointer: { type: 'shadow' } },
                grid: { left: 8, right: 40, top: 8, bottom: 4, containLabel: true },
                xAxis: { type: 'value', max: 100000, splitNumber: 5, axisLabel: { color: '#526379', fontSize: 9 }, splitLine: { lineStyle: { color: 'rgba(105,140,175,.22)' } } },
                yAxis: { type: 'category', inverse: true, data: printRank.map(item => item.name), axisLabel: axisText, axisTick: { show: false }, axisLine: { show: false } },
                series: [{ type: 'bar', barWidth: 12, data: printRank.map(item => item.value), itemStyle: { color: '#2bbac7', borderRadius: [0, 7, 7, 0] }, label: { show: true, position: 'insideRight', color: '#fff', fontSize: 8 } }]
            });

            initChart(certificationRef.value, pieOption(data.certifications.industry, CHART_COLORS, ['48%', '70%']));
            initChart(productPieRef.value, pieOption(data.products.distribution, ['#31d3ae', '#35b7f0', '#ffcc72'], ['49%', '72%']));

            initChart(farmingRef.value, {
                tooltip: { ...tooltip, trigger: 'axis' },
                grid: { left: 12, right: 8, top: 10, bottom: 0, containLabel: true },
                xAxis: { type: 'category', data: data.farming.categories.map(item => item.name), axisLabel: axisText, axisTick: { show: false }, axisLine: { lineStyle: { color: '#54708b' } } },
                yAxis: { type: 'value', max: 180000, splitNumber: 3, axisLabel: { color: '#5a7188', fontSize: 9 }, splitLine: { lineStyle: { color: 'rgba(80,118,153,.25)' } } },
                series: [{ type: 'bar', barWidth: 8, data: data.farming.categories.map(item => item.value), itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#65ecf2' }, { offset: .45, color: '#1f9fb7' }, { offset: 1, color: 'rgba(15,52,79,.15)' }]), borderRadius: [4, 4, 0, 0] } }]
            });

            initChart(queryRankRef.value, {
                tooltip: { ...tooltip, trigger: 'axis' },
                grid: { left: 6, right: 6, top: 6, bottom: 0, containLabel: true },
                xAxis: { type: 'category', data: data.products.queryRank.map(item => item.name), axisLabel: axisText, axisTick: { show: false }, axisLine: { lineStyle: { color: '#54708b' } } },
                yAxis: { type: 'value', max: 1000, splitNumber: 2, axisLabel: { color: '#5a7188', fontSize: 8 }, splitLine: { lineStyle: { color: 'rgba(80,118,153,.2)' } } },
                series: [{ type: 'bar', barWidth: 8, data: data.products.queryRank.map(item => item.value), itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#63edf0' }, { offset: 1, color: 'rgba(12,53,78,.08)' }]), borderRadius: [4, 4, 0, 0] } }]
            });
        };

        const regionValues = (geo, suppliedValues = []) => {
            const supplied = new Map(suppliedValues.map(item => [item.name, item.value]));
            return (geo.features || []).map((feature, index) => {
                const props = feature.properties || {};
                const seed = Number(String(props.adcode || feature.id || index).slice(-5));
                return { name: props.name, value: supplied.get(props.name) || 18000 + ((seed * 37 + index * 7919) % 82000) };
            });
        };

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
                    const properties = feature.properties || {};
                    includePoint(properties.centroid || properties.cp);
                });
            }
            return Number.isFinite(minX) ? [(minX + maxX) / 2, (minY + maxY) / 2] : undefined;
        };

        const mapUrl = route => {
            if (route.url) return route.url;
            if (route.level === 'province') return `/lib/echart/map/province/${PROVINCE_FILES[route.displayName]}.json`;
            if (route.level === 'city') return `/lib/echart/map/city/${route.adcode}.json`;
            return '';
        };

        const renderMap = async route => {
            try {
                let geo = route.geo;
                if (!geo) {
                    const response = await fetch(mapUrl(route));
                    if (!response.ok) throw new Error(`地图资源加载失败: ${response.status}`);
                    geo = await response.json();
                }
                if (route.level === 'country' && !SHOW_CHINA_MAP_NINE_DASH_LINE) {
                    geo = {
                        ...geo,
                        // ECharts will still add its complete South China Sea inset for maps named "china".
                        features: (geo.features || []).filter(feature => {
                            const properties = feature.properties || {};
                            return properties.adchar !== 'JD' && properties.adcode !== '100000_JD';
                        })
                    };
                }
                if (destroyed || !mapChart) return;
                currentGeo = geo;
                let remoteValues = [];
                if (route.level === 'country') {
                    remoteValues = dashboard.value.map.values;
                } else {
                    const response = await getDataAnalysisRegion({ adcode: route.adcode, level: route.level });
                    remoteValues = response && response.values ? response.values : [];
                }
                const values = regionValues(geo, remoteValues);
                const isCountry = route.level === 'country';
                const mapCenter = isCountry ? CHINA_MAP_VIEW.center : getGeoBoundsCenter(geo);
                echarts.registerMap(route.mapName, geo);
                const mapOption = {
                    animationDurationUpdate: 450,
                    tooltip: { ...tooltip, formatter: params => `${params.name}<br/>主体数：${formatNumber(params.value)} 家` },
                    visualMap: {
                        type: 'piecewise',
                        show: false,
                        dimension: 0,
                        pieces: MAP_COLOR_PIECES
                    },
                    series: [{
                        type: 'map', map: route.mapName, roam: true,
                        center: mapCenter,
                        zoom: isCountry ? CHINA_MAP_VIEW.zoom : REGION_MAP_VIEW.zoom,
                        layoutCenter: isCountry ? ['50%', '50%'] : REGION_MAP_VIEW.layoutCenter,
                        layoutSize: isCountry ? '100%' : REGION_MAP_VIEW.layoutSize,
                        scaleLimit: { min: .8, max: 4 },
                        label: { show: true, color: '#f5fbff', fontSize: route.level === 'country' ? 10 : 12, textShadowColor: '#024d79', textShadowBlur: 3 },
                        itemStyle: { areaColor: '#08a9dd', borderColor: '#b8f4ff', borderWidth: 1.2, shadowColor: 'rgba(0,190,255,.65)', shadowBlur: 9 },
                        emphasis: { label: { color: '#fff' }, itemStyle: { areaColor: '#32d3ed' } },
                        select: { disabled: true }, data: values
                    }]
                };
                mapChart.setOption(mapOption, true);
                if (!isCountry) {
                    const decodedGeo = echarts.getMap(route.mapName)?.geoJSON;
                    const preciseCenter = getGeoBoundsCenter(decodedGeo || geo);
                    if (preciseCenter) mapChart.setOption({ series: [{ center: preciseCenter }] });
                }
            } catch (error) {
                if (route.fallbackGeo) {
                    route.geo = route.fallbackGeo;
                    delete route.url;
                    renderMap(route);
                    return;
                }
                errorMessage.value = error.message || '地图数据加载失败';
            }
        };

        const drillMap = params => {
            if (!params || !params.name || !currentGeo) return;
            const current = mapRoutes[mapRoutes.length - 1];
            if (current.level === 'district') return;
            const feature = (currentGeo.features || []).find(item => (item.properties || {}).name === params.name);
            if (!feature) return;
            const props = feature.properties || {};
            const adcode = String(props.adcode || feature.id || '');
            if (current.level === 'country' && !PROVINCE_FILES[props.name]) return;
            const nextLevel = current.level === 'country' ? 'province' : current.level === 'province' ? 'city' : 'district';
            const singleGeo = { type: 'FeatureCollection', features: [feature] };
            const route = {
                level: nextLevel,
                displayName: props.name,
                mapName: `${nextLevel}-${adcode}`,
                adcode,
                fallbackGeo: singleGeo,
                geo: nextLevel === 'district' ? singleGeo : undefined
            };
            mapRoutes.push(route);
            renderMap(route);
        };

        const goToMapRoute = index => {
            if (index >= mapRoutes.length - 1) return;
            mapRoutes.splice(index + 1);
            renderMap(mapRoutes[index]);
        };

        const initMap = () => {
            mapChart = initChart(mapRef.value, {});
            mapChart.on('click', drillMap);
            renderMap(mapRoutes[0]);
        };

        onMounted(async () => {
            try {
                dashboard.value = await getDataAnalysisDashboard();
                await nextTick();
                initCharts();
                initMap();
                window.addEventListener('resize', resizeCharts);
            } catch (error) {
                errorMessage.value = error.message || '数据加载失败，请稍后重试';
            } finally {
                loading.value = false;
            }
        });

        onBeforeUnmount(() => {
            destroyed = true;
            window.removeEventListener('resize', resizeCharts);
            chartInstances.forEach(chart => chart && !chart.isDisposed() && chart.dispose());
        });

        return {
            dashboard, loading, errorMessage, formatNumber, mapRoutes, goToMapRoute,
            subjectPieRef, mapRef, batchRankRef, printRankRef, certificationRef,
            farmingRef, productPieRef, queryRankRef
        };
    }
};
</script>

<style lang="less" scoped>
* { box-sizing: border-box; }

.analysis-screen {
    width: 100%;
    height: 100%;
    min-width: 1200px;
    min-height: 0;
    overflow: auto;
    color: #f4f9ff;
    font-family: "Microsoft YaHei", "PingFang SC", sans-serif;
    background-color: #06162a;
    background-image:
        radial-gradient(circle at 52% 30%, rgba(25, 109, 166, .28), transparent 35%),
        radial-gradient(circle, rgba(116, 193, 241, .35) 1px, transparent 1.5px),
        linear-gradient(rgba(4, 21, 41, .5), rgba(4, 18, 35, .92));
    background-size: auto, 54px 54px, auto;
}

.dashboard-grid {
    width: 100%;
    height: 100%;
    min-height: 0;
    padding: 18px 20px 22px;
    display: grid;
    grid-template-columns: minmax(280px, 24.6%) minmax(520px, 1fr) minmax(280px, 24.6%);
    grid-template-rows: minmax(0, 1.82fr) minmax(0, 1fr);
    grid-template-areas:
        "subject map trace"
        "cert farming product";
    gap: 16px 18px;
}

.screen-panel {
    min-width: 0;
    min-height: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(35, 132, 197, .62);
    background: rgba(5, 22, 42, .76);
    box-shadow: inset 0 0 26px rgba(11, 85, 137, .12);
}

.subject-panel { grid-area: subject; }
.map-panel { grid-area: map; min-width: 0; min-height: 0; display: flex; flex-direction: column; }
.trace-panel { grid-area: trace; }
.certification-panel { grid-area: cert; }
.farming-panel { grid-area: farming; }
.product-panel { grid-area: product; }

.panel-heading {
    height: 35px;
    flex: 0 0 35px;
    padding: 0 7px;
    display: flex;
    align-items: center;
    gap: 8px;
    background: repeating-linear-gradient(45deg, rgba(20, 57, 92, .78) 0 18px, rgba(9, 37, 67, .78) 18px 36px);
    border-bottom: 1px solid rgba(36, 104, 159, .42);
}
.panel-heading i {
    position: relative;
    width: 18px;
    height: 18px;
    flex: 0 0 18px;
}
.panel-heading i::before,
.panel-heading i::after {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
    box-shadow: 0 0 5px rgba(48, 148, 239, .35);
}
.panel-heading i::before {
    top: 0;
    left: 4px;
    background: #1d65ad;
}
.panel-heading i::after {
    left: 4px;
    bottom: 0;
    background: #3289dc;
}
.panel-heading h2 { margin: 0; font-size: 21px; line-height: 1; letter-spacing: 0; text-shadow: 0 0 8px rgba(75, 176, 255, .45); }
.panel-heading span { width: 26px; height: 1px; margin-left: auto; background: #ffeb54; }

.chart { min-width: 0; min-height: 0; }
.subject-overview { flex: 0 0 190px; padding: 25px 13px 2px; display: flex; align-items: center; gap: 8px; }
.subject-totals { width: 47%; flex: 0 0 47%; display: flex; flex-direction: column; gap: 36px; }
.metric-box { padding: 7px 10px 8px; display: flex; flex-direction: column; border: 1px solid #47789b; border-radius: 7px; background: rgba(3, 17, 32, .9); box-shadow: 0 0 13px rgba(40, 176, 238, .22); }
.metric-box strong { font-family: Arial, sans-serif; font-size: 34px; font-weight: 700; line-height: .95; letter-spacing: 0; }
.metric-box > span { margin-top: 4px; font-size: 16px; white-space: nowrap; }
.metric-box small { font-size: 12px; font-weight: normal; }
.metric-box small b { color: #ff385e; }
.blue-box strong { color: #2dbcf7; }
.cyan-box { border-color: #168999; }
.cyan-box strong { color: #48e0e4; }
.subject-pie { flex: 1; width: auto; height: 100%; }

.subject-category-grid { flex: 1; min-height: 0; padding: 10px 34px 20px; display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; gap: 16px 40px; }
.subject-category { width: 100%; max-width: 156px; min-width: 0; justify-self: center; display: flex; flex-direction: column; align-items: center; justify-content: center; }
.subject-category > strong { font: 700 32px/1 Arial, sans-serif; }
.subject-category > span { margin-top: 2px; font-size: 18px; white-space: nowrap; }
.active-label { position: relative; z-index: 1; width: calc(100% - 28px); margin-top: 11px; display: flex; justify-content: space-between; color: #7f9bb1; font-size: 15px; }
.active-label::before { content: ''; position: absolute; top: -5px; right: -14px; left: -14px; z-index: -1; height: 42px; clip-path: polygon(7% 0, 93% 0, 100% 100%, 0 100%); border-bottom: 1px solid rgba(49, 152, 194, .45); background: linear-gradient(180deg, rgba(9, 39, 62, .12), rgba(13, 61, 88, .72)); box-shadow: inset 0 -8px 12px rgba(20, 113, 151, .12); }
.active-label b { color: #91aabe; font-weight: normal; }
.progress { position: relative; z-index: 1; width: calc(100% - 16px); height: 8px; margin-top: 6px; padding: 2px 4px; background: rgba(6, 30, 48, .96); border: 1px solid rgba(48, 103, 138, .8); transform: skew(-8deg); }
.progress i { display: block; height: 3px; box-shadow: 0 0 6px currentColor; }

.map-location { position: absolute; top: 8px; left: 8px; z-index: 3; height: 32px; display: flex; align-items: center; color: #dfe9f2; font-size: 19px; }
.map-location button { padding: 0; border: 0; color: #55cfff; font: inherit; background: transparent; cursor: pointer; }
.map-location button:disabled { color: #fff; cursor: default; }
.map-location em { padding: 0 6px; color: #7194ae; font-style: normal; }
.map-stage { position: relative; width: 100%; height: 100%; min-height: 0; overflow: hidden; display: flex; flex-direction: column; align-items: stretch; }
.china-map { position: relative; z-index: 1; flex: none; width: 100%; height: 100%; }
.map-pedestal { position: absolute; right: 6%; bottom: 2px; left: 6%; z-index: 0; height: 78px; pointer-events: none; border-radius: 50%; background: repeating-radial-gradient(ellipse, rgba(24, 183, 238, .32) 0 2px, rgba(7, 55, 91, .12) 4px 11px, transparent 13px 20px); border-bottom: 2px solid rgba(29, 151, 207, .32); transform: perspective(120px) rotateX(42deg); }

.trace-content { flex: 1; min-height: 0; padding: 12px 14px 10px; display: grid; grid-template-rows: 73px 73px minmax(0, 1fr) 73px minmax(0, 1fr); gap: 10px; }
.trace-card { min-height: 0; padding: 7px 13px; display: flex; align-items: center; justify-content: space-between; border: 1px solid #48708d; border-radius: 7px; background: rgba(5, 20, 37, .88); box-shadow: inset 0 0 12px rgba(71, 152, 197, .1); }
.trace-card h3 { margin: 0; font-size: 18px; font-style: italic; line-height: 1; }
.trace-card strong { display: block; margin-top: 4px; font: 700 30px/.95 "Arial Narrow", Arial, sans-serif; letter-spacing: 0; }
.trace-card strong small { margin-left: 5px; font: 14px "Microsoft YaHei"; }
.trace-card dl { margin: 0; display: flex; gap: 22px; text-align: center; }
.trace-card dl div { display: flex; flex-direction: column; }
.trace-card dt { font-size: 18px; font-weight: 700; }
.trace-card dd { margin: 2px 0 0; color: #bdc9d4; font-size: 14px; white-space: nowrap; }
.yellow-card strong { color: #f4ef38; }
.blue-card strong { color: #24aeea; }
.cyan-card { border-color: #168c9c; }
.cyan-card strong { color: #44e0e5; }
.batch-chart, .print-chart { width: 100%; height: 100%; }

.certification-content { flex: 1; min-height: 0; padding: 19px 30px 12px; display: flex; flex-direction: column; }
.certification-metric { width: 58%; padding: 8px 10px; display: flex; flex-direction: column; border: 1px solid rgba(192, 132, 72, .74); border-radius: 6px; background: rgba(8, 20, 34, .86); box-shadow: 0 0 14px rgba(232, 142, 61, .2); }
.certification-metric strong { color: #f0924e; font: 700 28px/1 "Arial Narrow", Arial, sans-serif; }
.certification-metric span { margin-top: 3px; font-size: 16px; }
.certification-metric small { font-size: 12px; }
.certification-metric b { color: #ff385e; }
.certification-chart-row { flex: 1; min-height: 0; display: flex; align-items: center; }
.certification-chart { width: 48%; height: 100%; }
.legend-list { flex: 1; margin: 0; padding: 0; list-style: none; font-size: 14px; }
.legend-list li { margin: 7px 0; display: flex; align-items: center; white-space: nowrap; }
.legend-list i { width: 9px; height: 9px; margin-right: 6px; background: #31d3ae; }
.legend-list .legend-1 { background: #f19a42; }.legend-list .legend-2 { background: #2faeea; }.legend-list .legend-3 { background: #f8ef51; }.legend-list .legend-4 { background: #51dce6; }
.legend-list b { font-weight: normal; }

.farming-content { flex: 1; min-height: 0; padding: 14px; display: grid; grid-template-columns: 30% minmax(0, 1fr); gap: 10px; }
.farming-chart-side { min-width: 0; display: flex; flex-direction: column; }
.farming-total { height: 67px; flex: 0 0 67px; display: flex; flex-direction: column; align-items: center; justify-content: center; border: 1px solid #3bb6ce; clip-path: polygon(7% 0, 93% 0, 100% 18%, 100% 80%, 92% 100%, 8% 100%, 0 80%, 0 18%); background: linear-gradient(90deg, rgba(11, 79, 102, .72), rgba(4, 31, 55, .9), rgba(11, 79, 102, .72)); }
.farming-total strong { color: #3ed8e6; font: 700 30px/1 "Arial Narrow", Arial, sans-serif; }
.farming-total span { margin-top: 4px; font-size: 17px; }
.farming-chart { flex: 1; width: 100%; }
.news-board { min-width: 0; display: flex; flex-direction: column; border: 1px solid #2a668e; }
.news-board h3 { height: 31px; margin: 0; padding: 5px 15px; font-size: 17px; background: rgba(29, 66, 103, .83); }
.news-board ul { flex: 1; min-height: 0; margin: 0; padding: 9px 18px; list-style: none; display: flex; flex-direction: column; justify-content: space-around; }
.news-board li { min-width: 0; display: flex; font-size: 16px; line-height: 1.25; white-space: nowrap; overflow: hidden; }
.news-board time { flex: 0 0 auto; margin-right: 7px; color: #5598d2; }
.news-board li span { overflow: hidden; text-overflow: ellipsis; }

.product-content { flex: 1; min-height: 0; padding: 10px 14px; display: grid; grid-template-rows: 1fr 1fr; gap: 5px; }
.product-top, .product-bottom { min-height: 0; display: grid; grid-template-columns: 48% 52%; align-items: center; }
.product-metric { min-width: 0; display: flex; flex-direction: column; align-items: center; text-align: center; }
.product-metric strong { color: #2daef1; font: 700 30px/1 "Arial Narrow", Arial, sans-serif; }
.product-metric span { margin-top: 6px; font-size: 17px; font-weight: 700; white-space: nowrap; }
.product-pie, .query-chart { width: 100%; height: 100%; }
.query-metric strong { color: #47dce5; font-size: 28px; }

.data-error { padding: 8px 18px; color: #ffd0d0; background: rgba(130, 23, 39, .88); text-align: center; }
.loading-state { min-height: 100%; display: flex; align-items: center; justify-content: center; color: #5adcea; font-size: 20px; }

@media (max-width: 1600px) {
    .dashboard-grid { padding: 10px 10px 12px; gap: 10px; grid-template-columns: minmax(270px, 24%) minmax(540px, 1fr) minmax(270px, 24%); }
    .panel-heading h2 { font-size: 18px; }
    .subject-overview { padding-left: 9px; padding-right: 9px; gap: 5px; }
    .subject-totals { width: 46%; flex-basis: 46%; }
    .metric-box { padding-left: 7px; padding-right: 7px; }
    .metric-box strong, .subject-category > strong { font-size: 26px; }
    .metric-box > span, .subject-category > span, .product-metric span { font-size: 14px; }
    .subject-category-grid { padding-left: 22px; padding-right: 22px; gap: 12px 24px; }
    .trace-card { padding-left: 9px; padding-right: 9px; }
    .trace-card h3, .trace-card dt { font-size: 15px; }
    .trace-card strong { font-size: 25px; }
    .trace-card dl { gap: 10px; }
    .certification-content { padding-left: 16px; padding-right: 16px; }
    .legend-list { font-size: 12px; }
    .farming-content { grid-template-columns: 31% minmax(0, 1fr); }
    .news-board li { font-size: 13px; }
    .product-metric strong, .query-metric strong { font-size: 24px; }
}
</style>
