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
    margin-right: clamp(98px, calc((100vw - 1200px) * .273), 197px);
    display: flex;
    align-items: center;
    gap: 36px;
    transform: translateY(4px);
}
.business-nav button {
    width: 162px;
    height: 42px;
    padding: 0 10px;
    border: 1px solid rgba(91, 190, 250, .94);
    border-bottom-color: rgba(124, 210, 255, .96);
    color: #f7fbff;
    font: 700 23px/1 "Microsoft YaHei", sans-serif;
    letter-spacing: 0;
    cursor: pointer;
    position: relative;
    isolation: isolate;
    clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 8px);
    background:
        linear-gradient(135deg, rgba(151, 218, 255, .3), transparent 30%) top left / 46px 100% no-repeat,
        linear-gradient(180deg, rgba(31, 100, 165, .92), rgba(42, 146, 216, .94));
    box-shadow: inset 0 1px rgba(185, 229, 255, .38), inset 0 -1px rgba(94, 194, 248, .55), inset 0 0 14px rgba(84, 177, 255, .3), 0 0 9px rgba(20, 105, 178, .45);
    filter: drop-shadow(0 0 1px rgba(94, 195, 255, .8));
    transition: filter .18s ease, background .18s ease;
}
.business-nav button:hover { filter: drop-shadow(0 0 2px rgba(94, 195, 255, .9)) brightness(1.12); }
.business-nav button.active {
    color: #fff9d8;
    border-color: rgba(255, 232, 80, .98);
    background:
        linear-gradient(90deg, rgba(255, 249, 160, .28), transparent 17%, transparent 83%, rgba(255, 244, 132, .2)),
        linear-gradient(180deg, rgba(141, 108, 13, .94), rgba(225, 184, 22, .98));
    box-shadow: inset 0 1px rgba(255, 250, 179, .58), inset 0 -1px rgba(255, 224, 62, .7), inset 0 0 17px rgba(255, 238, 94, .38), 0 0 11px rgba(244, 200, 38, .48);
    filter: drop-shadow(0 0 2px rgba(255, 225, 69, .82));
}
.business-nav button.active:hover { filter: drop-shadow(0 0 3px rgba(255, 225, 69, .9)) brightness(1.08); }
.business-nav button.active::before,
.business-nav button.active::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 13px;
    height: 20px;
    transform: translateY(-50%);
    background: linear-gradient(90deg, #fffbd0, #ffe65b 58%, rgba(255, 222, 54, .66));
    filter: drop-shadow(0 0 4px rgba(255, 246, 147, .92));
}
.business-nav button.active::before { left: -1px; clip-path: polygon(0 0, 100% 50%, 0 100%, 34% 50%); }
.business-nav button.active::after { right: -1px; clip-path: polygon(100% 0, 0 50%, 100% 100%, 66% 50%); }

@media (max-width: 1560px) {
    .platform-header { height: 66px; flex-basis: 66px; padding: 0 20px; gap: 16px; }
    .platform-title h1 { font-size: 22px; }
    .business-nav { margin-right: clamp(0px, calc((100vw - 1200px) * .24), 86px); gap: 12px; transform: translateY(2px); }
    .business-nav button { width: 132px; height: 39px; font-size: 19px; }
}
</style>
