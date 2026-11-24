<template>
    <div class="regulatory-screen">
        <p v-if="errorMessage" class="dashboard-error" role="alert">{{ errorMessage }}</p>

        <main v-if="dashboard" class="regulatory-grid">
            <div class="side-column monitoring-column">
                <section class="screen-panel">
                    <header class="panel-heading"><h2>监测任务情况</h2></header>
                    <div class="comparison-summary task-total">
                        <p>监测任务总数
                            <strong>{{ formatMetric(metrics.tasks) }}<small v-if="metrics.tasks != null">次</small></strong>
                        </p>
                    </div>
                    <div class="task-overview">
                        <div class="task-dial">
                            <div ref="taskPieRef" class="chart task-pie" role="img" aria-label="监测任务构成"></div>
                        </div>
                        <ul class="task-legend">
                            <li v-for="(item, index) in taskBreakdown" :key="item.name" :style="{ '--series-color': taskColors[index] }">
                                <i aria-hidden="true"></i><span>{{ item.name }}</span><strong>{{ item.value }}</strong>
                            </li>
                        </ul>
                    </div>
                </section>

                <section class="screen-panel">
                    <header class="panel-heading"><h2>监测任务区域排行</h2></header>
                    <div class="panel-controls">
                        <label class="filter-select">
                            <select v-model="selectedRegion" aria-label="筛选监测任务地区">
                                <option value="">全部</option>
                                <option v-for="item in regionTaskRank" :key="item.name" :value="item.name">{{ item.name }}</option>
                            </select>
                        </label>
                    </div>
                    <div ref="regionRankRef" class="chart" role="img" aria-label="监测任务区域排行"></div>
                </section>

                <section class="screen-panel">
                    <header class="panel-heading"><h2>监测任务数据对比</h2></header>
                    <div class="comparison-summary comparison-summary--tasks">
                        <p>监测任务同期对比{{ growthDirection(taskComparison.growth) }}
                            <strong>{{ growthValue(taskComparison.growth) }}<small v-if="taskComparison.growth != null">%</small></strong>
                        </p>
                        <label class="filter-select">
                            <select v-model="selectedTask" aria-label="筛选对比任务类别">
                                <option value="">全部</option>
                                <option v-for="item in taskComparisons" :key="item.name" :value="item.name">{{ item.name }}</option>
                            </select>
                        </label>
                    </div>
                    <div ref="taskComparisonRef" class="chart" role="img" aria-label="两年监测任务数据对比"></div>
                </section>
            </div>

            <section class="map-panel" aria-label="监管业务地图">
                <RegionDrilldownMap
                    :data="dashboard.map.values"
                    :load-region-data="getRegulatoryRegion"
                    :show-nine-dash-line="showNineDashLine"
                    :colors="mapColors"
                    :appearance="mapAppearance"
                    value-label="监管任务数"
                    value-unit="次"
                    aria-label="全国监管任务分布地图，点击行政区可下钻"
                    @error="handleMapError"
                />
                <dl class="map-metrics">
                    <div v-for="metric in mapMetrics" :key="metric.label" :style="{ '--metric-color': metric.color }">
                        <dt><img :src="metric.icon" alt="" />{{ metric.label }}</dt>
                        <dd>{{ formatMetric(metric.value) }}<small v-if="metric.value != null">{{ metric.unit }}</small></dd>
                    </div>
                </dl>
            </section>

            <div class="side-column patrol-column">
                <section class="screen-panel">
                    <header class="panel-heading"><h2>基地巡查区域排行</h2></header>
                    <div class="comparison-summary comparison-summary--patrol">
                        <p>基地巡查总数
                            <strong>{{ formatMetric(metrics.basePatrols) }}<small v-if="metrics.basePatrols != null">次</small></strong>
                        </p>
                    </div>
                    <div ref="baseRankRef" class="chart" role="img" aria-label="基地巡查区域排行"></div>
                </section>

                <section class="screen-panel">
                    <header class="panel-heading"><h2>基地巡查数据对比</h2></header>
                    <div class="comparison-summary comparison-summary--patrol comparison-summary--growth">
                        <p>季度巡查同期对比{{ growthDirection(dashboard.quarterlyComparison.growth) }}
                            <strong>{{ growthValue(dashboard.quarterlyComparison.growth) }}<small v-if="dashboard.quarterlyComparison.growth != null">%</small></strong>
                        </p>
                    </div>
                    <div ref="baseComparisonRef" class="chart" role="img" aria-label="两年基地巡查数据对比"></div>
                </section>
            </div>
        </main>

        <p v-else-if="!errorMessage" class="loading-state" role="status">数据加载中…</p>
    </div>
</template>

<script>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import * as echarts from 'echarts';
import RegionDrilldownMap from '@/components/Business/RegionDrilldownMap.vue';
import { getRegulatoryDashboard, getRegulatoryRegion } from '@/y_api/regulatory';
import { SHOW_REGULATORY_MAP_NINE_DASH_LINE } from '@/config/regulatory';
import institutionIcon from '@/assets/images/regulatory/icon-g1.png';
import newInstitutionIcon from '@/assets/images/regulatory/icon-g2.png';

const TASK_COLORS = ['#008fdd', '#fff567', '#16f7db', '#28c8f1'];
const MAP_COLORS = ['#074365', '#00608d', '#007eb9', '#009cd7', '#02b7ec'];
const MAP_APPEARANCE = {
    countryZoom: 1.12,
    countryLayoutCenter: ['48%', '50%'],
    countryFontSize: 13,
    borderColor: 'rgba(134, 219, 255, .82)',
    borderWidth: 1.2
};
const AXIS_TEXT = { color: '#e6eff8', fontSize: 14 };
const TICK_TEXT = { color: '#8797a9', fontSize: 11, hideOverlap: true };
const GRID_LINE = { color: 'rgba(119, 145, 170, .24)' };
const TOOLTIP = {
    trigger: 'axis',
    backgroundColor: 'rgba(8, 24, 40, .96)',
    borderColor: '#247ba4',
    textStyle: { color: '#fff', fontSize: 12 }
};
const TASK_BAR_COLORS = [['#5feaf5', '#135269', '#0e1a2a'], ['#fff68a', '#6c6b28', '#171c26']];
const PATROL_BAR_COLORS = [['#13d7a5', '#075141', '#0d1a24'], ['#ff9b49', '#883d08', '#221c20']];
const BLUE_RANK_COLORS = ['#274661', '#31a2df'];
const GREEN_RANK_COLORS = ['#104438', '#0dbd91'];
const YEARS = ['2025', '2026'];

const gradient = (colors, vertical = false) => new echarts.graphic.LinearGradient(
    0, 0, vertical ? 0 : 1, vertical ? 1 : 0,
    colors.map((color, index) => ({ color, offset: index / (colors.length - 1) }))
);

const taskPieOption = items => ({
    color: TASK_COLORS,
    tooltip: { ...TOOLTIP, trigger: 'item', formatter: '{b}：{c}' },
    series: [{
        type: 'pie',
        // The dial artwork's ring is centered at (97.5, 94) in the 189 × 184 image.
        center: ['51.6%', '51.1%'],
        radius: ['51%', '61%'],
        startAngle: 90,
        label: { show: false },
        labelLine: { show: false },
        itemStyle: { borderColor: '#10273b', borderWidth: 1 },
        stillShowZeroSum: false,
        emptyCircleStyle: { color: '#25465e' },
        data: items
    }]
});

const rankOption = (items, colors, barWidth, axisMax) => ({
    tooltip: { ...TOOLTIP, axisPointer: { type: 'shadow' } },
    grid: { left: 23, right: 36, top: 6, bottom: 14, containLabel: true },
    xAxis: {
        type: 'value',
        max: axisMax,
        splitNumber: 6,
        axisLabel: { ...TICK_TEXT, formatter: value => String(value) },
        axisLine: { show: true, lineStyle: GRID_LINE },
        axisTick: { show: false },
        splitLine: { lineStyle: GRID_LINE }
    },
    yAxis: {
        type: 'category',
        inverse: true,
        data: items.map(item => item.name),
        axisLabel: AXIS_TEXT,
        axisTick: { show: false },
        axisLine: { show: true, lineStyle: GRID_LINE }
    },
    series: [{
        type: 'bar',
        barMaxWidth: barWidth,
        data: items.map(item => item.value),
        label: { show: true, position: 'insideRight', distance: 3, color: '#fff', fontSize: 10, fontWeight: 600 },
        itemStyle: { color: gradient(colors) }
    }]
});

const rankMaximum = items => Math.ceil(Math.max(180000, ...items.map(item => item.value)) / 30000) * 30000;

const comparisonOption = (data, colors) => ({
    tooltip: TOOLTIP,
    legend: {
        data: YEARS,
        right: 18,
        top: 4,
        icon: 'rect',
        itemWidth: 12,
        itemHeight: 8,
        textStyle: { color: '#e6eff8', fontSize: 11 }
    },
    grid: { left: 11, right: 20, top: 27, bottom: 14, containLabel: true },
    xAxis: {
        type: 'category',
        data: data.categories,
        axisLabel: AXIS_TEXT,
        axisTick: { show: false },
        axisLine: { lineStyle: GRID_LINE },
        splitLine: { show: true, lineStyle: GRID_LINE }
    },
    yAxis: {
        type: 'value',
        min: 0,
        splitNumber: 6,
        axisLabel: { ...TICK_TEXT, formatter: value => String(value) },
        axisLine: { show: true, lineStyle: GRID_LINE },
        axisTick: { show: false },
        splitLine: { show: false }
    },
    series: [data.current, data.previous].map((values, index) => ({
        name: YEARS[index],
        type: 'bar',
        data: values,
        barMaxWidth: 12,
        barGap: '125%',
        itemStyle: { color: gradient(colors[index], true) }
    }))
});

const formatMetric = value => value == null ? '—' : String(value);
const growthDirection = value => value == null ? '' : value < 0 ? '减少' : '增加';
const growthValue = value => value == null ? '—' : Number(Math.abs(value).toFixed(1));

export default {
    name: 'RegulatoryDashboard',
    components: { RegionDrilldownMap },
    setup() {
        const dashboard = ref(null);
        const errorMessage = ref('');
        const selectedRegion = ref('');
        const selectedTask = ref('');
        const taskPieRef = ref(null);
        const regionRankRef = ref(null);
        const taskComparisonRef = ref(null);
        const baseRankRef = ref(null);
        const baseComparisonRef = ref(null);

        const overview = computed(() => dashboard.value?.overview);
        const metrics = computed(() => overview.value?.metrics ?? {});
        const taskBreakdown = computed(() => overview.value?.taskBreakdown ?? dashboard.value?.subjectSummary ?? []);
        const regionTaskRank = computed(() => overview.value?.regionTaskRank ?? dashboard.value?.regionTaskRank ?? []);
        const basePatrolRank = computed(() => overview.value?.basePatrolRank ?? dashboard.value?.basePatrolRank ?? []);
        const taskComparisons = computed(() => overview.value?.taskComparisons ?? []);
        const mapMetrics = computed(() => [
            { label: '监管机构数量', value: metrics.value.institutions, unit: '家', color: '#2cacf0', icon: institutionIcon },
            { label: '本年度新增', value: metrics.value.newInstitutions ?? dashboard.value?.newInstitutions?.total, unit: '家', color: '#fff66e', icon: newInstitutionIcon }
        ]);
        const visibleTaskRank = computed(() => selectedRegion.value
            ? regionTaskRank.value.filter(item => item.name === selectedRegion.value)
            : regionTaskRank.value);
        const taskComparison = computed(() => {
            const comparison = dashboard.value?.annualComparison;
            const task = taskComparisons.value.find(item => item.name === selectedTask.value);
            if (!task) return comparison;

            const total2025 = task.current.reduce((sum, value) => sum + value, 0);
            const total2026 = task.previous.reduce((sum, value) => sum + value, 0);
            const growth = total2025 ? (total2026 - total2025) / total2025 * 100 : null;
            return { ...comparison, ...task, growth };
        });

        const charts = new Map();
        let observer;
        let destroyed = false;
        const resizeCharts = () => charts.forEach(chart => chart.resize());
        const initChart = (element, option) => {
            const chart = echarts.init(element);
            chart.setOption(option);
            charts.set(element, chart);
            observer?.observe(element);
        };

        watch(visibleTaskRank, items => {
            charts.get(regionRankRef.value)?.setOption(rankOption(items, BLUE_RANK_COLORS, 12, rankMaximum(regionTaskRank.value)));
        });
        watch(taskComparison, data => {
            charts.get(taskComparisonRef.value)?.setOption(comparisonOption(data, TASK_BAR_COLORS));
        });

        const handleMapError = error => {
            errorMessage.value = error.message || '地图数据加载失败';
        };
        onMounted(async () => {
            try {
                const data = await getRegulatoryDashboard();
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
                initChart(taskPieRef.value, taskPieOption(taskBreakdown.value));
                initChart(regionRankRef.value, rankOption(visibleTaskRank.value, BLUE_RANK_COLORS, 12, rankMaximum(regionTaskRank.value)));
                initChart(taskComparisonRef.value, comparisonOption(taskComparison.value, TASK_BAR_COLORS));
                initChart(baseRankRef.value, rankOption(basePatrolRank.value, GREEN_RANK_COLORS, 16, rankMaximum(basePatrolRank.value)));
                initChart(baseComparisonRef.value, comparisonOption(data.quarterlyComparison, PATROL_BAR_COLORS));
            } catch (error) {
                if (!destroyed) errorMessage.value = error.message || '监管业务数据加载失败';
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
            dashboard, errorMessage, metrics, taskBreakdown, regionTaskRank, taskComparisons, mapMetrics,
            selectedRegion, selectedTask, taskComparison,
            taskPieRef, regionRankRef, taskComparisonRef, baseRankRef, baseComparisonRef,
            getRegulatoryRegion, handleMapError, formatMetric, growthDirection, growthValue,
            taskColors: TASK_COLORS, mapColors: MAP_COLORS, mapAppearance: MAP_APPEARANCE,
            showNineDashLine: SHOW_REGULATORY_MAP_NINE_DASH_LINE
        };
    }
};
</script>

<style lang="less" scoped>
* { box-sizing: border-box; }

.regulatory-screen {
    position: relative;
    width: 100%;
    height: 100%;
    min-width: 1200px;
    min-height: 0;
    overflow: auto;
    color: #f4f8fc;
    font-family: "Microsoft YaHei", "PingFang SC", sans-serif;
    background: #0e192a url(@/assets/images/regulatory/bg2-jgyw.png) center bottom / cover no-repeat;
}

.regulatory-grid {
    display: grid;
    grid-template-columns: minmax(275px, 1fr) minmax(530px, 1.92fr) minmax(275px, 1fr);
    gap: clamp(14px, 1.48vw, 28px);
    height: 100%;
    min-height: 620px;
    padding: clamp(18px, 3.05vh, 33px) clamp(14px, 1.48vw, 28px) clamp(20px, 4.1vh, 45px);
}

.side-column {
    display: grid;
    min-width: 0;
    min-height: 0;
    gap: clamp(14px, 2.7vh, 29px);
}
.monitoring-column { grid-template-rows: minmax(0, 1.17fr) repeat(2, minmax(0, 1fr)); }
.patrol-column { grid-template-rows: repeat(2, minmax(0, 1fr)); }
.screen-panel {
    display: flex;
    flex-direction: column;
    min-width: 0;
    min-height: 0;
    overflow: hidden;
    border: 1px solid #254761;
    background: #0e192aeb;
}

.panel-heading {
    position: relative;
    display: flex;
    align-items: center;
    flex: 0 0 34px;
    padding: 0 9px;
    gap: 11px;
    background: repeating-linear-gradient(44deg, #102033 0 24px, #162b46 24px 42px);
    border-bottom: 1px solid #1b324a;
}
.panel-heading::before {
    content: '';
    flex: 0 0 11px;
    height: 19px;
    background: linear-gradient(#4786cb 50%, #3069a8 50%);
    clip-path: polygon(50% 0, 100% 26%, 53% 50%, 100% 74%, 50% 100%, 0 74%, 47% 50%, 0 26%);
}
.panel-heading::after {
    content: '';
    position: absolute;
    right: 1px;
    bottom: -1px;
    width: 11px;
    height: 2px;
    background: #e4ce91;
    transform: skewX(-30deg);
    display: none;
}
.panel-heading h2 { margin: 0; font-size: clamp(17px, 1.14vw, 22px); line-height: 1.1; }
.chart { flex: 1; min-width: 0; min-height: 0; width: 100%; }

.task-overview {
    display: grid;
    grid-template-columns: minmax(0, min(49%, 189px)) minmax(0, 1fr);
    align-items: center;
    gap: clamp(12px, 1.4vw, 28px);
    flex: 1;
    min-height: 0;
    padding: 0 clamp(14px, 2vw, 39px) 14px 19px;
}
.task-dial {
    display: grid;
    place-items: center;
    width: 100%;
    height: 100%;
    min-height: 0;
    container-type: size;
}
.task-pie {
    width: 100%;
    width: min(100cqw, calc(100cqh * 189 / 184));
    aspect-ratio: 189 / 184;
    background: url(@/assets/images/regulatory/bg-bingtu.png) center / 100% 100% no-repeat;
}
.task-legend { display: grid; gap: clamp(7px, 1.3vh, 15px); margin: 0; padding: 0; list-style: none; }
.task-legend li { display: grid; grid-template-columns: 11px auto 1fr; align-items: center; gap: 8px; white-space: nowrap; font-size: clamp(12px, .94vw, 18px); }
.task-legend i { width: 11px; height: 11px; background: var(--series-color); }
.task-legend strong { color: var(--series-color); font-weight: 400; text-align: right; }

.panel-controls { display: flex; justify-content: flex-end; padding: 6px 16px 3px; }
.filter-select { position: relative; display: block; flex: 0 0 auto; width: clamp(74px, 5.3vw, 102px); }
.filter-select::after {
    content: '';
    position: absolute;
    top: 9px;
    right: 13px;
    width: 8px;
    height: 8px;
    border-right: 1px solid #93c6df;
    border-bottom: 1px solid #93c6df;
    transform: rotate(45deg);
    pointer-events: none;
}
.filter-select select {
    width: 100%;
    height: 30px;
    padding: 0 24px 0 10px;
    border: 1px solid #266087;
    border-radius: 4px;
    color: #f0f7fd;
    background: #091b2d;
    box-shadow: inset 0 0 5px #2277a582;
    appearance: none;
    font: inherit;
    font-size: 13px;
    cursor: pointer;
}

.map-panel { position: relative; min-width: 0; min-height: 0; }
.map-panel :deep(.map-location) { top: -4px; left: 5px; font-size: clamp(16px, 1.05vw, 20px); }
.map-panel :deep(.map-chart) { position: absolute; bottom: 0; height: 73%; }
.map-metrics {
    position: absolute;
    z-index: 2;
    top: 6.4%;
    left: calc(50% + 10px);
    width: min(94%, 560px);
    transform: translateX(-50%);
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    margin: 0;
}
.map-metrics > div {
    min-width: 0;
    aspect-ratio: 280 / 122;
    display: grid;
    align-content: center;
    gap: 3px;
    text-align: center;
    background: url(@/assets/images/regulatory/bg-jgsl.png) center / contain no-repeat;
}
.map-metrics dt {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    font-size: clamp(12px, 1.05vw, 20px);
    font-weight: 700;
    font-style: italic;
    white-space: nowrap;
}
.map-metrics dt img { width: clamp(12px, 1.05vw, 20px); height: auto; }
.map-metrics dd { margin: 0; color: var(--metric-color); font: italic 800 clamp(22px, 1.7vw, 33px)/1 Arial, sans-serif; }
.map-metrics small { margin-left: 1px; font-size: .43em; }

.comparison-summary {
    position: relative;
    display: flex;
    align-items: center;
    flex: 0 0 auto;
    padding: 0 16px;
    gap: 8px;
}
.comparison-summary p {
    position: relative;
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    width: fit-content;
    margin: 0;
    padding: 0 5px 9px;
    gap: clamp(4px, 1vw, 20px);
    white-space: nowrap;
    font-size: clamp(12px, 1.04vw, 20px);
    font-weight: 700;
    font-style: italic;
}
.comparison-summary p::after {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 12px;
    background-image: url(@/assets/images/line.png);
    background-repeat: no-repeat;
    background-size: contain;
    box-shadow: 0 0 7px #0f233b7d;
}
.comparison-summary strong { color: var(--value-color); font: italic 800 clamp(20px, 1.63vw, 31px)/1 Arial, sans-serif; }
.comparison-summary small { margin-left: 1px; font-size: .54em; }
.task-total { justify-content: center; min-height: clamp(49px, 6.2vh, 67px); --value-color: #2aacee; }
.task-total p { width: min(100%, 280px); padding-inline: 10px 0; }
.comparison-summary--tasks { justify-content: space-between; min-height: 47px; --value-color: #fff779; }
.comparison-summary--tasks p { padding-left: 0; }
.comparison-summary--patrol { justify-content: center; min-height: clamp(54px, 7.8vh, 84px); --value-color: #1cd4a1; }
.comparison-summary--patrol p { padding-right: 12px; padding-bottom: 13px; padding-left: 12px; gap: clamp(18px, 2.2vw, 44px); }
.comparison-summary--growth { --value-color: #2aacee; }

.dashboard-error, .loading-state { margin: 0; color: #b5e2f6; text-align: center; }
.loading-state { padding: 24px; }
.dashboard-error { position: absolute; top: 5px; left: 50%; z-index: 4; transform: translateX(-50%); padding: 4px 12px; background: #4e2438; color: #ffd9da; }

@media screen and (max-width: 1450px) {
    .task-overview { padding-right: 12px; gap: 10px; }
    .task-legend li { grid-template-columns: 8px auto 1fr; gap: 5px; }
    .task-legend i { height: 8px; width: 8px; }
    .comparison-summary { padding-right: 10px; padding-left: 10px; }
}
</style>
