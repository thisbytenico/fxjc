<template>
    <div class="da-wrap">
        <div class="da-main">
            <!-- ====== 左栏 ====== -->
            <div class="da-left">
                <!-- 追溯业务情况 -->
                <div class="da-card">
                    <div class="da-card-hd">
                        <div class="hd-title-row">
                            <span class="hd-arrow"></span>
                            <span class="hd-title">追溯业务情况</span>
                        </div>
                    </div>
                    <div class="da-card-bd">
                        <div class="biz-item">
                            <div class="biz-icon blue">
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>
                            </div>
                            <div class="biz-info">
                                <div class="left">
                                    <div class="biz-val">984,320<span class="unit">次</span></div>
                                    <div class="biz-lbl">生产批次次数</div>
                                </div>
                                <div class="biz-cmp"><el-icon><Calendar /></el-icon>
                                    去年同期 <span class="cmp-val">2,280次</span> 
                                    同比增长 <span>3%</span><span class="up">▲</span></div>
                            </div>
                        </div>
                        <div class="biz-item">
                            <div class="biz-icon green">
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
                            </div>
                            <div class="biz-info">
                                <div class="left">
                                    <div class="biz-val">258,410<span class="unit">次</span></div>
                                    <div class="biz-lbl">交易批次次数</div>
                                </div>
                                <div class="biz-cmp"><el-icon><Calendar /></el-icon>
                                    去年同期 <span class="cmp-val">1,167次</span> 
                                    同比增长 <span>13%</span><span class="up">▲</span></div>
                            </div>
                        </div>
                        <div class="biz-item">
                            <div class="biz-icon purple">
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/></svg>
                            </div>
                            <div class="biz-info">
                                <div class="left">
                                    <div class="biz-val">984,320<span class="unit">张</span></div>
                                    <div class="biz-lbl">打印标签批次</div>
                                </div>
                                <div class="biz-cmp"><el-icon><Calendar /></el-icon>
                                    去年同期 <span class="cmp-val">2,152张</span> 
                                    同比增长 <span>-8%</span><span class="down">▼</span></div>
                            </div>
                        </div>
                        <div class="biz-item">
                            <div class="biz-icon yellow">
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/></svg>
                            </div>
                            <div class="biz-info">
                                <div class="left">
                                    <div class="biz-val">38,172<span class="unit">张</span></div>
                                    <div class="biz-lbl">打印个码标签</div>
                                </div>
                                <div class="biz-cmp"><el-icon><Calendar /></el-icon>
                                    去年同期 <span class="cmp-val">1,991次</span> 
                                    同比增长 <span>11%</span><span class="up">▲</span></div>    
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 追溯产品情况 -->
                <div class="da-card">
                    <div class="da-card-hd">
                        <div class="hd-title-row">
                            <span class="hd-arrow"></span>
                            <span class="hd-title">追溯产品情况</span>
                        </div>
                        <span class="hd-more">明细&gt;</span>
                    </div>
                    <div class="da-card-bd">
                        <div class="prod-summary">
                            <div class="prod-main">
                                <div class="left">
                                    <div class="biz-icon blue">
                                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
                                    </div>
                                </div>
                                <div class="right">
                                    <div class="prod-main-val">38,172<span class="unit">个</span></div>
                                    <div class="prod-main-lbl">追溯产品个数</div>
                                </div>
                            </div>
                            <div class="prod-subs">
                                <div class="prod-sub">
                                    <div class="prod-sub-lbl">种植业</div>
                                    <div class="prod-sub-val">2,367<span class="unit">个</span></div>
                                </div>
                                <div class="prod-sub">
                                    <div class="prod-sub-lbl">畜牧</div>
                                    <div class="prod-sub-val">3,906<span class="unit">个</span></div>
                                </div>
                                <div class="prod-sub">
                                    <div class="prod-sub-lbl">渔业</div>
                                    <div class="prod-sub-val">2,985<span class="unit">个</span></div>
                                </div>
                                <div class="prod-sub">
                                    <div class="prod-sub-lbl">其他</div>
                                    <div class="prod-sub-val">1,173<span class="unit">个</span></div>
                                </div>
                            </div>
                        </div>
                        <div class="chart-sub-title">追溯产品生产批次排名</div>
                        <div id="productChart" class="chart-box"></div>
                    </div>
                </div>

                <!-- 追溯种养面积 -->
                <div class="da-card">
                    <div class="da-card-hd">
                        <div class="hd-title-row">
                            <span class="hd-arrow"></span>
                            <span class="hd-title">追溯种养面积</span>
                        </div>
                    </div>
                    <div class="da-card-bd card-left-bottom">
                        <div class="area-item">
                            <div class="area-icon blue">
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 8C8 10 5.9 16.17 3.82 21H5.71c.28-.94.87-1.96 1.65-2.88C9.11 17.25 13.88 16 20 16v-2C17 14 13.5 12.5 10 12.5L17 8z"/></svg>
                            </div>
                            <div class="area-info">
                                <div class="area-val">92,043<span class="unit">亩</span></div>
                                <div class="area-lbl">种植业种植面积(亩)</div>
                            </div>
                        </div>
                        <div class="area-item">
                            <div class="area-icon orange">
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
                            </div>
                            <div class="area-info">
                                <div class="area-val">41,701<span class="unit">亩</span></div>
                                <div class="area-lbl">畜牧业养殖面积(亩)</div>
                            </div>
                        </div>
                        <div class="area-item">
                            <div class="area-icon green">
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93V18h-2v1.93C7.06 19.44 4.56 16.94 4.07 14H6v-2H4.07C4.56 9.06 7.06 6.56 10 6.07V8h2V6.07c2.94.49 5.44 2.99 5.93 5.93H16v2h1.93c-.49 2.94-2.99 5.44-5.93 5.93z"/></svg>
                            </div>
                            <div class="area-info">
                                <div class="area-val">10,584<span class="unit">亩</span></div>
                                <div class="area-lbl">渔业养殖面积(亩)</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ====== 中栏 ====== -->
            <div class="da-center">
                <!-- 顶部四卡片 -->
                <div class="entity-row">
                    <div class="entity-card gold">
                        <div class="ec-icon-wrap gold">
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg>
                        </div>
                        <div class="ec-info">
                            <div class="ec-val">350,094<span class="ec-unit">家</span></div>
                            <div class="ec-lbl">生产经营主体总数</div>
                        </div>
                    </div>
                    <div class="entity-card orange">
                        <div class="ec-icon-wrap orange">
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4l5 2.18V11c0 3.5-2.33 6.79-5 7.93-2.67-1.14-5-4.43-5-7.93V7.18L12 5z"/></svg>
                        </div>
                        <div class="ec-info">
                            <div class="ec-val">16,888<span class="ec-unit">家</span></div>
                            <div class="ec-lbl">监管机构总数</div>
                        </div>
                    </div>
                    <div class="entity-card green">
                        <div class="ec-icon-wrap green">
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.8 18.4L14 10.67V6.5l1.35-1.69c.26-.33.03-.81-.39-.81H9.04c-.42 0-.65.48-.39.81L10 6.5v4.17L4.2 18.4c-.49.66-.02 1.6.8 1.6h14c.82 0 1.29-.94.8-1.6z"/></svg>
                        </div>
                        <div class="ec-info">
                            <div class="ec-val">26,091<span class="ec-unit">家</span></div>
                            <div class="ec-lbl">检测机构总数</div>
                        </div>
                    </div>
                    <div class="entity-card blue">
                        <div class="ec-icon-wrap blue">
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2.05v2.02c3.95.49 7 3.85 7 7.93 0 3.21-1.81 6-4.72 7.28L13 17v5h5l-1.22-1.22C19.91 19.07 22 15.76 22 12c0-5.18-3.95-9.45-9-9.95zM11 2.05C5.95 2.55 2 6.82 2 12c0 3.76 2.09 7.07 5.22 8.78L6 22h5v-5l-2.28 2.28C7.81 18 6 15.21 6 12c0-4.08 3.05-7.44 7-7.93V2.05z"/></svg>
                        </div>
                        <div class="ec-info">
                            <div class="ec-val">2,242<span class="ec-unit">家</span></div>
                            <div class="ec-lbl">执法机构总数</div>
                        </div>
                    </div>
                </div>

               

                <!-- 地图区域 -->
                <div class="map-wrap-box">
                     <!-- 行业分布行 -->
                    <div class="industry-row">
                        <div class="industry-tag">
                            <span class="ind-lbl">种植业</span>
                            <span class="ind-val">263,450<span class="ind-unit">家</span></span>
                        </div>
                        <div class="industry-tag">
                            <span class="ind-lbl">畜牧业</span>
                            <span class="ind-val">114,780<span class="ind-unit">家</span></span>
                        </div>
                        <div class="industry-tag">
                            <span class="ind-lbl">渔业</span>
                            <span class="ind-val">49,650<span class="ind-unit">家</span></span>
                        </div>
                        <div class="industry-tag">
                            <span class="ind-lbl">其他</span>
                            <span class="ind-val">281,190<span class="ind-unit">家</span></span>
                        </div>
                    </div>
                    <div class="map-wrap">
                        <div class="map-loc">当前位置： 
                            <div id="mapBreadcrumb" class="map-breadcrumb"></div>
                        </div>
                        <div id="chinaMap" class="map-echarts"></div>
                        <!-- 右侧排行面板 -->
                        <div class="map-panel">
                            <div class="mp-title-row">
                                <div class="mp-title">注册生产经营主体地域排行</div>
                                <div class="mp-title-decor">
                                    <span class="seg orange"></span>
                                    <span class="seg cyan"></span>
                                    <span class="seg blue"></span>
                                </div>
                            </div>
                            <div class="mp-unit">单位：家</div>
                            <div id="rankingChart" class="mp-ranking-chart"></div>
                            <div class="mp-note">
                                <!-- <span class="mp-note-dot"></span> -->
                                上季度新增注册生产经营主体<span class="emph">7,526家</span> <br/>
                                与同期对比增长<span class="emph">3%</span>
                            </div>
                            <div class="mp-unit mp-unit-trend">单位：家</div>
                            <div id="trendChart" class="mp-trend-chart"></div>
                        </div>
                    </div>
                </div>
                
            </div>

            <!-- ====== 右栏 ====== -->
            <div class="da-right">
                <!-- 消费者查询情况 -->
                <div class="da-card">
                    <div class="da-card-hd">
                        <div class="hd-title-row">
                            <span class="hd-arrow"></span>
                            <span class="hd-title">消费者查询情况</span>
                        </div>
                        <span class="hd-more">明细&gt;</span>
                    </div>
                    <div class="da-card-bd">
                        <div class="biz-item">
                            <div class="biz-icon cyan">
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
                            </div>
                            <div class="biz-info">
                                <div class="biz-val">38,172<span class="unit">次</span></div>
                                <div class="biz-lbl">消费者查询次数</div>
                            </div>
                        </div>
                        <div class="chart-sub-title">追溯产品消费者查询次数排名</div>
                        <div id="queryChart" class="chart-box"></div>
                    </div>
                </div>

                <!-- 监测任务情况 -->
                <div class="da-card">
                    <div class="da-card-hd">
                        <div class="hd-title-row">
                            <span class="hd-arrow"></span>
                            <span class="hd-title">监测任务情况</span>
                        </div>
                    </div>
                    <div class="da-card-bd">
                        <div class="monitor-top">
                            <div class="monitor-stat">
                                <div class="biz-icon blue">
                                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
                                </div>
                                <div class="biz-info">
                                    <div class="biz-val">56,932<span class="unit">次</span></div>
                                    <div class="biz-lbl">监测任务总数</div>
                                </div>
                            </div>
                            <div class="gauge-right">
                                <div id="taskChart" class="gauge-mini"></div>
                                <div class="gauge-lbl">完成率</div>
                            </div>
                        </div>
                        <div class="task-grid-box">
                            <div class="task-grid">
                                <div class="tg-item blue">
                                    <i class="tg-lbl">例行监测</i>
                                    <i class="tg-val">98,054</i>
                                </div>
                                <div class="tg-item orange">
                                    <i class="tg-lbl">专项监测</i>
                                    <i class="tg-val">120,150</i>
                                </div>
                                <div class="tg-item yellow">
                                    <i class="tg-lbl">监督抽查</i>
                                    <i class="tg-val">85,710</i>
                                </div>
                                <div class="tg-item cyan">
                                    <i class="tg-lbl">复检任务</i>
                                    <i class="tg-val">102,548</i>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>

                <!-- 基地巡查情况 -->
                <div class="da-card">
                    <div class="da-card-hd">
                        <div class="hd-title-row">
                            <span class="hd-arrow"></span>
                            <span class="hd-title">基地巡查情况</span>
                        </div>
                    </div>
                    <div class="da-card-bd">
                        <div class="insp-wrap">
                            <div class="insp-stats">
                                <div class="biz-item">
                                    <div class="biz-icon cyan">
                                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                                    </div>
                                    <div class="biz-info">
                                        <div class="biz-val">20,192<span class="unit">个</span></div>
                                        <div class="biz-lbl">基地个数</div>
                                    </div>
                                </div>
                                <div class="biz-item">
                                    <div class="biz-icon green">
                                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                                    </div>
                                    <div class="biz-info">
                                        <div class="biz-val">9,028<span class="unit">次</span></div>
                                        <div class="biz-lbl">基地巡查次数</div>
                                    </div>
                                </div>
                            </div>
                            <div class="gauge-right">
                                <div id="inspectionChart" class="gauge-mini"></div>
                                <div class="gauge-lbl">考察合格率</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, nextTick } from 'vue';
import * as echarts from 'echarts';

export default {
    name: 'DataAnalysis',
    setup() {
        const chartInstances = [];

        const registerResize = (chart) => {
            chartInstances.push(chart);
        };

        const handleResize = () => {
            chartInstances.forEach(c => c && c.resize());
        };

        onMounted(() => {
            nextTick(() => {
                initChinaMap();
                initProductChart();
                initQueryChart();
                initTaskChart();
                initInspectionChart();
                initTrendChart();
                initRankingChart();
                window.addEventListener('resize', handleResize);
            });
        });

        /* ---- 中国地图 ---- */
        let currentMapLevel = 'country'; // 当前地图级别：country, province, city, district
        let currentMapName = 'china'; // 当前地图名称
        let mapChart = null;
        let currentMapChildren = [];
        const mapRoute = [
            { level: 'country', name: '中国', displayName: '全国', mapName: 'china', adcode: '100000' }
        ];

        const getCurrentRoute = () => mapRoute[mapRoute.length - 1];
        const normalizeAdcode = (code) => (code === undefined || code === null ? '' : String(code));

        const updateBackBtn = () => {
            const backBtn = document.querySelector('.map-back-btn');
            if (backBtn) {
                backBtn.style.display = mapRoute.length > 1 ? 'block' : 'none';
            }
        };

        const updateMapLocation = () => {
            const mapLocation = document.querySelector('.map-loc');
            const current = getCurrentRoute();
            if (mapLocation && current) {
                mapLocation.innerText = `当前位置：${current.displayName}`;
            }
        };

        const extractChildrenFromGeo = (geo) => {
            const features = geo?.features || [];
            return features
                .map((feature) => {
                    const properties = feature?.properties || {};
                    return {
                        name: properties.name || feature.name || '',
                        adcode: normalizeAdcode(properties.adcode ?? feature.id),
                        level: properties.level || ''
                    };
                })
                .filter(item => item.name);
        };

        const getRegionCodeByName = (name) => {
            const matched = currentMapChildren.find(item => item.name === name);
            return matched?.adcode || '';
        };

        const getMapUrlByRoute = (route) => {
            if (route.level === 'country') {
                return '/lib/echart/map/china.json';
            }
            if (route.level === 'province') {
                const provinceFile = provinces[route.mapName];
                return provinceFile ? `/lib/echart/map/province/${provinceFile}.json` : '';
            }
            if (route.level === 'city') {
                return route.adcode ? `/lib/echart/map/city/${route.adcode}.json` : '';
            }
            // if (route.level === 'district') {
            //     return route.adcode ? `/lib/echart/map/city/${route.adcode}.json` : '';
            // }
            return '';
        };

        // 获取tmp中value最大的数值
        const getMaxValueFromTmp = (tmpArray) => {
            if (!tmpArray || tmpArray.length === 0) return 0;
            return Math.max(...tmpArray.map(item => item.value));
        };

        const loadMap = (route,districtName) => {
            const mapUrl = getMapUrlByRoute(route);
            if (!mapUrl) return;

            currentMapLevel = route.level;
            currentMapName = route.mapName;
            // updateMapLocation();
            updateBreadcrumb();
            // updateBackBtn();

            fetch(mapUrl)
                .then(r => r.json())
                .then(geo => {
                    currentMapChildren = extractChildrenFromGeo(geo);
                    if(districtName){
                       geo.features = geo.features.filter(item => item.properties.name.indexOf(districtName)>=0);
                    }
                    let tmp=[]
                    geo.features.forEach((item) => {
                        tmp.push({
                            //需要加上cityid传递渲染，下一级地图渲染需要用到，点击的时候有判断，没有下级id直接return
                            cityid: item.id,
                            name: item.properties.name,
                            value: (Math.floor(Math.random() * 300)) + 50,
                         })
                    })
                    
                    const maxValue = getMaxValueFromTmp(tmp);
                   
                    echarts.registerMap(route.mapName, geo);
                    mapChart.setOption({
                        grid: {
                            left: '-10%',
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: '{b}: {c}',
                            backgroundColor: 'rgba(0,20,40,0.9)',
                            borderColor: '#00d4ff',
                            textStyle: { color: '#fff' }
                        },
                        visualMap: {
                            type: 'continuous',
                            min: 0,
                            max: maxValue,
                            show: false,
                            inRange: {
                                color: ['#0d2b5e', '#0e4a8e', '#1565c0', '#1976d2', '#42a5f5', '#64b5f6']
                            },
                        },
                        series: [{
                            name: '生产经营主体',
                            type: 'map',
                            map: route.mapName,
                            roam: true,
                            zoom: route.mapName === 'china' ? 1.1 : 1,
                            center: route.mapName === 'china' ? [104.0711, 30.6000317] : undefined,
                            label: {
                                show: true,
                                color: 'rgba(255,255,255,0.6)',
                                fontSize: 9
                            },
                            itemStyle: {
                                areaColor: '#0d2b5e',
                                borderColor: 'rgba(0,180,255,0.4)',
                                borderWidth: 0.8
                            },
                            emphasis: {
                                label: { show: true, color: '#fff' },
                                itemStyle: { areaColor: '#00b4ff' }
                            },
                            data: tmp
                        }]
                    }, true);
                })
                .catch(error => {
                    console.error('加载地图数据失败:', error);
                });
        };

        const appendDistrictRoute = (districtName) => {
            const districtCode = getRegionCodeByName(districtName);
            const districtRoute = {
                level: 'district',
                name: districtName,
                displayName: districtName,
                mapName: currentMapName,
                adcode: districtCode
            };
            const current = getCurrentRoute();
            if (current && current.level === 'district') {
                mapRoute.splice(mapRoute.length - 1, 1, districtRoute);
            } else {
                mapRoute.push(districtRoute);
            }
            currentMapLevel = 'district';
            // updateMapLocation();
            updateBreadcrumb();
            // updateBackBtn();
        };

        const drillDownByName = (name) => {
            if (!name) return;
            const current = getCurrentRoute();
            if (!current) return;

            if (current.level === 'country') {
                const provinceCode = getProvinceCode(name) || getRegionCodeByName(name);
                if (!provinceCode) return;
                mapRoute.push({
                    level: 'province',
                    name,
                    displayName: name,
                    mapName: name,
                    adcode: provinceCode
                });
                loadMap(getCurrentRoute());
                return;
            }

            if (current.level === 'province') {
                const cityCode = getRegionCodeByName(name);
                if (!cityCode) return;
                mapRoute.push({
                    level: 'city',
                    name,
                    displayName: name,
                    mapName: name,
                    adcode: cityCode
                });
                loadMap(getCurrentRoute());
                return;
            }

            if (current.level === 'city' || current.level === 'district') {
                loadMap(getCurrentRoute(),name);
                appendDistrictRoute(name);
            }
        };

        const openRouteAt = (index) => {
            if (index < 0 || index >= mapRoute.length) return;
            mapRoute.splice(index + 1);
            const target = getCurrentRoute();
            if (!target) return;

            if (target.level === 'district') {
                currentMapLevel = 'district';
                currentMapName = target.mapName;
                // updateMapLocation();
                updateBreadcrumb();
                // updateBackBtn();
                return;
            }

            loadMap(target);
        };

        const initChinaMap = () => {
            const dom = document.getElementById('chinaMap');
            if (!dom) return;
            mapChart = echarts.init(dom);
            registerResize(mapChart);

            loadMap(getCurrentRoute());

            mapChart.on('click', function(params) {
                drillDownByName(params?.name);
            });

            const mapContainer = document.querySelector('.map-wrap');
            if (mapContainer) {
                let backBtn = document.querySelector('.map-back-btn');
                if (!backBtn) {
                    backBtn = document.createElement('div');
                    backBtn.className = 'map-back-btn';
                    backBtn.innerText = '返回';
                    backBtn.style.cssText = `
                        position: absolute;
                        top: 52px;
                        left: 10px;
                        padding: 4px 12px;
                        background: rgba(0, 20, 40, 0.8);
                        border: 1px solid #00d4ff;
                        color: #00d4ff;
                        border-radius: 4px;
                        cursor: pointer;
                        font-size: 12px;
                        z-index: 10;
                        display: none;
                    `;
                    backBtn.onclick = function() {
                        if (mapRoute.length <= 1) return;
                        const current = getCurrentRoute();
                        if (current.level === 'district') {
                            mapRoute.pop();
                            const cityRoute = getCurrentRoute();
                            currentMapLevel = cityRoute.level;
                            currentMapName = cityRoute.mapName;
                            // updateMapLocation();
                            updateBreadcrumb();
                            // updateBackBtn();
                            return;
                        }
                        mapRoute.pop();
                        loadMap(getCurrentRoute());
                    };
                    mapContainer.appendChild(backBtn);
                }
            }
        };

        // 生成地图数据
        const generateMapData = (mapName, level) => {
            // 这里可以根据实际情况生成对应级别的数据
            // 目前使用模拟数据
            const data = [];
            console.log('level',level)
            if (level === 'country') {
                // 全国数据
                return [
                    { name: '北京', value: 150 }, { name: '天津', value: 120 },
                    { name: '河北', value: 200 }, { name: '山西', value: 100 },
                    { name: '内蒙古', value: 80 }, { name: '辽宁', value: 180 },
                    { name: '吉林', value: 150 }, { name: '黑龙江', value: 120 },
                    { name: '上海', value: 250 }, { name: '江苏', value: 300 },
                    { name: '浙江', value: 350 }, { name: '安徽', value: 220 },
                    { name: '福建', value: 200 }, { name: '江西', value: 180 },
                    { name: '山东', value: 187 }, { name: '河南', value: 200 },
                    { name: '湖北', value: 220 }, { name: '湖南', value: 200 },
                    { name: '广东', value: 284 }, { name: '广西', value: 150 },
                    { name: '海南', value: 80 }, { name: '重庆', value: 150 },
                    { name: '四川', value: 241 }, { name: '贵州', value: 100 },
                    { name: '云南', value: 120 }, { name: '西藏', value: 30 },
                    { name: '陕西', value: 150 }, { name: '甘肃', value: 80 },
                    { name: '青海', value: 50 }, { name: '宁夏', value: 60 },
                    { name: '新疆', value: 80 }
                ];
            } else if (level === 'province') {
                // 省份数据（模拟）
                for (let i = 0; i < 10; i++) {
                    data.push({ name: `城市${i+1}`, value: Math.floor(Math.random() * 300) + 50 });
                }
            } else if (level === 'city') {
                // 城市数据（模拟）
                for (let i = 0; i < 5; i++) {
                    data.push({ name: `区县${i+1}`, value: Math.floor(Math.random() * 200) + 30 });
                }
            }
            return data;
        };

         //34个省、市、自治区的名字拼音映射数组
        const provinces = {
            //23个省
            台湾: 'taiwan',
            台湾省: 'taiwan',
            河北: 'hebei',
            河北省: 'hebei',
            山西: 'shanxi',
            山西省: 'shanxi',
            辽宁: 'liaoning',
            辽宁省: 'liaoning',
            吉林: 'jilin',
            吉林省: 'jilin',
            黑龙江: 'heilongjiang',
            黑龙省: 'heilongjiang',
            江苏: 'jiangsu',
            江苏省: 'jiangsu',
            浙江: 'zhejiang',
            浙江省: 'zhejiang',
            安徽: 'anhui',
            安徽省: 'anhui',
            福建: 'fujian',
            福建省: 'fujian',
            江西: 'jiangxi',
            江西省: 'jiangxi',
            山东: 'shandong',
            山东省: 'shandong',
            河南: 'henan',
            河南省: 'henan',
            湖北: 'hubei',
            湖北省: 'hubei',
            湖南: 'hunan',
            湖南省: 'hunan',
            广东: 'guangdong',
            广东省: 'guangdong',
            海南: 'hainan',
            海南省: 'hainan',
            四川: 'sichuan',
            四川省: 'sichuan',
            贵州: 'guizhou',
            贵州省: 'guizhou',
            云南: 'yunnan',
            云南省: 'yunnan',
            陕西: 'shanxi1',
            陕西省: 'shanxi1',
            甘肃: 'gansu',
            甘肃省: 'gansu',
            青海: 'qinghai',
            青海省: 'qinghai',
            //5个自治区
            新疆: 'xinjiang',
            新疆维吾尔自治区: 'xinjiang',
            广西: 'guangxi',
            广西壮族自治区: 'guangxi',
            内蒙: 'neimenggu',
            内蒙古: 'neimenggu',
            内蒙古自治区: 'neimenggu',
            宁夏: 'ningxia',
            宁夏回族自治区: 'ningxia',
            西藏: 'xizang',
            西藏自治区: 'xizang',
            //4个直辖市
            北京: 'beijing',
            北京市: 'beijing',
            天津: 'tianjin',
            天津市: 'tianjin',
            上海: 'shanghai',
            上海市: 'shanghai',
            重庆: 'chongqing',
            重庆市: 'chongqing',
            //2个特别行政区
            香港: 'xianggang',
            香港特别行政区: 'xianggang',
            澳门: 'aomen',
            澳门特别行政区: 'aomen'
        }

        // 获取省份代码
        const getProvinceCode = (provinceName) => {
            const provinceMap = {
                '北京': '110000', '天津': '120000', '河北': '130000', '山西': '140000',
                '内蒙古': '150000', '辽宁': '210000', '吉林': '220000', '黑龙江': '230000',
                '上海': '310000', '江苏': '320000', '浙江': '330000', '安徽': '340000',
                '福建': '350000', '江西': '360000', '山东': '370000', '河南': '410000',
                '湖北': '420000', '湖南': '430000', '广东': '440000', '广西': '450000',
                '海南': '460000', '重庆': '500000', '四川': '510000', '贵州': '520000',
                '云南': '530000', '西藏': '540000', '陕西': '610000', '甘肃': '620000',
                '青海': '630000', '宁夏': '640000', '新疆': '650000'
            };
            return provinceMap[provinceName] || '';
        };

        // 更新面包屑导航
        const updateBreadcrumb = () => {
            const breadcrumb = document.getElementById('mapBreadcrumb');
            if (!breadcrumb) return;
            breadcrumb.innerHTML = '';

            mapRoute.forEach((route, index) => {
                const isLast = index === mapRoute.length - 1;
                const item = document.createElement('span');
                item.className = `breadcrumb-item${isLast ? ' current' : ' clickable'}`;
                item.textContent = route.name;

                if (!isLast) {
                    item.onclick = function() {
                        openRouteAt(index);
                    };
                }
                breadcrumb.appendChild(item);

                if (!isLast) {
                    const sep = document.createElement('span');
                    sep.className = 'breadcrumb-sep';
                    sep.textContent = '>';
                    breadcrumb.appendChild(sep);
                }
            });
        };

        /* ---- 产品批次排名柱图 ---- */
        const initProductChart = () => {
            const dom = document.getElementById('productChart');
            if (!dom) return;
            const chart = echarts.init(dom);
            registerResize(chart);
            chart.setOption({
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { type: 'shadow' },
                    backgroundColor: 'rgba(0,20,40,0.9)',
                    borderColor: '#00d4ff',
                    textStyle: { color: '#fff' }
                },
                grid: { left: 0, right: 8, bottom: 0, top: 30, containLabel: true },
                xAxis: {
                    type: 'category',
                    data: ['葡萄', '大米', '蔬菜', '粮油', '辣椒'],
                    axisLine: { lineStyle: { color: '#2d3a48' } },
                    axisLabel: { color: '#abb9cb', fontSize: 10 },
                    axisTick: { show: false }
                },
                yAxis: {
                    type: 'value',
                     max: 2500,
                    interval: 500,
                    name: '单位：次',
                    nameTextStyle: {
                        color: '#abb9cb',
                        fontSize: 10,
                        padding: [0, 0, 1, -28]
                    },
                    axisLine: { show: true, lineStyle: { color: '#2d3a48' } },
                    axisLabel: { color: '#abb9cb', fontSize: 10 },
                    splitLine: { show: false }
                },
                series: [{
                    type: 'bar',
                    data: [
                        { value: 1998, label: { show: true, position: 'top', color: '#7eb8d0', fontSize: 9, formatter: '{c}' } },
                        { value: 1875, label: { show: true, position: 'top', color: '#7eb8d0', fontSize: 9, formatter: '{c}' } },
                        { value: 1448, label: { show: true, position: 'top', color: '#7eb8d0', fontSize: 9, formatter: '{c}' } },
                        { value: 1059, label: { show: true, position: 'top', color: '#7eb8d0', fontSize: 9, formatter: '{c}' } },
                        { value: 503, label: { show: true, position: 'top', color: '#7eb8d0', fontSize: 9, formatter: '{c}' } }
                    ],
                    barWidth: 14,
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: '#00d4ff' },
                            { offset: 1, color: '#003d6b' }
                        ]),
                    }
                }]
            });
        };

        /* ---- 消费者查询次数柱图 ---- */
        const initQueryChart = () => {
            const dom = document.getElementById('queryChart');
            if (!dom) return;
            const chart = echarts.init(dom);
            registerResize(chart);
            
            // 创建条纹图案
            const stripePattern = document.createElement('canvas');
            stripePattern.width = 10;
            stripePattern.height = 3.5;
            const ctx = stripePattern.getContext('2d');
            ctx.fillStyle = '#6edeae';
            ctx.fillRect(0, 0, 10, 2);
            ctx.fillStyle = 'rgba(0,0,0,0.3)';
            ctx.fillRect(0, 0, 10, 1);
            
            chart.setOption({
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { type: 'shadow' },
                    backgroundColor: 'rgba(0,20,40,0.9)',
                    borderColor: '#00d4ff',
                    textStyle: { color: '#fff' },
                    formatter: function(params) {
                        let result = ''
                        let dotHtml = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#6edeae"></span>'
                        result += params[0].axisValue + "</br>" + dotHtml + params[0]?.value || 0 
                        return result
                    }
                },
                grid: { left: 0, right: 10, bottom: 5, top: 30, containLabel: true },
                xAxis: {
                    type: 'category',
                    data: ['葡萄', '大米', '黄瓜', '辣椒', '番茄'],
                    axisLine: {  lineStyle: { color: '#2d3a48' } },
                    axisLabel: { color: '#abb9cb', fontSize: 12 },
                    axisTick: { show: false }
                },
                yAxis: {
                    type: 'value',
                    max: 2500,
                    interval: 500,
                    name: '单位：次',
                    nameTextStyle: {
                        color: '#abb9cb',
                        fontSize: 10,
                        padding: [0, 0, 2, -25]
                    },
                    axisLine: { show: true, lineStyle: { color: '#2d3a48' } },
                    axisLabel: { color: '#abb9cb', fontSize: 9 },
                    splitLine: { show: false }
                },
                series: [{
                    type: 'bar',
                    data: [
                        { value: 2241, label: { show: true, position: 'top', color: '#6edeae', fontSize: 9,  formatter: '{c}' } },
                        { value: 1987, label: { show: true, position: 'top', color: '#6edeae', fontSize: 9, formatter: '{c}' } },
                        { value: 1448, label: { show: true, position: 'top', color: '#6edeae', fontSize: 9, formatter: '{c}' } },
                        { value: 1059, label: { show: true, position: 'top', color: '#6edeae', fontSize: 9, formatter: '{c}' } },
                        { value: 503, label: { show: true, position: 'top', color: '#6edeae', fontSize: 9, formatter: '{c}' } }
                    ],
                    barWidth: '25%',
                    itemStyle: {
                        color: {
                            image: stripePattern,
                            repeat: 'repeat'
                        },
                        fontSize:10,
                        borderRadius: [2, 2, 0, 0]
                    }
                }]
            });
        };

        /* ---- 监测任务环形仪表盘 ---- */
        const initTaskChart = () => {
            const dom = document.getElementById('taskChart');
            if (!dom) return;
            const chart = echarts.init(dom);
            registerResize(chart);
            chart.setOption({
                series: [{
                    type: 'gauge',
                    center: ['50%', '50%'],
                    startAngle: 90,
                    endAngle: -270,
                    radius: '90%',
                    pointer: { show: false },
                    progress: {
                        show: true,
                        roundCap: true,
                        width:6,
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                                { offset: 0, color: '#ff8c00' },
                                { offset: 1, color: '#ffcc44' }
                            ])
                        }
                    },
                    axisLine: {
                        roundCap: true,
                        lineStyle: { width: 8, color: [[1, 'rgba(255,150,0,0.12)']] }
                    },
                    axisTick: { show: false },
                    splitLine: { show: false },
                    axisLabel: { show: false },
                        detail: {
                        valueAnimation: true,
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#f7feff',
                        formatter: '{value}%',
                        offsetCenter: [0, -5]
                    },
                    data: [{ value: 68 }]
                }]
            });
        };

        /* ---- 基地检查环形仪表盘 ---- */
        const initInspectionChart = () => {
            const dom = document.getElementById('inspectionChart');
            if (!dom) return;
            const chart = echarts.init(dom);
            registerResize(chart);
            chart.setOption({
                series: [{
                    type: 'gauge',
                    center: ['50%', '50%'],
                    startAngle: 90,
                    endAngle: -270,
                    radius: '90%',
                    pointer: { show: false },
                    progress: {
                        show: true,
                        roundCap: true,
                        width: 6,
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                                { offset: 0, color: '#00c896' },
                                { offset: 1, color: '#00e5cc' }
                            ])
                        }
                    },
                    axisLine: {
                        roundCap: true,
                        lineStyle: { width: 8, color: [[1, 'rgba(0,200,150,0.12)']] }
                    },
                    axisTick: { show: false },
                    splitLine: { show: false },
                    axisLabel: { show: false },
                    title: { show: false },
                    detail: {
                        valueAnimation: true,
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: '#f7feff',
                        formatter: '{value}%',
                        offsetCenter: [0, -5]
                    },
                    data: [{ value: 68 }]
                }]
            });
        };

        /* ---- 趋势三线面积图 ---- */
        const initTrendChart = () => {
            const dom = document.getElementById('trendChart');
            if (!dom) return;
            const chart = echarts.init(dom);
            registerResize(chart);
            chart.setOption({
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: 'rgba(0,20,40,0.9)',
                    borderColor: '#00d4ff',
                    textStyle: { color: '#fff' }
                },
                legend: { show: false },
                grid: { left: 6, right: 8, bottom: 0, top: 8, containLabel: true },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['7月', '8月', '9月', ''],
                    axisLine: { lineStyle: { color: 'rgba(110, 140, 170, 0.45)' } },
                    axisLabel: { color: 'rgba(190,210,225,0.88)', fontSize: 10, margin: 8 },
                    axisTick: { show: false }
                },
                yAxis: {
                    type: 'value',
                    min: 0,
                    max: 250,
                    interval: 50,
                    axisLine: { show: true, lineStyle: { color: 'rgba(110, 140, 170, 0.45)' } },
                    axisLabel: { color: 'rgba(190,210,225,0.88)', fontSize: 10 },
                    splitLine: { lineStyle: { color: 'rgba(110, 140, 170, 0.2)' } }
                },
                series: [
                    {
                        type: 'line',
                        data: [190, 150, 90, 150],
                        smooth: true,
                        symbol: 'none',
                        lineStyle: { color: '#1fd8ea', width: 2 },
                        areaStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: 'rgba(31,216,234,0.5)' },
                                { offset: 1, color: 'rgba(31,216,234,0.03)' }
                            ])
                        }
                    },
                    {
                        type: 'line',
                        data: [55, 175, 85, 120],
                        smooth: true,
                        symbol: 'none',
                        lineStyle: { color: '#b06deb', width: 2 },
                        areaStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: 'rgba(176,109,235,0.48)' },
                                { offset: 1, color: 'rgba(176,109,235,0.03)' }
                            ])
                        }
                    }
                ]
            });
        };

        /* ---- 地域排行水平柱图 ---- */
        const initRankingChart = () => {
            const dom = document.getElementById('rankingChart');
            if (!dom) return;
            const chart = echarts.init(dom);
            registerResize(chart);
            chart.setOption({
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { type: 'shadow' },
                    backgroundColor: 'rgba(0,20,40,0.9)',
                    borderColor: '#00d4ff',
                    textStyle: { color: '#fff' }
                },
                grid: { left: 6, right: 36, bottom: 2, top: 2, containLabel: true },
                xAxis: {
                    type: 'value',
                    min: 0,
                    max: 2500,
                    interval: 500,
                    axisLine: { show: true, lineStyle: { color: 'rgba(110, 140, 170, 0.42)' } },
                    axisLabel: { color: 'rgba(190,210,225,0.88)', fontSize: 9 },
                    axisTick: { show: false },
                    splitLine: { show: false }
                },
                yAxis: {
                    type: 'category',
                    data: ['浙江省', '云南省', '江西省', '河北省', '山东省'],
                    inverse: true,
                    axisLine: { show: true, lineStyle: { color: 'rgba(110, 140, 170, 0.42)' } },
                    axisLabel: { color: 'rgba(190,210,225,0.92)', fontSize: 10, margin: 8 },
                    axisTick: { show: false }
                },
                series: [{
                    type: 'bar',
                    data: [2241, 1987, 1448, 1059, 503],
                    barWidth: 9,
                    label: {
                        show: true,
                        position: 'right',
                        color: '#d9c89a',
                        fontSize: 11,
                        distance: 8,
                        formatter: '{c}'
                    },
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                            { offset: 0, color: '#3ed5eb' },
                            { offset: 1, color: '#cfbe90' }
                        ]),
                        borderRadius: [0, 10, 10, 0]
                    }
                }]
            });
        };

        return {};
    }
};
</script>

<style lang="less">
/* ============================================================
   全局容器 & 布局
   ============================================================ */
.da-wrap {
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, #071628 0%, #040e1c 100%);
    color: #c0dce8;
    font-family: 'Microsoft YaHei', 'PingFang SC', sans-serif;
    overflow: hidden auto;
    box-sizing: border-box;
}

.da-main {
    display: flex;
    gap: 12px;
    padding: 12px 14px;
    height: 100%;
    box-sizing: border-box;
    min-width: 1366px;
}

/* ============================================================
   通用卡片
   ============================================================ */
.da-left,
.da-right {
    width: 23%;
    min-width: 260px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex-shrink: 0;
}
.da-right{
    .da-card{
        flex:3.5;
        display: flex;
        flex-direction: column;
        .da-card-bd{
            flex: 1;
            display: flex;
            flex-direction: column;
        }
         .unit{
           font-weight: 700;
        }
        &:first-child{
           .da-card-bd .chart-box{
                flex: 1;
            }
            .biz-icon.cyan {
                background: radial-gradient(circle, rgba(0, 180, 180, 0.25) 0%, rgba(0, 80, 80, 0.08) 100%);
                border: 1.5px solid rgba(110, 222, 174, 0.5);
                svg{    
                    color:#6edeae;
                }
            }
        }
        &:last-child{
            flex: 2;
        }
    }
}

.da-left{
    .da-card{
        flex: 3.5;
        &:first-child{
           display: flex;
           flex-direction: column;
           .da-card-bd:last-child{
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                padding: 6px 0;
                .biz-item{
                    margin-bottom: 0;
                }
           }
        }
        &:nth-child(2){
            display: flex;
            flex-direction: column;
           .da-card-bd{
            flex: 1;
            display: flex;
            flex-direction: column;
            .chart-box{
                flex: 1;
            }
           }
        }
        &:last-child{
            flex: 2;
            display: flex;
            flex-direction: column;
            .card-left-bottom{
                flex: 1;
                padding: 8px 0;
            }
        }
    }
    .card-left-bottom{
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
    }
}
.da-center {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 0;
}

.da-card {
    background: linear-gradient(180deg, rgba(5, 28, 58, 0.92) 0%, rgba(2, 14, 30, 0.96) 100%);
    border: 1px solid rgba(0, 180, 220, 0.22);
    border-radius: 4px;
    padding: 8px 12px;
    position: relative;
    overflow: hidden;
    flex-shrink: 0;

    &::before {
        content: '';
        position: absolute;
        top: 0; left: 0;
        width: 10px; height: 10px;
        border-top: 2px solid #00b4d8;
        border-left: 2px solid #00b4d8;
        pointer-events: none;
    }
    &::after {
        content: '';
        position: absolute;
        bottom: 0; right: 0;
        width: 10px; height: 10px;
        border-bottom: 2px solid #00b4d8;
        border-right: 2px solid #00b4d8;
        pointer-events: none;
    }
}

/* ---- 卡片标题行 ---- */
.da-card-hd {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
    padding-bottom: 6px;
    border-bottom: 1px solid rgba(0, 180, 220, 0.12);
}

.hd-title-row {
    display: flex;
    align-items: center;
    gap: 6px;
}

.hd-arrow {
    display: inline-block;
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 7px solid #00b4d8;
}

.hd-title {
    font-size: 13px;
    font-weight: 600;
    color: #b4cbe8;
    letter-spacing: 0.5px;
}

.hd-more {
    font-size: 11px;
    color: #b4cbe8;
    cursor: pointer;
    transition: color 0.2s;
    &:hover { color: #fff; }
}

/* ============================================================
   左栏：追溯业务情况
   ============================================================ */
.biz-item {
    display: flex;
    align-items: flex-start;
    align-items: center;
    gap: 10px;
    margin-bottom: 8px;
    &:last-child { margin-bottom: 0; }
}
.da-right{
  .biz-item{
    align-items: center;
    .biz-info{
        flex-direction: column;
        align-items:flex-start;
        .biz-val{
            color:#6edeae;
        }
    }
  }  
}

.biz-icon {
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        width: 20px;
        height: 20px;
    }

    &.blue {
        background: radial-gradient(circle, rgba(0,100,200,0.25) 0%, rgba(0,50,100,0.08) 100%);
        border: 1.5px solid rgba(0,150,255,0.5);
        svg { color: #42a5f5; }
    }
    &.green {
        background: radial-gradient(circle, rgba(0,180,80,0.25) 0%, rgba(0,80,40,0.08) 100%);
        border: 1.5px solid rgba(0,220,100,0.5);
        svg { color: #66bb6a; }
    }
    &.purple {
        background: radial-gradient(circle, rgba(140,80,200,0.25) 0%, rgba(70,40,100,0.08) 100%);
        border: 1.5px solid rgba(180,120,255,0.5);
        svg { color: #ba68c8; }
    }
    &.yellow {
        background: radial-gradient(circle, rgba(200,150,0,0.25) 0%, rgba(100,75,0,0.08) 100%);
        border: 1.5px solid rgba(255,200,0,0.5);
        svg { color: #ffd54f; }
    }
    &.cyan {
        background: radial-gradient(circle, rgba(0,180,180,0.25) 0%, rgba(0,80,80,0.08) 100%);
        border: 1.5px solid rgba(0,230,230,0.5);
        svg { color: #4dd0e1; }
    }
    &.orange {
        background: radial-gradient(circle, rgba(220,100,0,0.25) 0%, rgba(110,50,0,0.08) 100%);
        border: 1.5px solid rgba(255,140,0,0.5);
        svg { color: #ffa726; }
    }
}

.biz-info {
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: center;
    .left{
        min-width: 76px;
    }
    .biz-val {
        font-size: 15px;
        font-weight: 700;
        color:rgb(32 232 244)
;
        line-height: 1.2;
    }
    .biz-lbl {
        font-size: 11px;
        color: #e4eef1;
        margin-top: 2px;
    }
    .biz-cmp {
        font-size: 10px;
        color: #abb9cb;
        margin-top: 3px;
        margin-left: 8px;
        display: flex;
        align-items: center;
        .el-icon {
            margin-right: 4px;
            font-size: 12px;
        }
        span{
            color:#4cdadf;
            display: inline-flex;
            margin: 0 3px;
        }
        .cmp-val{
            margin: 0 6px 0 2px;
        }
        .up,.down{
            margin: 0;
        }
        .up { color: #4caf50; }
        .down { color: #ef5350; }
    }
}

.unit {
    font-size: 14px;
    font-weight: 400;
    margin-left: 4px;
}

.up { color: #4caf50; }
.down { color: #ef5350; }

/* ---- 追溯产品情况 ---- */
.prod-summary {
    display: flex;
    align-items: stretch;
    gap: 10px;
    margin-bottom: 8px;
    // padding-bottom: 8px;
    padding-bottom: 1px;
    border-bottom: 1px solid rgba(0,180,220,0.1);
}

.prod-main {
    flex-shrink: 0;
    display: flex;
    padding-bottom: 8px;
    .left{
        margin-right: 8px;
    }
    .right{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .prod-main-val {
        font-size: 15px;
        font-weight: 700;
        color: #59d1f3;
        line-height: 1.2;
    }
    .prod-main-lbl {
        font-size: 10px;
        color: #e4eef1;
        margin-top: 3px;
    }
}

.prod-subs {
    flex: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px 8px;
    padding-bottom: 8px;
    border-left: 1px solid rgba(0,180,220,0.1);
    padding-left: 10px;
}

.prod-sub {
    display: flex;
    align-items: center;
    .prod-sub-val {
        font-size: 10px;
        color: #abb9cb;
        .unit{
            font-size: 10px;
        }
    }
    .prod-sub-lbl {
        font-size: 10px;
        color: #abb9cb;
        margin-right: 4px;
    }
}

.chart-sub-title {
    font-size: 11px;
    color: #e4eef1;
    margin-bottom: 6px;
}

.chart-box {
    width: 100%;
    // height: 120px;
}

/* ---- 追溯种养面积 ---- */
.area-item {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 8px;
    &:last-child { margin-bottom: 0; }
}

.area-icon {
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    svg { width: 18px; height: 18px; }

    &.blue {
        background: radial-gradient(circle, rgba(0,100,200,0.25) 0%, transparent 100%);
        border: 1.5px solid rgba(0,150,255,0.5);
        svg { color: #42a5f5; }
    }
    &.orange {
        background: radial-gradient(circle, rgba(220,100,0,0.25) 0%, transparent 100%);
        border: 1.5px solid rgba(255,140,0,0.5);
        svg { color: #ffa726; }
    }
    &.green {
        background: radial-gradient(circle, rgba(0,180,80,0.25) 0%, transparent 100%);
        border: 1.5px solid rgba(0,220,100,0.5);
        svg { color: #66bb6a; }
    }
}

.area-info {
    .area-val {
        font-size: 16px;
        font-weight: 700;
        color: #fff;
    }
    .area-lbl {
        font-size: 10px;
        color: #7eb8d0;
        margin-top: 2px;
    }
}

/* ============================================================
   中栏：顶部4卡片
   ============================================================ */
.entity-row {
    display: flex;
    gap: 10px;
    flex-shrink: 0;
}

.entity-card {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border-radius: 4px;
    border: 1px solid;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0; left: 0;
        width: 8px; height: 8px;
        border-top: 2px solid;
        border-left: 2px solid;
    }
    &::after {
        content: '';
        position: absolute;
        bottom: 0; right: 0;
        width: 8px; height: 8px;
        border-bottom: 2px solid;
        border-right: 2px solid;
    }

    &.gold {
        border-color: rgba(255,200,0,0.35);
        background: linear-gradient(135deg, rgba(80,55,0,0.55) 0%, rgba(40,28,0,0.75) 100%);
        box-shadow: 0 0 12px rgba(255,200,0,0.15) inset;
        &::before, &::after { border-color: #ffc400; }
        .ec-val{
            color:#d1c061;
        }
        .ec-unit{
         color: #d1c061;
        }
    }
    &.orange {
        border-color: rgba(255,140,0,0.35);
        background: linear-gradient(135deg, rgba(80,40,0,0.55) 0%, rgba(40,20,0,0.75) 100%);
        box-shadow: 0 0 12px rgba(255,140,0,0.15) inset;
        &::before, &::after { border-color: #ff8c00; }
        .ec-val{
            color:#ff8c00;
        }
        .ec-unit{
         color: #ff8c00;
        }
    }
    &.green {
        border-color: rgba(0,200,100,0.35);
        background: linear-gradient(135deg, rgba(0,60,30,0.55) 0%, rgba(0,30,15,0.75) 100%);
        box-shadow: 0 0 12px rgba(0,200,100,0.15) inset;
        &::before, &::after { border-color: #6edeae; }
        .ec-val{
            color:#6edeae;
        }
        .ec-unit{
         color: #6edeae;
        }
    }
    &.blue {
        border-color: rgba(0,180,255,0.35);
        background: linear-gradient(135deg, rgba(0,50,80,0.55) 0%, rgba(0,25,40,0.75) 100%);
        box-shadow: 0 0 12px rgba(0,180,255,0.15) inset;
        &::before, &::after { border-color: #00b4ff; }
        .ec-val{
            color:#00b4ff;
        }
        .ec-unit{
         color: #00b4ff;
        }
    }
}

.ec-icon-wrap {
    flex-shrink: 0;
    width: 44px;
    height: 44px;
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    display: flex;
    align-items: center;
    justify-content: center;

    svg { width: 22px; height: 22px; }

    &.gold {
        background: rgba(255,200,0,0.18);
        svg { color: #ffd740; }
    }
    &.orange {
        background: rgba(255,140,0,0.18);
        svg { color: #ffab40; }
    }
    &.green {
        background: rgba(0,200,100,0.18);
        svg { color: #69f0ae; }
    }
    &.blue {
        background: rgba(0,180,255,0.18);
        svg { color: #40c4ff; }
    }
}

.ec-info {
    min-width: 0;
    .ec-val {
        font-size: 18px;
        font-weight: 700;
        line-height: 1.2;
        white-space: nowrap;
    }
    .ec-unit {
        font-size: 11px;
        font-weight: 400;
        color: rgba(255,255,255,0.6);
        margin-left: 2px;
        font-size: 18px;
    }
    .ec-lbl {
        font-size: 11px;
        color: #e4eef1;
        margin-top: 3px;
        white-space: nowrap;
    }
}

/* ============================================================
   中栏：行业分布行
   ============================================================ */
.industry-row {
    display: flex;
    gap: 10px;
    flex-shrink: 0;
    padding: 24px 20px 8px;
    // padding: 14px 10px 8px;
}

.industry-tag {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 6px;
    background: rgba(0,180,220,0.06);
    border: 1px solid rgba(0,180,220,0.2);
    border-radius: 3px;
    position: relative;

    // &::before {
    //     content: '';
    //     position: absolute;
    //     top: 0; left: 0;
    //     width: 7px; height: 7px;
    //     border-top: 1px solid #00b4d8;
    //     border-left: 1px solid #00b4d8;
    // }
    // &::after {
    //     content: '';
    //     position: absolute;
    //     bottom: 0; right: 0;
    //     width: 7px; height: 7px;
    //     border-bottom: 1px solid #00b4d8;
    //     border-right: 1px solid #00b4d8;
    // }
}

.ind-lbl {
    font-size: 11px;
    color: #e4eef1;
    margin-right: 6px;
}

.ind-val {
    font-size: 14px;
    font-weight: 600;
    color: #4cdadf;
    white-space: nowrap;
}

.ind-unit {
    font-size: 14px;
    font-weight: 400;
    color: #4cdadf;
    margin-left: 4px;
}

/* ============================================================
   中栏：地图区域
   ============================================================ */
.map-wrap-box{
    flex: 1;
    position: relative;
    // background: linear-gradient(180deg, rgba(5,28,58,0.92) 0%, rgba(2,14,30,0.96) 100%);
    border: 1px solid rgba(0,180,220,0.22);
    border-radius: 4px;
    overflow: hidden;
    min-height: 0;
    display: flex;
    flex-direction: column;

    &::before {
        content: '';
        position: absolute;
        top: 0; left: 0;
        width: 12px; height: 12px;
        border-top: 2px solid #00b4d8;
        border-left: 2px solid #00b4d8;
        z-index: 2;
    }
    &::after {
        content: '';
        position: absolute;
        bottom: 0; right: 0;
        width: 12px; height: 12px;
        border-bottom: 2px solid #00b4d8;
        border-right: 2px solid #00b4d8;
        z-index: 2;
    }
}
.map-wrap {
    flex: 1;
    position: relative;
    overflow: hidden;
    min-height: 0;
}

.map-loc {
    position: absolute;
    top: 20px; left: 14px;
    font-size: 11px;
    color: #e4eef1;
    z-index: 5;
    display: flex;
}

.map-breadcrumb {
    // position: absolute;
    top: 8px;
    left: 14px;
    z-index: 6;
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 11px;
    white-space: nowrap;
}

.breadcrumb-item {
    color: #76d5ff;
    line-height: 1;

    &.clickable {
        cursor: pointer;
        transition: color 0.2s;
        &:hover {
            color: #b8ecff;
        }
    }

    &.current {
        color: #f2f8ff;
        font-weight: 600;
        cursor: default;
    }
}

.breadcrumb-sep {
    color: rgba(126, 184, 208, 0.85);
    font-size: 10px;
    line-height: 1;
}

.map-echarts {
    position: absolute;
    top: 0; left: 0;
    width:calc(100% - 256px - 10px);
    // width: 100%;
    height: 100%;
}

/* ---- 排行面板 ---- */
.map-panel {
    position: absolute;
    top: 10px; right: 10px;
    width: 248px;
    // background: rgba(2,14,30,0.92);
    // border: 1px solid rgba(0,180,220,0.25);
    border-radius: 4px;
    padding: 10px 10px 12px;
    z-index: 10;
}

.mp-title-row {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 8px;
}

.mp-title {
    font-size: 12px;
    font-weight: 600;
    color: #f3f8ff;
    border-bottom: 1px solid rgba(0, 180, 220, 0.12);
    padding-bottom: 6px;
    flex:1;
    margin-right: 10px;
    position: relative;
    &::after {
        content: '';
        position: absolute;
        bottom: 0; left: 0;
        width: 38px; height: 1px;
        background-color: #70bfff;
    }
}

.mp-title-decor {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    .seg {
        width: 18px;
        height: 1px;
        border-radius: 2px;
        display: inline-block;
        &.orange { background: #f4a126; }
        &.cyan { background: #48d8ea; }
        &.blue { background: #70bfff; }
    }
}

.mp-unit {
    font-size: 10px;
    color: rgba(225, 238, 250, 0.78);
    margin-bottom: 4px;
}

.mp-unit-trend {
    margin: 2px 0 4px;
}

.mp-ranking-chart {
    width: 100%;
    height: 170px;
    margin-bottom: 10px;
}

.mp-note {
    font-size: 11px;
    color: #d7ecff;
    background: linear-gradient(90deg, rgba(15, 105, 140, 0.2) 0%, rgba(11, 84, 122, 0.06) 100%);
    border: 1px solid rgba(56, 214, 236, 0.34);
    border-radius: 3px;
    padding: 8px 8px;
    margin-bottom: 8px;
    line-height: 1.5;
    // display: flex;
    align-items: flex-start;
    gap: 4px;
    box-shadow: inset 0 0 14px rgba(36, 154, 185, 0.18);
    .emph {
        color: #3ddbf0;
        font-weight: 700;
        margin: 0 1px;
    }
}

.mp-note-dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: linear-gradient(180deg, #47e1f2 0%, #1ba1bb 100%);
    flex-shrink: 0;
    margin-top: 3px;
    box-shadow: 0 0 6px rgba(63, 218, 240, 0.6);
}

.mp-trend-chart {
    width: 100%;
    height: 170px;
}

/* ============================================================
   右栏：监测任务情况
   ============================================================ */
.monitor-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    flex: 1;
}

.monitor-stat {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    flex: 1;
    min-width: 0;
    .biz-info{
        flex-direction: column;
        flex: none;
    }
}

.gauge-right {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80px;
    position: relative;
}

.gauge-mini {
    width: 90px;
    height: 90px;
}

.gauge-lbl {
    font-size: 10px;
    color: #e4eef1;
    margin-top: 2px;
    text-align: center;
    position: absolute;
    top: 60%; left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    min-width: 50px
}

/* ---- 任务4格 ---- */
.task-grid-box {
    flex: 1.2;
    display: flex;
    // align-items: center;
    margin-bottom: 10px;
}
.task-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
     gap: 16px;
    // display: flex;
    // flex-wrap: wrap;
    // justify-content: space-around;
    //  align-items: center;
     justify-content: center;
     width: 100%;
     padding: 0 10px;
}

.tg-item {
    padding: 0 0;
    border-radius: 2px;
    text-align: center;
    border: 1px solid;
    transform: skewX(-15deg);
    overflow: hidden;
    // width: 40%;
    display: flex;
    .tg-lbl {
        font-size: 10px;
        color: #7eb8d0;
        width: 24px;
        padding: 8px 8px;
        transform: skewX(15deg);
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 1.2;
        &::after {
            content: '';
            position: absolute;
            top: 0; right: 0;
            bottom:0;
            width: 1px; 
            background: rgba(0, 150, 255, 0.3);
            transform: skewX(-15deg);
        }
    }
    .tg-val {
        font-size: 16px;
        font-weight: 600;
        color: #e0f4ff;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        transform: skewX(15deg);
    }

    &.blue {
        border-color: rgba(0,212,255,0.5);
        background: linear-gradient(135deg, rgba(0,150,255,0.15) 0%, rgba(0,100,200,0.05) 100%);
        box-shadow: 0 0 8px rgba(0,150,255,0.2), inset 0 0 10px rgba(0,150,255,0.1);
        .tg-val { 
            color: #00d4ff; 
            text-shadow: 0 0 8px rgba(0,212,255,0.5);
        }
    }
    &.orange {
        border-color: rgba(255,150,0,0.5);
        background: linear-gradient(135deg, rgba(255,150,0,0.15) 0%, rgba(200,100,0,0.05) 100%);
        box-shadow: 0 0 8px rgba(255,150,0,0.2), inset 0 0 10px rgba(255,150,0,0.1);
        .tg-val { 
            color: #ff9800; 
            text-shadow: 0 0 8px rgba(255,150,0,0.5);
        }
        .tg-lbl { 
            &::after {
                 background: rgba(255,150,0,0.3);
            }
            color: #ffb74d;
        }
    }
    &.yellow {
        border-color: rgba(255,200,0,0.5);
        background: linear-gradient(135deg, rgba(255,200,0,0.15) 0%, rgba(200,150,0,0.05) 100%);
        box-shadow: 0 0 8px rgba(255,200,0,0.2), inset 0 0 10px rgba(255,200,0,0.1);
        .tg-val { 
            color: #ffc107; 
            text-shadow: 0 0 8px rgba(255,200,0,0.5);
        }
        .tg-lbl { 
            &::after {
                 background: rgba(255,200,0,0.3);
            }
            color: #ffd54f;
        }
    }
    &.cyan {
        border-color: rgba(0,220,220,0.5);
        background: linear-gradient(135deg, rgba(0,220,220,0.15) 0%, rgba(0,150,150,0.05) 100%);
        box-shadow: 0 0 8px rgba(0,220,220,0.2), inset 0 0 10px rgba(0,220,220,0.1);
        .tg-val { 
            color: #00e5ff; 
            text-shadow: 0 0 8px rgba(0,220,220,0.5);
        }
        .tg-lbl { 
            &::after {
               background: rgba(0,220,220,0.3);
            }
            color: #4dd0e1;
        }
    }
}

/* ---- 基地巡查情况 ---- */
.insp-wrap {
    display: flex;
    align-items: center;
    gap: 10px;
    height: 100%;
    padding: 0 10px;
}

.insp-stats {
    flex: 1;
    min-width: 0;
    .biz-item:first-child {
        margin-bottom: 12px;
    }
}

/* ============================================================
   响应式
   ============================================================ */
@media screen and (min-width: 1440px) {
    .da-main {
        gap: 14px;
        padding: 14px 18px;
    }
    .chart-box {
        // height: 160px;
    }
}

@media screen and (min-width: 1680px) {
    .da-main {
        gap: 16px;
        padding: 16px 22px;
    }
    .chart-box {
        height: 180px;
    }
    .biz-icon {
        width: 44px;
        height: 44px;
    }
}

@media screen and (min-width: 1920px) {
    .da-main {
        gap: 18px;
        padding: 18px 26px;
    }
    .biz-info .biz-val {
        font-size: 20px;
    }
    .ec-info .ec-val {
        font-size: 20px;
    }
    .chart-box {
        height: 200px;
    }
    .mp-ranking-chart {
        height: 140px;
    }
    .mp-trend-chart {
        height: 120px;
    }
}
</style>
