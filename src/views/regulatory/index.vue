<template>
    <div class="regulatory-screen">
        <div v-if="errorMessage" class="data-error" role="alert">{{ errorMessage }}</div>

        <main v-if="dashboard" class="regulatory-grid">
            <section class="screen-panel summary-panel">
                <PanelHeading title="主体情况分析" />
                <div class="summary-metrics">
                    <article v-for="item in dashboard.subjectSummary" :key="item.name">
                        <span>{{ item.name }}</span>
                        <strong :style="{ color: item.color }">{{ formatNumber(item.value) }}<small>{{ item.unit }}</small></strong>
                    </article>
                </div>
                <div ref="compositionRef" class="chart composition-chart"></div>
            </section>

            <section class="map-panel">
                <RegionDrilldownMap
                    :data="dashboard.map.values"
                    :load-region-data="getRegulatoryRegion"
                    :show-nine-dash-line="showNineDashLine"
                    value-label="监管任务数"
                    value-unit="次"
                    aria-label="全国监管任务分布地图，点击行政区可下钻"
                    @error="handleMapError"
                />
            </section>

            <section class="screen-panel quarter-panel">
                <PanelHeading title="监测任务数据对比" detail />
                <ComparisonChart
                    ref="quarterComponentRef"
                    :data="dashboard.quarterlyComparison"
                    caption="季度巡查同期对比增加"
                    current-label="2025"
                    previous-label="2026"
                />
            </section>

            <section class="screen-panel region-rank-panel">
                <PanelHeading title="监测区域任务排名" />
                <div class="panel-tools"><FilterSelect /></div>
                <div ref="regionRankRef" class="chart rank-chart"></div>
            </section>

            <section class="screen-panel pass-panel">
                <PanelHeading title="基地巡查合格率" />
                <div ref="passRateRef" class="chart donut-chart"></div>
            </section>

            <section class="screen-panel annual-panel">
                <PanelHeading title="监测任务数据对比" />
                <ComparisonChart
                    ref="annualComponentRef"
                    :data="dashboard.annualComparison"
                    caption="监测任务同期对比增加"
                    current-label="2025"
                    previous-label="2026"
                    tone="annual"
                    filterable
                />
            </section>

            <section class="screen-panel institution-panel">
                <PanelHeading title="监测任务数据对比" />
                <div class="institution-total">
                    <span>本年度新增监管机构</span>
                    <strong>{{ formatNumber(dashboard.newInstitutions.total) }}<small>家</small></strong>
                </div>
                <div ref="institutionRef" class="chart institution-chart"></div>
            </section>

            <section class="screen-panel regulator-rank-panel">
                <PanelHeading title="监测任务数据对比" />
                <h3>各地域监管机构分布前五位排行</h3>
                <div ref="institutionRankRef" class="chart rank-chart"></div>
            </section>

            <section class="screen-panel base-rank-panel">
                <PanelHeading title="基地巡查区域排行" />
                <div class="panel-tools"><FilterSelect /></div>
                <div ref="baseRankRef" class="chart rank-chart"></div>
            </section>
        </main>

        <div v-else class="loading-state">数据加载中...</div>
    </div>
</template>

<script>
import { defineComponent, h, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import * as echarts from 'echarts';
import RegionDrilldownMap from '@/components/Business/RegionDrilldownMap.vue';
import { getRegulatoryDashboard, getRegulatoryRegion } from '@/y_api/regulatory';
import { SHOW_REGULATORY_MAP_NINE_DASH_LINE } from '@/config/regulatory';

const AXIS_LABEL = { color: '#dce7f2', fontSize: 13 };
const MUTED_AXIS_LABEL = { color: '#60738a', fontSize: 10 };
const GRID_LINE = { color: 'rgba(105, 139, 173, .25)' };
const TOOLTIP = {
    trigger: 'axis',
    backgroundColor: 'rgba(3, 20, 39, .95)',
    borderColor: '#35c9ee',
    textStyle: { color: '#fff', fontSize: 12 }
};

const COMPARISON_PALETTES = {
    quarter: {
        current: ['#14d092', '#087653', 'rgba(5, 38, 46, .06)'],
        previous: ['#fa9542', '#91410a', 'rgba(53, 32, 15, .06)']
    },
    annual: {
        current: ['#65eef1', '#178c9d', 'rgba(8, 45, 62, .06)'],
        previous: ['#f5eb49', '#908318', 'rgba(54, 52, 17, .06)']
    }
};

const PanelHeading = defineComponent({
    name: 'PanelHeading',
    props: { title: String, detail: Boolean },
    setup(props) {
        return () => h('header', { class: 'panel-heading' }, [
            h('i'),
            h('h2', props.title),
            props.detail ? h('button', { type: 'button' }, '明细') : h('span')
        ]);
    }
});

const FilterSelect = defineComponent({
    name: 'FilterSelect',
    setup() {
        return () => h('label', { class: 'filter-select' }, [
            h('select', { 'aria-label': '筛选范围' }, [
                h('option', { value: 'all' }, '全部'),
                h('option', { value: 'province' }, '省级'),
                h('option', { value: 'city' }, '市级')
            ])
        ]);
    }
});

const comparisonOption = (data, currentLabel, previousLabel, palette) => ({
    tooltip: TOOLTIP,
    legend: {
        top: 2,
        right: 8,
        itemWidth: 12,
        itemHeight: 8,
        textStyle: { color: '#d7e2eb', fontSize: 10 },
        data: [currentLabel, previousLabel]
    },
    grid: { left: 11, right: 10, top: 26, bottom: 7, containLabel: true },
    xAxis: {
        type: 'category',
        data: data.categories,
        axisLabel: AXIS_LABEL,
        axisTick: { show: false },
        axisLine: { lineStyle: { color: '#536579' } },
        splitLine: { show: true, lineStyle: GRID_LINE }
    },
    yAxis: {
        type: 'value',
        max: 180000,
        interval: 30000,
        axisLabel: MUTED_AXIS_LABEL,
        axisTick: { show: false },
        axisLine: { show: true, lineStyle: { color: '#536579' } },
        splitLine: { show: false }
    },
    series: [
        {
            name: currentLabel,
            type: 'bar',
            barWidth: 12,
            barGap: '95%',
            data: data.current,
            itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: palette.current[0] },
                    { offset: .58, color: palette.current[1] },
                    { offset: 1, color: palette.current[2] }
                ])
            }
        },
        {
            name: previousLabel,
            type: 'bar',
            barWidth: 12,
            data: data.previous,
            itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: palette.previous[0] },
                    { offset: .56, color: palette.previous[1] },
                    { offset: 1, color: palette.previous[2] }
                ])
            }
        }
    ]
});

const ComparisonChart = defineComponent({
    name: 'ComparisonChart',
    components: { FilterSelect },
    props: {
        data: { type: Object, required: true },
        caption: { type: String, required: true },
        currentLabel: { type: String, required: true },
        previousLabel: { type: String, required: true },
        tone: { type: String, default: 'quarter' },
        filterable: Boolean
    },
    setup(props, { expose }) {
        const chartRef = ref(null);
        let chart = null;
        const resize = () => chart && !chart.isDisposed() && chart.resize();
        onMounted(() => {
            chart = echarts.init(chartRef.value);
            const palette = COMPARISON_PALETTES[props.tone] || COMPARISON_PALETTES.quarter;
            chart.setOption(comparisonOption(props.data, props.currentLabel, props.previousLabel, palette));
        });
        onBeforeUnmount(() => chart && !chart.isDisposed() && chart.dispose());
        expose({ resize });
        return () => h('div', { class: 'comparison-content' }, [
            h('div', { class: 'comparison-summary' }, [
                h('strong', [
                    h('em', props.caption),
                    h('b', [String(props.data.growth), h('small', '%')])
                ]),
                props.filterable ? h(FilterSelect) : null
            ]),
            h('div', { ref: chartRef, class: 'chart comparison-chart' })
        ]);
    }
});

export default {
    name: 'RegulatoryDashboard',
    components: { ComparisonChart, FilterSelect, PanelHeading, RegionDrilldownMap },
    setup() {
        const dashboard = ref(null);
        const errorMessage = ref('');
        const compositionRef = ref(null);
        const regionRankRef = ref(null);
        const passRateRef = ref(null);
        const institutionRef = ref(null);
        const institutionRankRef = ref(null);
        const baseRankRef = ref(null);
        const quarterComponentRef = ref(null);
        const annualComponentRef = ref(null);
        const charts = [];

        const formatNumber = value => Number(value || 0).toLocaleString('en-US');
        const initChart = (element, option) => {
            if (!element) return;
            const chart = echarts.init(element);
            chart.setOption(option);
            charts.push(chart);
        };
        const resizeCharts = () => {
            charts.forEach(chart => chart && !chart.isDisposed() && chart.resize());
            quarterComponentRef.value?.resize();
            annualComponentRef.value?.resize();
        };

        const rankOption = (items, color, maxValue = 180000) => ({
            tooltip: TOOLTIP,
            grid: { left: 16, right: 28, top: 8, bottom: 12, containLabel: true },
            xAxis: {
                type: 'value',
                max: maxValue,
                interval: 30000,
                axisLabel: MUTED_AXIS_LABEL,
                axisTick: { show: false },
                axisLine: { show: false },
                splitLine: { lineStyle: GRID_LINE }
            },
            yAxis: {
                type: 'category',
                inverse: true,
                data: items.map(item => item.name),
                axisLabel: { ...AXIS_LABEL, fontSize: 16, margin: 12 },
                axisTick: { show: false },
                axisLine: { show: false }
            },
            series: [{
                type: 'bar',
                barWidth: 12,
                data: items.map(item => item.value),
                label: { show: true, position: 'insideRight', color: '#fff', fontSize: 8, fontWeight: 'bold' },
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                        { offset: 0, color: 'rgba(36, 74, 112, .75)' },
                        { offset: 1, color }
                    ])
                }
            }]
        });

        const initCharts = () => {
            const data = dashboard.value;
            const stackColors = ['#25baf3', '#42dfdf', '#20bd55', '#f59446'];
            initChart(compositionRef.value, {
                tooltip: TOOLTIP,
                legend: {
                    top: 5,
                    right: 5,
                    itemWidth: 12,
                    itemHeight: 9,
                    textStyle: { color: '#d9e6f1', fontSize: 10 },
                    data: data.subjectSummary.map(item => item.name)
                },
                grid: { left: 16, right: 28, top: 28, bottom: 12, containLabel: true },
                xAxis: {
                    type: 'value',
                    max: 180000,
                    interval: 30000,
                    axisLabel: MUTED_AXIS_LABEL,
                    axisTick: { show: false },
                    axisLine: { show: false },
                    splitLine: { lineStyle: GRID_LINE }
                },
                yAxis: {
                    type: 'category',
                    inverse: true,
                    data: data.taskComposition.map(item => item.name),
                    axisLabel: { ...AXIS_LABEL, fontSize: 15 },
                    axisTick: { show: false },
                    axisLine: { show: false }
                },
                series: data.subjectSummary.map((summary, seriesIndex) => ({
                    name: summary.name,
                    type: 'bar',
                    stack: 'total',
                    barWidth: 10,
                    itemStyle: { color: stackColors[seriesIndex] },
                    data: data.taskComposition.map(item => item.values[seriesIndex])
                }))
            });

            initChart(regionRankRef.value, rankOption(data.regionTaskRank, '#27baf7', 90000));
            initChart(institutionRankRef.value, rankOption(data.institutionRank, '#18d7a3', 90000));
            initChart(baseRankRef.value, rankOption(data.basePatrolRank, '#27baf7', 90000));

            const passColors = ['#24d0a7', '#36aae7', '#fa9845'];
            initChart(passRateRef.value, {
                color: passColors,
                tooltip: { ...TOOLTIP, trigger: 'item' },
                series: [{
                    type: 'pie',
                    roseType: 'radius',
                    radius: ['31%', '65%'],
                    center: ['52%', '54%'],
                    startAngle: 90,
                    minAngle: 12,
                    avoidLabelOverlap: true,
                    label: { color: '#edf5fc', fontSize: 13, fontWeight: 'bold', formatter: '{b}{c}%' },
                    labelLine: { length: 18, length2: 12, lineStyle: { width: 1 } },
                    data: data.basePassRate
                }]
            });

            const levelColors = ['#25cda6', '#2ba6e8', '#ffed4f', '#a865df', '#4bd2d8'];
            initChart(institutionRef.value, {
                color: levelColors,
                tooltip: { ...TOOLTIP, trigger: 'item' },
                series: [{
                    type: 'pie',
                    roseType: 'radius',
                    radius: ['29%', '67%'],
                    center: ['50%', '53%'],
                    avoidLabelOverlap: true,
                    label: { color: '#dcecf8', fontSize: 11, formatter: '{b}:{c}' },
                    labelLine: { length: 12, length2: 12 },
                    data: data.newInstitutions.levels
                }]
            });
        };

        const handleMapError = error => {
            errorMessage.value = error.message || '地图数据加载失败';
        };

        onMounted(async () => {
            try {
                dashboard.value = await getRegulatoryDashboard();
                await nextTick();
                initCharts();
                window.addEventListener('resize', resizeCharts);
            } catch (error) {
                errorMessage.value = error.message || '数据加载失败，请稍后重试';
            }
        });

        onBeforeUnmount(() => {
            window.removeEventListener('resize', resizeCharts);
            charts.forEach(chart => chart && !chart.isDisposed() && chart.dispose());
        });

        return {
            annualComponentRef,
            baseRankRef,
            compositionRef,
            dashboard,
            errorMessage,
            formatNumber,
            getRegulatoryRegion,
            handleMapError,
            institutionRankRef,
            institutionRef,
            passRateRef,
            quarterComponentRef,
            regionRankRef,
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
    overflow: hidden;
    color: #f3f8fd;
    font-family: "Microsoft YaHei", "PingFang SC", sans-serif;
    background-color: #06182d;
    // background-image:
    //     radial-gradient(circle at 50% 34%, rgba(17, 101, 160, .28), transparent 38%),
    //     radial-gradient(circle, rgba(123, 196, 239, .30) 1px, transparent 1.6px),
    //     linear-gradient(180deg, rgba(4, 22, 43, .66), rgba(4, 18, 35, .94));
    // background-size: auto, 49px 49px, auto;
    background-image: url(@/assets/images/bg.jpg);
    background-size: contain;
    background-position: center;
}

.regulatory-screen::after {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 0;
    height: 43%;
    opacity: .33;
    pointer-events: none;
    background-image:
        linear-gradient(rgba(42, 143, 210, .45) 1px, transparent 1px),
        linear-gradient(90deg, rgba(42, 143, 210, .35) 1px, transparent 1px);
    background-size: 52px 32px;
    transform-origin: bottom;
    transform: perspective(330px) rotateX(55deg) scale(1.5);
}

.regulatory-grid {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    min-height: 0;
    padding: 18px 20px 22px;
    display: grid;
    grid-template-columns: minmax(278px, 1.08fr) minmax(250px, 1fr) minmax(250px, 1fr) minmax(278px, 1.08fr);
    grid-template-rows: minmax(0, 1.17fr) minmax(0, 1fr) minmax(0, 1fr);
    grid-template-areas:
        "summary map map quarter"
        "region map map pass"
        "annual institution regulator base";
    gap: 16px 18px;
}

.screen-panel {
    min-width: 0;
    min-height: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(35, 132, 197, .65);
    background: rgba(5, 22, 42, .79);
    box-shadow: inset 0 0 24px rgba(11, 85, 137, .10);
}

.summary-panel { grid-area: summary; }
.map-panel { grid-area: map; min-width: 0; min-height: 0; }
.quarter-panel { grid-area: quarter; }
.region-rank-panel { grid-area: region; }
.pass-panel { grid-area: pass; }
.annual-panel { grid-area: annual; }
.institution-panel { grid-area: institution; }
.regulator-rank-panel { grid-area: regulator; }
.base-rank-panel { grid-area: base; }

.panel-heading {
    height: 34px;
    flex: 0 0 34px;
    padding: 0 7px;
    display: flex;
    align-items: center;
    gap: 8px;
    background: repeating-linear-gradient(45deg, rgba(20, 57, 92, .82) 0 18px, rgba(9, 37, 67, .82) 18px 36px);
    border-bottom: 1px solid rgba(36, 104, 159, .42);
}

.panel-heading :deep(i) {
    position: relative;
    width: 18px;
    height: 18px;
    flex: 0 0 18px;
}

.panel-heading :deep(i::before),
.panel-heading :deep(i::after) {
    content: '';
    position: absolute;
    left: 4px;
    width: 10px;
    height: 10px;
    clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
    background: #2e83d2;
}

.panel-heading :deep(i::before) { top: 0; background: #1d65ad; }
.panel-heading :deep(i::after) { bottom: 0; }
.panel-heading :deep(h2) { min-width: 0; margin: 0; font-size: 21px; line-height: 1; letter-spacing: 0; white-space: nowrap; text-shadow: 0 0 8px rgba(75, 176, 255, .45); }
.panel-heading :deep(span) { width: 14px; height: 1px; margin-left: auto; background: #ffea4c; display: none; }
.panel-heading :deep(button) { margin-left: auto; padding: 0; border: 0; color: #f1f5f8; font: 14px/1 "Microsoft YaHei"; background: transparent; cursor: pointer; }

.chart { min-width: 0; min-height: 0; }
.summary-metrics {
    flex: 0 0 86px;
    margin: 15px 12px 0;
    padding: 7px 10px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px 20px;
    border: 1px solid #477895;
    border-radius: 7px;
    background: rgba(3, 17, 32, .9);
    box-shadow: 0 0 13px rgba(40, 176, 238, .19);
}

.summary-metrics article { position: relative; z-index: 0; min-width: 0; padding: 0 4px 6px; display: flex; align-items: baseline; justify-content: space-between; gap: 7px; }
.summary-metrics article::after {
    content: '';
    position: absolute;
    right: 0;
    bottom: -2px;
    left: 0;
    z-index: -1;
    height: 12px;
    pointer-events: none;
    background:
        linear-gradient(90deg, rgba(35, 108, 153, .08), rgba(53, 129, 177, .28) 8%, rgba(116, 199, 245, .58) 50%, rgba(53, 129, 177, .28) 92%, rgba(35, 108, 153, .08)) center 66% / 100% 1px no-repeat,
        linear-gradient(180deg, rgba(1, 13, 25, .72) 0 48%, rgba(3, 20, 36, .92) 52% 100%);
    box-shadow: inset 0 -3px 5px rgba(0, 0, 0, .22);
}
.summary-metrics span { position: relative; z-index: 1; font-size: 16px; font-style: italic; font-weight: 700; white-space: nowrap; }
.summary-metrics strong { position: relative; z-index: 1; font: italic 700 28px/1 Arial, sans-serif; white-space: nowrap; }
.summary-metrics small { margin-left: 2px; font: 12px "Microsoft YaHei"; }
.composition-chart { flex: 1; width: 100%; }

.panel-tools { height: 43px; flex: 0 0 43px; padding: 8px 16px 4px; display: flex; justify-content: flex-end; }
.filter-select { position: relative; display: inline-flex; width: 101px; height: 30px; margin-top: 2px;}
.filter-select::after { content: ''; position: absolute; top: 8px; right: 10px; width: 8px; height: 8px; border-right: 1px solid #a7eaff; border-bottom: 1px solid #a7eaff; transform: rotate(45deg); pointer-events: none; }
.filter-select :deep(select) { width: 100%; height: 100%; padding: 0 29px 0 12px; border: 1px solid #245f87; border-radius: 3px; outline: 0; color: #edf7ff; font-size: 13px; appearance: none; background: rgba(4, 24, 43, .93); box-shadow: inset 0 0 8px rgba(43, 156, 213, .16), 0 0 5px rgba(25, 143, 204, .2); cursor: pointer; }
.rank-chart { flex: 1; width: 100%; }

.comparison-content { flex: 1; min-height: 0; padding: 8px 12px 8px; display: flex; flex-direction: column; }
.comparison-content :deep(.comparison-summary) { height: 54px; flex: 0 0 54px; display: flex; align-items: flex-start; justify-content: space-between; }
.comparison-content :deep(.comparison-summary strong) { position: relative; z-index: 0; min-width: 0; padding: 0 8px 20px; display: inline-flex; align-items: flex-end; font-weight: normal; white-space: nowrap; }
.comparison-content :deep(.comparison-summary strong::after) {
    content: '';
    position: absolute;
    right: -60px;
    bottom: 0;
    left: -60px;
    z-index: -1;
    height: 28px;
    pointer-events: none;
    background:
        linear-gradient(90deg, transparent, rgba(35, 108, 153, .18) 18%, rgba(104, 190, 239, .58) 50%, rgba(35, 108, 153, .18) 82%, transparent) center / 100% 1px no-repeat,
        linear-gradient(180deg, rgba(1, 13, 25, .88) 0 48%, rgba(3, 20, 36, .98) 52% 100%);
    box-shadow: inset 0 1px 4px rgba(0, 0, 0, .28), inset 0 -3px 5px rgba(0, 0, 0, .24);
}
.comparison-content :deep(.comparison-summary em) { font-size: 18px; font-weight: 700; line-height: 27px; white-space: nowrap; }
.comparison-content :deep(.comparison-summary b) { margin-left: 16px; color: #28baf4; font: italic 700 31px/31px Arial, sans-serif; letter-spacing: 0; text-shadow: 1px 2px 2px rgba(0, 0, 0, .7), 0 0 5px rgba(40, 186, 244, .22); }
.comparison-content :deep(.comparison-summary small) { margin-left: 1px; font-size: 14px; line-height: 1; }
.comparison-content :deep(.comparison-summary .filter-select) { position: relative; flex: 0 0 101px; height: 30px; margin-left: 8px; display: inline-flex; margin-top: 2px; }
.comparison-content :deep(.comparison-summary .filter-select::after) { content: ''; position: absolute; top: 8px; right: 10px; width: 8px; height: 8px; border-right: 1px solid #a7eaff; border-bottom: 1px solid #a7eaff; transform: rotate(45deg); pointer-events: none; }
.comparison-content :deep(.comparison-summary .filter-select select) { width: 100%; height: 100%; padding: 0 29px 0 12px; border: 1px solid #245f87; border-radius: 3px; outline: 0; color: #edf7ff; font-size: 13px; appearance: none; background: rgba(4, 24, 43, .93); }
.comparison-content :deep(.comparison-chart) { flex: 1; width: 100%; }
.quarter-panel :deep(.comparison-summary) { justify-content: center; }

.donut-chart { flex: 1; width: 100%; }
.institution-total { height: 47px; margin: 8px 12px 0; padding: 0 10px; flex: 0 0 47px; display: flex; align-items: center; justify-content: space-between; border: 1px solid #5689aa; border-radius: 7px; background: rgba(3, 17, 32, .88); box-shadow: 0 0 9px rgba(73, 168, 225, .38), inset 0 0 10px rgba(59, 144, 199, .14), inset 0 1px 0 rgba(170, 225, 255, .12); }
.institution-total span { font-size: 17px; font-style: italic; font-weight: 700; white-space: nowrap; }
.institution-total strong { color: #27baf3; font: 700 30px/1 Arial, sans-serif; white-space: nowrap; }
.institution-total small { margin-left: 3px; color: #f3f8fd; font: 12px "Microsoft YaHei"; }
.institution-chart { flex: 1; width: 100%; }
.regulator-rank-panel h3 {
    position: relative;
    z-index: 0;
    height: 54px;
    margin: 0;
    padding: 9px 4px 23px;
    flex: 0 0 54px;
    font-size: 18px;
    font-style: italic;
    text-align: center;
    white-space: nowrap;
    text-shadow: 1px 2px 2px rgba(0, 0, 0, .95), 0 0 4px rgba(190, 226, 248, .24);
}
.regulator-rank-panel h3::after {
    content: '';
    position: absolute;
    right: 7%;
    bottom: 0;
    left: 7%;
    z-index: -1;
    height: 28px;
    pointer-events: none;
    background:
        linear-gradient(90deg, transparent, rgba(35, 108, 153, .18) 18%, rgba(104, 190, 239, .58) 50%, rgba(35, 108, 153, .18) 82%, transparent) center / 100% 1px no-repeat,
        linear-gradient(180deg, rgba(1, 13, 25, .88) 0 48%, rgba(3, 20, 36, .98) 52% 100%);
    box-shadow: inset 0 1px 4px rgba(0, 0, 0, .28), inset 0 -3px 5px rgba(0, 0, 0, .24);
}

.data-error { position: absolute; top: 0; right: 0; left: 0; z-index: 5; padding: 7px 18px; color: #ffd0d0; background: rgba(130, 23, 39, .9); text-align: center; }
.loading-state { position: relative; z-index: 2; min-height: 100%; display: flex; align-items: center; justify-content: center; color: #5adcea; font-size: 20px; }

@media (max-width: 1600px) {
    .regulatory-grid { padding: 10px 10px 12px; grid-template-columns: minmax(270px, 1.08fr) minmax(250px, 1fr) minmax(250px, 1fr) minmax(270px, 1.08fr); gap: 10px; }
    .panel-heading { height: 31px; flex-basis: 31px; }
    .panel-heading :deep(h2) { font-size: 17px; }
    .panel-heading :deep(button) { font-size: 12px; }
    .summary-metrics { flex-basis: 70px; margin: 8px 8px 0; padding: 5px 7px; gap: 3px 10px; }
    .summary-metrics span { font-size: 12px; }
    .summary-metrics strong { font-size: 22px; }
    .summary-metrics small { font-size: 10px; }
    .panel-tools { height: 36px; flex-basis: 36px; padding: 4px 10px 2px; }
    .filter-select { width: 90px; height: 27px; }
    .comparison-content { padding: 5px 7px; }
    .comparison-content :deep(.comparison-summary) { height: 44px; flex-basis: 44px; }
    .comparison-content :deep(.comparison-summary strong) { padding-right: 6px; padding-bottom: 15px; padding-left: 6px; }
    .comparison-content :deep(.comparison-summary strong::after) { height: 15px; }
    .comparison-content :deep(.comparison-summary em) { font-size: 13px; line-height: 20px; }
    .comparison-content :deep(.comparison-summary b) { margin-left: 10px; font-size: 25px; line-height: 24px; }
    .comparison-content :deep(.comparison-summary .filter-select) { flex-basis: 90px; }
    .institution-total { height: 41px; margin: 5px 8px 0; flex-basis: 41px; }
    .institution-total span { font-size: 13px; }
    .institution-total strong { font-size: 23px; }
    .regulator-rank-panel h3 { height: 44px; padding: 7px 4px 17px; flex-basis: 44px; font-size: 14px; }
    .regulator-rank-panel h3::after { height: 15px; }
}
</style>
