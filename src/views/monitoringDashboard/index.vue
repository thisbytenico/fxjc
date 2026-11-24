<template>
    <div class="monitoring-dashboard">
        <p v-if="errorMessage" class="dashboard-error" role="alert">{{ errorMessage }}</p>

        <main v-if="dashboard" class="dashboard-grid">
            <section class="screen-panel task-panel">
                <header class="panel-heading"><h2>监测任务情况</h2></header>
                <div class="task-groups">
                    <article
                        v-for="group in dashboard.taskGroups"
                        :key="group.name"
                        class="task-group"
                        :style="{ '--accent-color': group.color }"
                    >
                        <div class="task-summary title-underline">
                            <h3><i aria-hidden="true"></i>{{ group.name }}</h3>
                            <strong>{{ formatNumber(group.value) }}<small>{{ group.unit }}</small></strong>
                        </div>
                        <dl class="task-levels">
                            <div v-for="level in group.levels" :key="level.name">
                                <dt>{{ level.name }}</dt>
                                <dd>{{ level.value }}<small>次</small></dd>
                            </div>
                        </dl>
                    </article>
                </div>
            </section>

            <section class="map-panel" aria-label="监测业务地图">
                <RegionDrilldownMap
                    :data="dashboard.map.values"
                    :load-region-data="getMonitoringRegion"
                    :show-nine-dash-line="showNineDashLine"
                    :colors="mapColors"
                    :appearance="mapAppearance"
                    :show-pedestal="false"
                    value-label="监测任务数"
                    value-unit="次"
                    aria-label="全国监测任务分布地图，点击行政区可下钻"
                    @error="handleMapError"
                />
            </section>

            <section class="screen-panel comparison-panel">
                <header class="panel-heading"><h2>基地巡查数据对比</h2></header>
                <div class="comparison-metrics">
                    <article
                        v-for="metric in dashboard.inspectionComparison.metrics"
                        :key="metric.name"
                        class="comparison-metric title-underline"
                        :style="{ '--metric-color': metric.color }"
                    >
                        <h3>{{ metric.name }}</h3>
                        <strong>{{ formatNumber(metric.value) }}<small>{{ metric.unit }}</small></strong>
                    </article>
                </div>
                <div ref="comparisonChartRef" class="chart comparison-chart" role="img" aria-label="基地巡查任务堆叠柱状图"></div>
            </section>

            <section class="screen-panel sampling-panel">
                <header class="panel-heading"><h2>例行检查抽检统计</h2></header>
                <div class="sampling-metrics">
                    <p>可追溯数量<strong>{{ formatNumber(dashboard.samplingStatistics.traceable) }}<small>次</small></strong></p>
                    <p>不可追溯数量<strong>{{ formatNumber(dashboard.samplingStatistics.untraceable) }}<small>次</small></strong></p>
                </div>
                <div class="sampling-content">
                    <div class="sampling-dial">
                        <div ref="samplingChartRef" class="chart sampling-chart" role="img" aria-label="例行检查抽检类型占比"></div>
                    </div>
                    <ul class="sampling-legend" aria-label="抽检类型图例">
                        <li
                            v-for="item in dashboard.samplingStatistics.categories"
                            :key="item.name"
                            :style="{ '--legend-color': item.color }"
                        ><i aria-hidden="true"></i><span>{{ item.name }}：</span><strong>{{ formatNumber(item.value) }}</strong></li>
                    </ul>
                </div>
            </section>

            <section class="screen-panel news-panel">
                <header class="panel-heading"><h2>动态信息</h2></header>
                <div class="news-table" role="table" aria-label="监测业务动态信息">
                    <div class="news-table-head" role="row">
                        <span role="columnheader">时间</span><span role="columnheader">内容</span>
                    </div>
                    <div class="news-table-body">
                        <div v-for="(item, index) in dashboard.news" :key="`${item.time}-${index}`" role="row">
                            <time role="cell">{{ item.time }}</time><span role="cell">{{ item.content }}</span>
                        </div>
                    </div>
                </div>
            </section>

            <section class="screen-panel ranking-panel">
                <header class="panel-heading"><h2>监测任务区域排行</h2></header>
                <div class="ranking-table-wrap">
                    <table class="ranking-table">
                        <thead><tr><th scope="col">地区</th><th scope="col">任务数</th><th scope="col">合格率</th></tr></thead>
                        <tbody>
                            <tr v-for="item in dashboard.regionRanking" :key="item.name">
                                <td>{{ item.name }}</td><td>{{ formatNumber(item.tasks) }}</td><td>{{ item.passRate }}%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </main>

        <p v-else-if="!errorMessage" class="loading-state" role="status">数据加载中...</p>
    </div>
</template>

<script>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import * as echarts from 'echarts';
import RegionDrilldownMap from '@/components/Business/RegionDrilldownMap.vue';
import { getMonitoringDashboard, getMonitoringRegion } from '@/y_api/monitoringDashboard';
import { SHOW_MONITORING_MAP_NINE_DASH_LINE } from '@/config/monitoringDashboard';

const MAP_COLORS = ['#075071', '#007aa8', '#0099ce', '#00afe5', '#21c6f4'];
const MAP_APPEARANCE = {
    countryZoom: 1.26,
    countryLayoutCenter: ['50%', '52%'],
    countryFontSize: 12,
    borderColor: 'rgba(177, 233, 255, .9)',
    borderWidth: 1.2
};
const TOOLTIP = {
    trigger: 'item',
    backgroundColor: 'rgba(5, 21, 38, .96)',
    borderColor: '#2b84ad',
    textStyle: { color: '#fff', fontSize: 12 }
};

const comparisonOption = data => ({
    color: data.series.map(item => item.color),
    tooltip: { ...TOOLTIP, trigger: 'axis', axisPointer: { type: 'shadow' } },
    legend: {
        top: 10,
        right: 9,
        icon: 'rect',
        itemWidth: 11,
        itemHeight: 10,
        itemGap: 9,
        textStyle: { color: '#edf4f8', fontSize: 11 },
        data: data.series.map(item => item.name)
    },
    grid: { left: 42, right: 24, top: 66, bottom: 56, containLabel: false },
    xAxis: {
        type: 'category',
        data: data.categories,
        axisLabel: { color: '#f0f4f8', fontSize: 14, interval: 0 },
        axisTick: { show: false },
        axisLine: { lineStyle: { color: 'rgba(151, 181, 202, .52)' } }
    },
    yAxis: {
        type: 'value',
        min: 0,
        max: 650,
        interval: 100,
        axisLabel: { color: '#6f8091', fontSize: 10 },
        axisTick: { show: false },
        axisLine: { show: true, lineStyle: { color: 'rgba(151, 181, 202, .52)' } },
        splitLine: { show: false }
    },
    series: data.series.map(item => ({
        name: item.name,
        type: 'bar',
        stack: 'task',
        barMaxWidth: 22,
        data: item.values,
        emphasis: { focus: 'series' },
        itemStyle: { color: item.color }
    }))
});

const samplingOption = data => ({
    color: data.map(item => item.color),
    tooltip: { ...TOOLTIP, formatter: '{b}<br/>{c}' },
    series: [{
        type: 'pie',
        center: ['50%', '50%'],
        radius: ['74%', '90%'],
        startAngle: 90,
        clockwise: true,
        avoidLabelOverlap: true,
        label: { show: false },
        labelLine: { show: false },
        itemStyle: { borderColor: '#0b2033', borderWidth: 1 },
        data
    }]
});

export default {
    name: 'MonitoringDashboard',
    components: { RegionDrilldownMap },
    setup() {
        const dashboard = ref(null);
        const errorMessage = ref('');
        const comparisonChartRef = ref(null);
        const samplingChartRef = ref(null);
        const charts = new Map();
        let observer;
        let destroyed = false;

        const formatNumber = value => Number(value || 0).toLocaleString('en-US');
        const resizeCharts = () => charts.forEach(chart => chart.resize());
        const initChart = (element, option) => {
            if (!element) return;
            const chart = echarts.init(element);
            chart.setOption(option);
            charts.set(element, chart);
            observer?.observe(element);
        };
        const handleMapError = error => {
            errorMessage.value = error.message || '地图数据加载失败';
        };

        onMounted(async () => {
            try {
                const data = await getMonitoringDashboard();
                if (destroyed) return;
                dashboard.value = data;
                await nextTick();
                if (destroyed) return;

                if (typeof ResizeObserver === 'undefined') {
                    window.addEventListener('resize', resizeCharts);
                } else {
                    observer = new ResizeObserver(entries => {
                        entries.forEach(({ target }) => charts.get(target)?.resize());
                    });
                }
                initChart(comparisonChartRef.value, comparisonOption(data.inspectionComparison));
                initChart(samplingChartRef.value, samplingOption(data.samplingStatistics.categories));
            } catch (error) {
                if (!destroyed) errorMessage.value = error.message || '监测业务数据加载失败';
            }
        });

        onBeforeUnmount(() => {
            destroyed = true;
            observer?.disconnect();
            window.removeEventListener('resize', resizeCharts);
            charts.forEach(chart => chart.dispose());
            charts.clear();
        });

        return {
            dashboard,
            errorMessage,
            comparisonChartRef,
            samplingChartRef,
            formatNumber,
            getMonitoringRegion,
            handleMapError,
            mapColors: MAP_COLORS,
            mapAppearance: MAP_APPEARANCE,
            showNineDashLine: SHOW_MONITORING_MAP_NINE_DASH_LINE
        };
    }
};
</script>

<style lang="less" scoped>
* { box-sizing: border-box; }

.monitoring-dashboard {
    position: relative;
    width: 100%;
    height: 100%;
    min-width: 1200px;
    min-height: 0;
    overflow: hidden;
    color: #f5f8fc;
    font-family: "Microsoft YaHei", "PingFang SC", sans-serif;
    background: #09182b url(@/assets/images/bg-zsyw.png) center bottom / cover no-repeat;
    background-size: cover;
    background-position: 50% 150%;
}

.dashboard-grid {
    display: grid;
    grid-template-columns: minmax(280px, 1fr) minmax(550px, 1.91fr) minmax(280px, 1fr);
    grid-template-rows: minmax(0, 59fr) minmax(0, 41fr);
    gap: clamp(14px, 1.56vw, 30px);
    width: 100%;
    height: 100%;
    padding: clamp(14px, 3.28vh, 33px) clamp(14px, 1.46vw, 28px) clamp(16px, 4.47vh, 45px);
}

.screen-panel {
    display: flex;
    flex-direction: column;
    min-width: 0;
    min-height: 0;
    overflow: hidden;
    border: 1px solid #245077;
    background: rgba(7, 23, 41, .82);
}

.panel-heading {
    position: relative;
    display: flex;
    align-items: center;
    flex: 0 0 34px;
    min-width: 0;
    padding: 0 8px;
    gap: 11px;
    border-bottom: 1px solid #203a55;
    background: repeating-linear-gradient(44deg, #102033 0 24px, #162b46 24px 42px);
}
.panel-heading::before {
    content: '';
    flex: 0 0 15px;
    height: 20px;
    background: linear-gradient(#4786cb 50%, #3069a8 50%);
    clip-path: polygon(50% 0, 100% 26%, 53% 50%, 100% 74%, 50% 100%, 0 74%, 47% 50%, 0 26%);
}
.panel-heading::after {
    content: '';
    position: absolute;
    right: 1px;
    bottom: -1px;
    width: 12px;
    height: 2px;
    background: #f1df83;
    transform: skewX(-30deg);
    display: none;
}
.panel-heading h2 { margin: 0; overflow: hidden; font-size: 22px; line-height: 1; white-space: nowrap; text-overflow: ellipsis; }

.title-underline { position: relative; }
.title-underline::after {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 14px;
    background: url(@/assets/images/line.png) center bottom / 100% 100% no-repeat;
    pointer-events: none;
}

.task-groups { display: flex; flex: 1; min-height: 0; flex-direction: column; padding: 13px 24px 15px; }
.task-group { display: flex; flex: 1; min-height: 0; flex-direction: column; justify-content: center; }
.task-summary { display: flex; align-items: center; justify-content: space-between; min-height: 42px; padding: 0 8px 10px 20px; }
.task-summary::after { left: -20px; }
.task-summary h3 { position: relative; margin: 0; font-size: 19px; font-style: italic; white-space: nowrap; }
.task-summary h3 i { position: absolute; top: 50%; left: -19px; width: 11px; height: 11px; background: var(--accent-color); transform: translateY(-50%); }
.task-summary strong { color: var(--accent-color); font: italic 700 33px/1 Arial, sans-serif; white-space: nowrap; }
.task-summary small { margin-left: 2px; font-size: 13px; }
.task-levels { display: grid; gap: 5px; margin: 3px 29px 0 22px; }
.task-levels > div { display: grid; grid-template-columns: minmax(0, 1fr) 84px; align-items: center; gap: 7px; min-height: 25px; }
.task-levels dt { position: relative; padding-left: 0; color: #8192a8; font-size: 17px; font-style: italic; white-space: nowrap; }
.task-levels dt::after { content: ''; position: absolute; top: 50%; right: 0; left: 80px; border-top: 3px solid #1e3349; transform: translateY(-50%); }
.task-levels dd { margin: 0; text-align: right; font: italic 700 21px/1 Arial, sans-serif; white-space: nowrap; }
.task-levels small { margin-left: 2px; font-size: 10px; }

.map-panel { position: relative; min-width: 0; min-height: 0; }
.map-panel :deep(.map-location) { top: -1px; left: 6px; font-size: 20px; }
.map-panel :deep(.map-chart) { position: absolute; inset: 20px 0 0; height: calc(100% - 20px); }

.comparison-metrics {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    flex: 0 0 91px;
    margin: 17px 15px 0;
    padding: 3px 8px 5px;
    border: 1px solid #275779;
    border-radius: 5px;
    background: linear-gradient(180deg, rgba(16, 46, 67, .75), rgba(8, 25, 42, .6));
    box-shadow: inset 0 0 8px rgba(22, 139, 185, .22);
}
.comparison-metric { display: flex; align-items: baseline; justify-content: space-between; min-width: 0; padding: 8px 2px 12px; gap: 6px; }
.comparison-metric:nth-child(odd) { margin-right: 8px; }
.comparison-metric h3 { margin: 0; overflow: hidden; font-size: 16px; font-style: italic; white-space: nowrap; text-overflow: ellipsis; }
.comparison-metric strong { color: var(--metric-color); font: italic 700 27px/1 Arial, sans-serif; white-space: nowrap; }
.comparison-metric small { margin-left: 2px; font-size: 11px; }
.chart { width: 100%; min-width: 0; min-height: 0; }
.comparison-chart { flex: 1; }

.sampling-metrics { display: grid; gap: 14px; flex: 0 0 122px; padding: 20px 34px 7px; }
.sampling-metrics p {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    min-width: 0;
    height: 44px;
    margin: 0;
    padding: 6px 14px;
    border: 1px solid #3489ae;
    border-radius: 6px;
    font-size: 17px;
    font-style: italic;
    box-shadow: inset 0 0 8px rgba(26, 121, 165, .25), 0 0 8px rgba(27, 137, 184, .18);
}
.sampling-metrics p:nth-child(2) { border-color: #299d9f; }
.sampling-metrics strong { color: #36bdf7; font: italic 700 32px/1 Arial, sans-serif; white-space: nowrap; }
.sampling-metrics p:nth-child(2) strong { color: #4fe7e0; }
.sampling-metrics small { margin-left: 2px; font-size: 11px; }
.sampling-content { display: grid; grid-template-columns: 52% minmax(0, 1fr); flex: 1; min-height: 0; align-items: center; padding: 0 26px 12px 42px; }
.sampling-dial { display: grid; align-items: center; justify-items: start; width: 100%; height: 100%; min-height: 0; padding-left: 13px; container-type: size; transform: translateY(3px); }
.sampling-chart {
    width: min(100cqw, calc(100cqh * 168 / 167), 168px);
    aspect-ratio: 168 / 167;
    background-image: url(@/assets/images/bg-btu2.png);
    background-position: center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
.sampling-legend { display: grid; gap: 8px; margin: 0; padding: 0 0 0 11px; list-style: none; }
.sampling-legend li { display: flex; align-items: center; min-width: 0; font-size: 13px; white-space: nowrap; }
.sampling-legend i { flex: 0 0 10px; width: 10px; height: 10px; margin-right: 7px; background: var(--legend-color); }
.sampling-legend strong { font-weight: 400; }

.news-table { display: flex; flex: 1; min-height: 0; flex-direction: column; margin: 19px 21px 18px; border: 1px solid #24557a; background: rgba(3, 25, 43, .55); }
.news-table-head { display: grid; grid-template-columns: 142px minmax(0, 1fr); flex: 0 0 31px; align-items: center; padding: 0 17px; border-bottom: 1px solid #2a6285; background: rgba(47, 77, 105, .56); font-size: 18px; font-weight: 700; }
.news-table-body { display: grid; align-content: space-evenly; flex: 1; min-height: 0; padding: 6px 18px 8px; overflow: hidden; }
.news-table-body > div { display: grid; grid-template-columns: 142px minmax(0, 1fr); align-items: center; min-height: 0; font-size: 16px; }
.news-table-body time { color: #4f8ac7; white-space: nowrap; }
.news-table-body span { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }

.ranking-table-wrap { flex: 1; min-height: 0; margin: 20px 15px 17px; overflow: hidden; border: 1px solid #24557a; background: rgba(3, 25, 43, .46); }
.ranking-table { width: 100%; height: 100%; border-collapse: collapse; table-layout: fixed; font-size: 17px; }
.ranking-table th { height: 30px; padding: 0 19px; color: #c8d7e5; background: rgba(47, 77, 105, .56); font-size: 18px; text-align: left; }
.ranking-table th:first-child { width: 45%; }
.ranking-table th:nth-child(2) { width: 31%; }
.ranking-table th:last-child { width: 24%; }
.ranking-table td { height: calc((100% - 30px) / 6); padding: 0 19px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }

.dashboard-error, .loading-state { margin: 0; text-align: center; }
.dashboard-error { position: absolute; top: 5px; left: 50%; z-index: 5; padding: 5px 12px; color: #ffd9da; background: #4e2438; transform: translateX(-50%); }
.loading-state { padding: 24px; color: #b5e2f6; }

@media screen and (max-width: 1450px), screen and (max-height: 820px) {
    .panel-heading { flex-basis: 30px; }
    .panel-heading h2 { font-size: 17px; }
    .task-groups { padding: 6px 13px 8px; }
    .task-summary { min-height: 34px; padding-bottom: 7px; }
    .task-summary h3 { font-size: 15px; }
    .task-summary strong { font-size: 25px; }
    .task-levels { gap: 2px; margin: 1px 20px 0 22px; }
    .task-levels > div { grid-template-columns: minmax(0, 1fr) 68px; gap: 5px; min-height: 19px; }
    .task-levels dt { font-size: 13px; }
    .task-levels dd { font-size: 16px; }
    .map-panel :deep(.map-location) { font-size: 16px; }
    .comparison-metrics { flex-basis: 73px; margin: 10px 9px 0; }
    .comparison-metric { padding: 5px 1px 9px; }
    .comparison-metric h3 { font-size: 12px; }
    .comparison-metric strong { font-size: 20px; }
    .sampling-metrics { gap: 7px; flex-basis: 83px; padding: 9px 17px 4px; }
    .sampling-metrics p { height: 34px; padding: 3px 10px; font-size: 13px; }
    .sampling-metrics strong { font-size: 23px; }
    .sampling-content { grid-template-columns: minmax(110px, .94fr) minmax(100px, 1fr); padding: 0 10px 6px 23px; }
    .sampling-dial { place-items: center; padding-left: 0; transform: none; }
    .sampling-legend { gap: 4px; padding-left: 7px; }
    .sampling-legend li { font-size: 11px; }
    .news-table { margin: 10px 12px 10px; }
    .news-table-head { grid-template-columns: 112px minmax(0, 1fr); flex-basis: 26px; padding: 0 12px; font-size: 14px; }
    .news-table-body { padding: 3px 12px 5px; }
    .news-table-body > div { grid-template-columns: 112px minmax(0, 1fr); font-size: 12px; }
    .ranking-table-wrap { margin: 10px 9px 9px; }
    .ranking-table { font-size: 13px; }
    .ranking-table th { height: 26px; padding: 0 12px; font-size: 14px; }
    .ranking-table td { padding: 0 12px; }
}
</style>
