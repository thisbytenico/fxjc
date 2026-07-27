<template>
    <div class="home-page">
        <div class="design" ref="design">
            <!-- 背景大图 -->
            <img class="el el2" src="@/assets/images/home/18_图层 20.png" alt="" />

            <!-- Logo -->
            <img class="el el3" src="@/assets/images/home/17_logo.png" alt="logo" />

            <!-- 白色半透明遮罩容器 -->
            <div class="el el4"></div>

            <!-- 第一行按钮：监管业务 -->
            <img class="el el14" src="@/assets/images/home/10_btn-bg1.png" alt="" />
            <img class="el el15" src="@/assets/images/home/09_icon01.png" alt="" />
            <div class="el el16">监管业务</div>

            <!-- 第一行按钮：追溯业务 -->
            <img class="el el5" src="@/assets/images/home/16_btn-bg2.png" alt="" />
            <img class="el el6" src="@/assets/images/home/15_icon2.png" alt="" />
            <div class="el el7">追溯业务</div>

            <!-- 第一行按钮：追溯优品 -->
            <img class="el el11" src="@/assets/images/home/12_btn-bg3.png" alt="" />
            <img class="el el12" src="@/assets/images/home/11_icon5.png" alt="" />
            <div class="el el13">追溯优品</div>

            <!-- 第一行按钮：监测业务 -->
            <img class="el el8" src="@/assets/images/home/14_btn-bg4.png" alt="" />
            <img class="el el10" src="@/assets/images/home/13_icon3.png" alt="" />
            <div class="el el9">监测业务</div>

            <!-- 第二行按钮：执法业务 -->
            <img class="el el17" src="@/assets/images/home/08_btn-bg5.png" alt="" />
            <img class="el el19" src="@/assets/images/home/07_icon4.png" alt="" />
            <div class="el el18">执法业务</div>

            <!-- 第二行按钮：全国农业检验检测服务业务 -->
            <img class="el el20" src="@/assets/images/home/06_btn-bg6.png" alt="" />
            <img class="el el21" src="@/assets/images/home/05_icon6.png" alt="" />
            <div class="el el22">全国农业检验 检测服务业务</div>

            <!-- 第二行按钮：农业行业标准制修订管理业务 -->
            <img class="el el23" src="@/assets/images/home/04_btn-bg7.png" alt="" />
            <img class="el el24" src="@/assets/images/home/03_icon7.png" alt="" />
            <div class="el el25">农业行业标准 制修订管理业务</div>

            <!-- 第二行按钮：全国名特优新农产品名录收集登录信息业务 -->
            <img class="el el26" src="@/assets/images/home/02_btn-bg8.png" alt="" />
            <img class="el el27" src="@/assets/images/home/01_icon8.png" alt="" />
            <div class="el el28">全国名特优新农产品 名录收集登录信息业务</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Home',
    mounted() {
        this.scaleDesign();
        window.addEventListener('resize', this.scaleDesign);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.scaleDesign);
    },
    methods: {
        scaleDesign() {
            const el = this.$refs.design;
            if (!el) return;
            const scale = window.innerWidth / 1920;
            el.style.transform = `scale(${scale})`;
            el.style.left = '0px';
            el.style.top = `${(window.innerHeight - 1080 * scale) / 2}px`;
        }
    }
};
</script>

<style lang="less" scoped>
.home-page {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: #000;
}

.design {
    position: absolute;
    width: 1920px;
    height: 1080px;
    overflow: hidden;
    transform-origin: top left;
}

.el {
    position: absolute;
    display: block;
}

/* 背景图 */
.el2 {
    left: 0;
    top: 0;
    width: 1920px;
    height: 1080px;
    z-index: 1;
    object-fit: cover;
}

/* Logo */
.el3 {
    left: 356px;
    top: 134px;
    width: 1191px;
    height: 181px;
    z-index: 5;
}

/* 白色半透明遮罩 */
.el4 {
    left: 315.2px;
    top: 336px;
    width: 1290px;
    height: 500px;
    opacity: 0.85;
    background-color: rgba(255, 255, 255, 0.85);
    z-index: 2;
}

/* ===== 第一行按钮 ===== */

/* 监管业务 - btn-bg1 */
.el14 {
    left: 370px;
    top: 401px;
    width: 270px;
    height: 161px;
    z-index: 5;
}
.el15 {
    left: 469px;
    top: 433px;
    width: 74px;
    height: 87px;
    z-index: 5;
}
.el16 {
    left: 460px;
    top: 525px;
    width: 91px;
    height: 21px;
    z-index: 10;
    color: rgb(255, 255, 255);
    font-size: 22px;
    font-family: "SourceHanSansCN-Regular", "PingFang SC", "Microsoft YaHei", "Hiragino Sans GB", sans-serif;
    font-weight: bold;
    line-height: 1;
    white-space: pre-wrap;
    overflow: hidden;
    word-break: break-all;
}

/* 追溯业务 - btn-bg2 */
.el5 {
    left: 670px;
    top: 401px;
    width: 270px;
    height: 161px;
    z-index: 5;
}
.el6 {
    left: 769px;
    top: 434px;
    width: 74px;
    height: 81px;
    z-index: 5;
}
.el7 {
    left: 760px;
    top: 525px;
    width: 90px;
    height: 21px;
    z-index: 10;
    color: rgb(255, 255, 255);
    font-size: 22px;
    font-family: "SourceHanSansCN-Regular", "PingFang SC", "Microsoft YaHei", "Hiragino Sans GB", sans-serif;
    font-weight: bold;
    line-height: 1;
    white-space: pre-wrap;
    overflow: hidden;
    word-break: break-all;
}

/* 追溯优品 - btn-bg3 */
.el11 {
    left: 971px;
    top: 401px;
    width: 270px;
    height: 161px;
    z-index: 5;
}
.el12 {
    left: 1067px;
    top: 437px;
    width: 82px;
    height: 88px;
    z-index: 5;
}
.el13 {
    left: 1062px;
    top: 525px;
    width: 88px;
    height: 22px;
    z-index: 10;
    color: rgb(255, 255, 255);
    font-size: 22px;
    font-family: "SourceHanSansCN-Regular", "PingFang SC", "Microsoft YaHei", "Hiragino Sans GB", sans-serif;
    font-weight: bold;
    line-height: 1;
    white-space: pre-wrap;
    overflow: hidden;
    word-break: break-all;
}

/* 监测业务 - btn-bg4 */
.el8 {
    left: 1272px;
    top: 402px;
    width: 270px;
    height: 161px;
    z-index: 5;
}
.el10 {
    left: 1367px;
    top: 434px;
    width: 84px;
    height: 83px;
    z-index: 5;
}
.el9 {
    left: 1363px;
    top: 525px;
    width: 89px;
    height: 22px;
    z-index: 10;
    color: rgb(255, 255, 255);
    font-size: 22px;
    font-family: "SourceHanSansCN-Regular", "PingFang SC", "Microsoft YaHei", "Hiragino Sans GB", sans-serif;
    font-weight: bold;
    line-height: 1;
    white-space: pre-wrap;
    overflow: hidden;
    word-break: break-all;
}

/* ===== 第二行按钮 ===== */

/* 执法业务 - btn-bg5 */
.el17 {
    left: 367px;
    top: 610px;
    width: 270px;
    height: 161px;
    z-index: 5;
}
.el19 {
    left: 466px;
    top: 639px;
    width: 74px;
    height: 88px;
    z-index: 5;
}
.el18 {
    left: 457px;
    top: 734px;
    width: 91px;
    height: 22px;
    z-index: 10;
    color: rgb(255, 255, 255);
    font-size: 22px;
    font-family: "SourceHanSansCN-Regular", "PingFang SC", "Microsoft YaHei", "Hiragino Sans GB", sans-serif;
    font-weight: bold;
    line-height: 1;
    white-space: pre-wrap;
    overflow: hidden;
    word-break: break-all;
}

/* 全国农业检验检测服务业务 - btn-bg6 */
.el20 {
    left: 668px;
    top: 608px;
    width: 275px;
    height: 167px;
    z-index: 5;
}
.el21 {
    left: 769px;
    top: 626px;
    width: 74px;
    height: 71px;
    z-index: 5;
}
.el22 {
    left: 738px;
    top: 708px;
    width: 137px;
    height: 51px;
    z-index: 10;
    color: rgb(87, 87, 87);
    font-size: 22px;
    font-family: "SourceHanSansCN-Regular", "PingFang SC", "Microsoft YaHei", "Hiragino Sans GB", sans-serif;
    font-weight: bold;
    line-height: 25.5px;
    white-space: pre-wrap;
    overflow: hidden;
    word-break: break-all;
}

/* 农业行业标准制修订管理业务 - btn-bg7 */
.el23 {
    left: 969px;
    top: 608px;
    width: 275px;
    height: 167px;
    z-index: 5;
}
.el24 {
    left: 1077px;
    top: 619px;
    width: 61px;
    height: 74px;
    z-index: 5;
}
.el25 {
    left: 1029px;
    top: 706px;
    width: 158px;
    height: 52px;
    z-index: 10;
    color: rgb(87, 87, 87);
    font-size: 22px;
    font-family: "SourceHanSansCN-Regular", "PingFang SC", "Microsoft YaHei", "Hiragino Sans GB", sans-serif;
    font-weight: bold;
    text-align: center;
    line-height: 26px;
    white-space: pre-wrap;
    overflow: hidden;
    word-break: break-all;
}

/* 全国名特优新农产品名录收集登录信息业务 - btn-bg8 */
.el26 {
    left: 1270px;
    top: 608px;
    width: 275px;
    height: 167px;
    z-index: 5;
}
.el27 {
    left: 1378px;
    top: 620px;
    width: 60px;
    height: 72px;
    z-index: 5;
}
.el28 {
    left: 1295px;
    top: 706px;
    width: 228px;
    height: 52px;
    z-index: 10;
    color: rgb(87, 87, 87);
    font-size: 22px;
    font-family: "SourceHanSansCN-Regular", "PingFang SC", "Microsoft YaHei", "Hiragino Sans GB", sans-serif;
    font-weight: bold;
    text-align: center;
    line-height: 26px;
    white-space: pre-wrap;
    overflow: hidden;
    word-break: break-all;
}
</style>
