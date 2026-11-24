<template>
    <main class="enforcement-screen" aria-label="执法业务">
        <p v-if="errorMessage" class="dashboard-status" role="alert">{{ errorMessage }}</p>
        <p v-else-if="!dashboard" class="dashboard-status" role="status">数据加载中…</p>

        <div v-else class="enforcement-grid">
            <section class="screen-panel patrol-panel">
                <header class="panel-heading"><h2>巡查任务情况</h2></header>
                <dl class="totals-box patrol-total">
                    <div>
                        <dt>执法次数</dt>
                        <dd>{{ formatCount(dashboard.patrolTrend.total) }}<small v-if="dashboard.patrolTrend.total != null">次</small></dd>
                    </div>
                </dl>
                <div ref="trendRef" class="chart trend-chart" role="img" aria-label="执法次数趋势图"></div>
            </section>

            <section class="map-column" aria-label="全国执法业务分布">
                <div class="monitoring-summary">
                    <section
                        v-for="(metric, index) in dashboard.monitoringSummary"
                        :key="metric.id"
                        class="monitoring-metric"
                        :style="{ '--metric-color': monitoringColors[index % monitoringColors.length] }"
                    >
                        <h2>{{ metric.label }} <strong>{{ formatCount(metric.total) }}<small v-if="metric.total != null">次</small></strong></h2>
                        <dl class="metric-details">
                            <div v-for="level in levels" :key="level.key">
                                <dt>{{ level.label }}</dt>
                                <dd>{{ formatCount(metric[level.key], false) }}<small v-if="metric[level.key] != null">次</small></dd>
                            </div>
                        </dl>
                    </section>
                </div>
                <div class="map-panel">
                    <RegionDrilldownMap
                        :data="dashboard.map.values"
                        :load-region-data="getEnforcementRegion"
                        :colors="mapColors"
                        :appearance="mapAppearance"
                        :show-pedestal="false"
                        value-label="执法次数"
                        value-unit="次"
                        aria-label="全国执法业务分布地图，点击行政区可下钻"
                    />
                </div>
            </section>

            <section class="screen-panel comparison-panel">
                <header class="panel-heading"><h2>基地巡查数据对比</h2></header>
                <dl class="totals-box comparison-totals">
                    <div v-for="item in comparisonTotals" :key="item.key" :style="{ '--metric-color': item.color }">
                        <dt>{{ item.label }}</dt>
                        <dd>{{ formatCount(dashboard.comparison.totals[item.key]) }}<small v-if="dashboard.comparison.totals[item.key] != null">次</small></dd>
                    </div>
                </dl>
                <div ref="comparisonRef" class="chart comparison-chart" role="img" aria-label="各类基地巡查任务对比堆叠柱状图"></div>
            </section>

            <section v-for="table in taskTables" :key="table.key" class="screen-panel" :class="table.key">
                <header class="panel-heading"><h2 :id="table.key">{{ table.title }}</h2></header>
                <div class="table-frame" tabindex="0" role="region" :aria-labelledby="table.key">
                    <table class="task-table" :aria-labelledby="table.key">
                        <thead>
                            <tr>
                                <th scope="col">序号</th>
                                <th scope="col">任务名称</th>
                                <th scope="col">{{ table.dateLabel }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(task, index) in dashboard[table.dataKey]" :key="task.id">
                                <td>{{ String(index + 1).padStart(2, '0') }}</td>
                                <td :title="task.name">{{ task.name }}</td>
                                <td><time :datetime="task.date">{{ task.date }}</time></td>
                            </tr>
                            <tr v-if="!dashboard[table.dataKey].length"><td colspan="3" class="table-empty">暂无数据</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    </main>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, shallowRef } from 'vue';
import * as echarts from 'echarts';
import RegionDrilldownMap from '@/components/Business/RegionDrilldownMap.vue';
import { getEnforcementDashboard, getEnforcementRegion } from '@/y_api/enforcement';
import { patrolComparisonOption, patrolTrendOption } from './charts';

const monitoringColors = ['#2cabea', '#1bd4ad', '#fff878'];
const mapColors = ['#06425b', '#006894', '#0084c9', '#00b0e7'];
const countryLabels = {
    新疆: '新疆维吾尔自治区',
    内蒙古: '内蒙古自治区',
    河北: '河\n北',
    山西: '山\n西',
    陕西: '陕\n西',
    江苏: '江\n苏',
    安徽: '安\n徽'
};
const mapAppearance = {
    countryZoom: 1.29,
    countryLayoutCenter: ['48.8%', '54%'],
    countryAspectScale: .7,
    countryFontSize: 12,
    countryLabelFormatter: ({ name }) => countryLabels[name] || name,
    showSouthChinaSeaInset: false,
    borderColor: 'rgba(127, 214, 255, .86)',
    borderWidth: 1.15
};

const levels = [
    { key: 'province', label: '省级数量' },
    { key: 'city', label: '市级数量' },
    { key: 'county', label: '县级数量' }
];
const comparisonTotals = [
    { key: 'tasks', label: '任务数量', color: '#2cabea' },
    { key: 'normal', label: '一般任务数量', color: '#39edee' },
    { key: 'urgent', label: '紧急任务数量', color: '#16c549' },
    { key: 'critical', label: '特紧任务数量', color: '#ff963e' }
];
const taskTables = [
    { key: 'inspection-panel', title: '例行检查抽检统计', dateLabel: '巡查时间', dataKey: 'inspectionTasks' },
    { key: 'ranking-panel', title: '监测任务区域排行', dateLabel: '执法时间', dataKey: 'rankedTasks' }
];
const numberFormat = new Intl.NumberFormat('zh-CN');
const formatCount = (value, grouped = true) => {
    if (value == null) return '—';
    return grouped ? numberFormat.format(value) : String(value);
};

const dashboard = shallowRef(null);
const errorMessage = ref('');
const trendRef = ref(null);
const comparisonRef = ref(null);
const charts = new Map();
let observer;
let destroyed = false;

const resizeCharts = () => charts.forEach(chart => chart.resize());
const mountChart = (element, option) => {
    const chart = echarts.init(element);
    charts.set(element, chart);
    chart.setOption(option);
    observer?.observe(element);
};

onMounted(async () => {
    try {
        const data = await getEnforcementDashboard();
        if (destroyed) return;
        if (!data?.patrolTrend || !data.comparison || !data.map ||
            !Array.isArray(data.monitoringSummary) || !Array.isArray(data.inspectionTasks) || !Array.isArray(data.rankedTasks)) {
            throw new Error('执法业务接口返回的数据格式不正确');
        }

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
        mountChart(trendRef.value, patrolTrendOption(data.patrolTrend));
        mountChart(comparisonRef.value, patrolComparisonOption(data.comparison));
    } catch (error) {
        if (!destroyed) errorMessage.value = error.message || '执法业务数据加载失败';
    }
});

onBeforeUnmount(() => {
    destroyed = true;
    observer?.disconnect();
    window.removeEventListener('resize', resizeCharts);
    charts.forEach(chart => chart.dispose());
});
</script>

<style scoped src="./screen.css"></style>
