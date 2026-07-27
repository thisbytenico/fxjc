<template>
    <header class="platform-header">
        <div class="platform-title">
            <h1>国家农产品质量安全智慧监管信息平台<span>—数据分析</span></h1>
        </div>
        <nav class="business-nav" aria-label="业务导航">
            <button
                v-for="item in navItems"
                :key="item.key"
                type="button"
                :class="{ active: activeTab === item.key }"
                @click="handleTabClick(item)"
            >{{ item.label }}</button>
        </nav>
    </header>
</template>

<script>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
    name: 'Header',
    setup() {
        const route = useRoute();
        const router = useRouter();
        const navItems = [
            { key: 'traceability', label: '追溯业务', path: '/dataAnalysis' },
            { key: 'regulatory', label: '监管业务' },
            { key: 'monitoring', label: '监测业务', path: '/monitoring' },
            { key: 'enforcement', label: '执法业务' }
        ];
        const tabFromPath = path => path.startsWith('/monitoring') ? 'monitoring' : 'traceability';
        const activeTab = ref(tabFromPath(route.path));
        const handleTabClick = item => {
            activeTab.value = item.key;
            if (item.path && route.path !== item.path) router.push(item.path);
        };

        watch(() => route.path, path => {
            activeTab.value = tabFromPath(path);
        });

        return { navItems, activeTab, handleTabClick };
    }
};
</script>

<style lang="less" scoped>
.platform-header {
    width: 100%;
    height: 74px;
    min-width: 1200px;
    flex: 0 0 74px;
    padding: 0 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 28px;
    color: #fff;
    font-family: "Microsoft YaHei", "PingFang SC", sans-serif;
    border-bottom: 2px solid rgba(75, 178, 240, .55);
    background-color: #092347;
    background-image:
        linear-gradient(135deg, transparent 0 78%, rgba(42, 125, 202, .28) 78% 87%, transparent 87%),
        linear-gradient(180deg, rgba(15, 56, 103, .72), rgba(7, 31, 62, .96));
    box-shadow: inset 0 -8px 18px rgba(37, 111, 177, .32), 0 2px 10px rgba(27, 128, 201, .35);
    box-sizing: border-box;
}

.platform-title { min-width: 0; flex: 1; }
.platform-title h1 {
    margin: 0;
    font-size: 29px;
    line-height: 1.15;
    letter-spacing: 0;
    font-weight: 700;
    white-space: nowrap;
    text-shadow: 0 0 9px rgba(107, 189, 255, .55);
}
.platform-title span { font: inherit; }

.business-nav {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    gap: 30px;
}
.business-nav button {
    width: 162px;
    height: 43px;
    padding: 0 10px;
    border: 1px solid #4eaef4;
    border-bottom-color: #80cafc;
    color: #f7fbff;
    font: 700 23px/1 "Microsoft YaHei", sans-serif;
    letter-spacing: 0;
    cursor: pointer;
    position: relative;
    clip-path: polygon(7px 0, 100% 0, 100% 100%, 0 100%, 0 8px);
    background: linear-gradient(180deg, rgba(48, 131, 215, .46), rgba(43, 133, 218, .85));
    box-shadow: inset 0 0 14px rgba(84, 177, 255, .32), 0 0 9px rgba(20, 105, 178, .48);
    transition: filter .18s ease, background-color .18s ease;
}
.business-nav button:hover { filter: brightness(1.18); }
.business-nav button.active {
    color: #fff9d8;
    border-color: #ffe356;
    background: linear-gradient(180deg, rgba(156, 124, 20, .75), rgba(225, 181, 23, .96));
    box-shadow: inset 0 0 16px rgba(255, 238, 94, .35), 0 0 10px rgba(244, 200, 38, .42);
}
.business-nav button.active::before,
.business-nav button.active::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 0;
    height: 0;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    transform: translateY(-50%);
    filter: drop-shadow(0 0 3px rgba(255, 246, 147, .85));
}
.business-nav button.active::before { left: 0; border-left: 9px solid #fff4a5; }
.business-nav button.active::after { right: 0; border-right: 9px solid #fff4a5; }

@media (max-width: 1560px) {
    .platform-header { height: 66px; flex-basis: 66px; padding: 0 20px; gap: 16px; }
    .platform-title h1 { font-size: 22px; }
    .business-nav { gap: 12px; }
    .business-nav button { width: 132px; height: 39px; font-size: 19px; }
}
</style>
