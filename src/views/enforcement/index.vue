<template>
    <main class="enforcement-screen" aria-label="执法业务">
        <p v-if="errorMessage" class="dashboard-status" role="alert">{{ errorMessage }}</p>
        <p v-else-if="!dashboard" class="dashboard-status" role="status">数据加载中…</p>

        <div v-else class="enforcement-grid">
            <section class="screen-panel patrol-panel">
                <header class="panel-heading"><h2>巡查任务情况</h2></header>
                <dl class="totals-box patrol-total">
                    <div>
                        <dt style="font-weight: 700;">执法次数</dt>
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
                        <h2>{{ metric.label }} <strong>{{ formatCount(metric.total) }}<small v-if="metric.total != null">{{ metricUnits[metric.label] ?? '次' }}</small></strong></h2>
                        <dl class="metric-details">
                            <div v-for="level in levels" :key="level.key">
                                <dt>{{ level.label }}</dt>
                                <dd>{{ formatCount(metric[level.key]) }}<small v-if="metric[level.key] != null">{{ metricUnits[metric.label] ?? '次' }}</small></dd>
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
                        @route-change="handleMapRouteChange"
                    />
                </div>
            </section>

            <section class="screen-panel supervision-panel">
                <header class="panel-heading"><h2>监督抽查情况</h2></header>
                <dl class="totals-box supervision-total">
                    <div>
                        <dt style="font-weight: 700;">监督抽查任务</dt>
                        <dd>{{ formatCount(dashboard.supervision?.total) }}<small v-if="dashboard.supervision?.total != null">次</small></dd>
                    </div>
                </dl>
                <div class="supervision-dial">
                    <div ref="supervisionRef" class="supervision-chart" role="img" aria-label="监督抽查任务状态分布"></div>
                </div>
                <ul class="supervision-legend" aria-label="监督抽查任务状态">
                    <li
                        v-for="item in supervisionStatuses"
                        :key="item.key"
                        :style="{ gridArea: item.key, '--status-color': item.color }"
                    >
                        <span>{{ item.name }}</span>
                        <strong>{{ item.value ?? '—' }}</strong>
                    </li>
                </ul>
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
import { computed, nextTick, onBeforeUnmount, onMounted, ref, shallowRef } from 'vue';
import * as echarts from 'echarts';
import RegionDrilldownMap from '@/components/Business/RegionDrilldownMap.vue';
import { getEnforcementDashboard, getEnforcementRegion, getEnforcementRegionalMock } from '@/y_api/enforcement';
import { patrolTrendOption, supervisionOption } from './charts';

const monitoringColors = ['#2cabea', '#1bd4ad', '#fff878'];
const metricUnits = { 执法机构: '家', 执法人员: '人', 执法任务: '条' };
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
    countryLayoutCenter: ['48.8%', '52%'],
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
const supervisionStatusTypes = [
    { key: 'revoked', name: '已废止', color: '#28c5ef' },
    { key: 'published', name: '已发布', color: '#ff8000' },
    { key: 'completed', name: '已结束已完成', color: '#008ddb' },
    { key: 'incomplete', name: '已结束未完成', color: '#fff77b' },
    { key: 'running', name: '执行中', color: '#16f4dc' }
];
const taskTables = [
    { key: 'inspection-panel', title: '现场巡查任务', dateLabel: '巡查时间', dataKey: 'inspectionTasks' },
    { key: 'ranking-panel', title: '行政处罚任务', dateLabel: '执法时间', dataKey: 'rankedTasks' }
];
const numberFormat = new Intl.NumberFormat('zh-CN');
const formatCount = value => {
    if (value == null) return '—';
    return numberFormat.format(value);
};

const dashboard = shallowRef(null);
const supervisionStatuses = computed(() => supervisionStatusTypes.map(item => ({
    ...item,
    value: dashboard.value?.supervision?.statuses?.[item.key]
})));
const errorMessage = ref('');
const trendRef = ref(null);
const supervisionRef = ref(null);
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

const handleMapRouteChange = region => {
    const data = getEnforcementRegionalMock(region);
    if (!data || data === dashboard.value) return;
    dashboard.value = data;
    const regional = region.current.level !== 'country';
    charts.get(trendRef.value)?.setOption(patrolTrendOption(data.patrolTrend, regional));
    charts.get(supervisionRef.value)?.setOption(supervisionOption(supervisionStatuses.value));
};

onMounted(async () => {
    try {
        const data = await getEnforcementDashboard();
        if (destroyed) return;
        if (!data?.patrolTrend || !data.map ||
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
        mountChart(supervisionRef.value, supervisionOption(supervisionStatuses.value));
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
