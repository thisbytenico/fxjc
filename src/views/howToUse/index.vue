<template>
  <div class="how-to-use-page">
    <div class="bg-left"></div>
    <div class="bg-right"></div>
    <div class="bg-overlay"></div>

    <div class="page-inner">
      <!-- Nav -->
      <nav class="nav-bar">
        <router-link class="logo" to="/home">WebX</router-link>
        <div class="nav-links">
          <router-link class="nav-link" to="/home">Home</router-link>
          <router-link class="nav-link active" to="/how-to-use">How&nbsp;to&nbsp;use</router-link>
          <a href="#" class="nav-link">Whitepaper</a>
          <a href="#" class="nav-link">Jobs</a>
        </div>
      </nav>
      <div class="nav-divider"></div>

      <!-- Title -->
      <div class="page-title">
        <span class="title-white">HOW&nbsp;TO</span>
        <span class="title-cyan">USE</span>
      </div>
      <p class="page-desc">
        Future of SocialFi on Web3. An NFT driven platform that allows all users to easily access and airdrop crypto assets to anyone.
      </p>

      <!-- Steps + Video -->
      <div class="main-layout">
        <!-- Left: step numbers + cards -->
        <div class="steps-col">
          <!-- Step 1 -->
          <div class="step-row has-connector">
            <div class="step-num-col">
              <div class="step-num-wrap step-num-1">
                <span class="step-num-text">1</span>
              </div>
            </div>
            <div class="step-card card-bg-1">
              <div class="card-inner card-inner-1">
                <div class="card-content">
                  <div class="card-text-col">
                    <span class="card-label">1.&nbsp;Install&nbsp;WebX&nbsp;for&nbsp;Chrome.</span>
                    <div class="download-btn-wrap">
                      <div class="download-btn-bg"></div>
                      <span class="download-btn-text">Download</span>
                    </div>
                  </div>
                  <img class="card-icon" src="../../assets/webx-how-to-use/icon-23.png" />
                </div>
              </div>
            </div>
          </div>

          <!-- Step 2 -->
          <div class="step-row has-connector">
            <div class="step-num-col">
              <div class="step-num-wrap step-num-2">
                <span class="step-num-text">2</span>
              </div>
            </div>
            <div class="step-card card-bg-2">
              <div class="card-inner card-inner-2">
                <div class="card-content">
                  <div class="card-text-col" style="justify-content: center; margin-bottom:12px;">
                    <span class="card-label">2. Set up a password to your new WebX wallet for Chrome.</span>
                  </div>
                  <img class="card-icon" src="../../assets/webx-how-to-use/icon-24.png" />
                </div>
              </div>
            </div>
          </div>

          <!-- Step 3 -->
          <div class="step-row">
            <div class="step-num-col">
              <div class="step-num-wrap step-num-3">
                <span class="step-num-text">3</span>
              </div>
            </div>
            <div class="step-card card-bg-3">
              <div class="card-inner card-inner-3">
                <div class="card-content">
                  <div class="card-text-col">
                    <span class="card-label" style="margin-top:16px;">3. Start to explore your Web3.</span>
                    <div class="progress-row">
                      <div class="progress-dots"></div>
                      <div class="progress-line"></div>
                    </div>
                  </div>
                  <img class="card-icon" src="../../assets/webx-how-to-use/icon-25.png" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: video + arrows -->
        <div class="video-col">
          <div class="video-frame">
            <div class="video-inner-wrap">
              <div class="video-content"></div>
              <div class="video-overlay">
                <div class="play-btn"></div>
              </div>
            </div>
          </div>
          <div class="nav-arrows"></div>
        </div>
      </div>

      <div class="help-text">I&nbsp;still&nbsp;need&nbsp;help</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HowToUse'
}
</script>

<style lang="less" scoped>
// ─── page shell ───────────────────────────────────────────────────────────────
.how-to-use-page {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: #000;
  overflow-x: hidden;
}

// ─── background layers ────────────────────────────────────────────────────────
.bg-left {
  position: fixed;
  top: 0;
  left: 0;
  width: 34%;
  height: 100%;
  background: url('../../assets/webx-how-to-use/icon-1.png') left top / auto 100% no-repeat;
  pointer-events: none;
  z-index: 0;
}
.bg-right {
  position: fixed;
  top: 0;
  right: 0;
  width: 59%;
  height: 100%;
  background: url('../../assets/webx-how-to-use/icon-2.png') right top / auto 100% no-repeat;
  pointer-events: none;
  z-index: 0;
}
.bg-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('../../assets/webx-how-to-use/icon-3.png') center top / cover no-repeat;
  pointer-events: none;
  z-index: 1;
}

// ─── content wrapper ──────────────────────────────────────────────────────────
.page-inner {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 80px;
}

// ─── nav ──────────────────────────────────────────────────────────────────────
.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 34px 0 0;
  height: 80px;
}
.logo {
  color: #fff;
  font-size: 22px;
  font-family: TypoPRO-Montserrat-BlackItalic;
  text-decoration: none;
  white-space: nowrap;
  line-height: 27px;
}
.nav-links {
  display: flex;
  gap: 46px;
}
.nav-link {
  color: #fff;
  font-size: 20px;
  font-family: Sora-Regular;
  text-decoration: none;
  white-space: nowrap;
  line-height: 25px;
  &.active {
    font-family: Sora-Regular_SemiBold;
  }
  &:hover {
    opacity: 0.8;
  }
}
.nav-divider {
  width: 100%;
  height: 4px;
  background: url('../../assets/webx-how-to-use/icon-4.png') left center / 100% 4px no-repeat;
}

// ─── title ────────────────────────────────────────────────────────────────────
.page-title {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-top: 73px;
}
.title-white {
  color: #fff;
  font-size: 40px;
  font-family: TypoPRO-Montserrat-BlackItalic;
  white-space: nowrap;
  line-height: 49px;
}
.title-cyan {
  color: rgba(30, 222, 255, 1);
  font-size: 40px;
  font-family: TypoPRO-Montserrat-BlackItalic;
  white-space: nowrap;
  line-height: 49px;
}

// ─── desc ─────────────────────────────────────────────────────────────────────
.page-desc {
  color: #fff;
  font-size: 26px;
  font-family: Sora-Medium;
  line-height: 36px;
  margin: 32px 0 0;
}

// ─── main layout ──────────────────────────────────────────────────────────────
.main-layout {
  display: flex;
  align-items: flex-start;
  gap: 60px;
  margin-top: 60px;
}

// ─── steps column ─────────────────────────────────────────────────────────────
.steps-col {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
}

// ─── step row ─────────────────────────────────────────────────────────────────
.step-row {
  display: flex;
  align-items: stretch;
  gap: 50px;
}

// ─── step number column ───────────────────────────────────────────────────────
.step-num-col {
  flex: 0 0 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 8px;
  position: relative;
}
// connector line drawn as a pseudo-element, extends from badge bottom to next row
.has-connector .step-num-col::after {
  content: '';
  position: absolute;
  top: calc(8px + 48px + 10px);   // padding-top + badge height + small gap
  bottom: calc(-40px - 8px - 10px); // bleed past the row gap into next badge
  top: calc(8px + 48px + 19px);
  bottom: calc(-40px - 8px + 51px);
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  background: url('../../assets/webx-how-to-use/icon-6.png') center top / 2px 200px repeat-y;
}
.step-num-wrap {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  border: 0.889px solid rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.step-num-1 {
  background: url('../../assets/webx-how-to-use/icon-5.png') center / cover no-repeat;
}
.step-num-2 {
  background: url('../../assets/webx-how-to-use/icon-7.png') center / cover no-repeat;
}
.step-num-3 {
  background: url('../../assets/webx-how-to-use/icon-9.png') center / cover no-repeat;
}
.step-num-text {
  color: #fff;
  font-size: 20px;
  font-family: TypoPRO-Montserrat-BlackItalic;
  text-align: center;
  line-height: 1;
}

// ─── step card ────────────────────────────────────────────────────────────────

.step-card {
  width: 450px;
  height: 165px;
  flex-shrink: 0;
  margin-bottom: 40px;
}
.card-bg-1 {
  background: url('../../assets/webx-how-to-use/icon-10.png') center / 100% 100% no-repeat;
}
.card-bg-2 {
  background: url('../../assets/webx-how-to-use/icon-16.png') center / 100% 100% no-repeat;
}
.card-bg-3 {
  background: url('../../assets/webx-how-to-use/icon-20.png') center / 100% 100% no-repeat;
}
.card-inner {
  width: 100%;
  height: 100%;
  border-radius: 25px;
  border: 1px solid rgba(255, 255, 255, 0.4);
}
.card-inner-1 {
  background: url('../../assets/webx-how-to-use/icon-11.png') center / 100% 100% no-repeat;
}
.card-inner-2 {
  background: url('../../assets/webx-how-to-use/icon-16.png') center / 100% 100% no-repeat;
}
.card-inner-3 {
  background: url('../../assets/webx-how-to-use/icon-20.png') center / 100% 100% no-repeat;
}
.card-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc(100% - 60px);
  height: calc(100% - 70px);
  margin: 35px 30px;
}
.card-text-col {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  flex: 1;
  min-width: 0;
  margin-right: 16px;
}
.card-label {
  color: #fff;
  font-size: 18px;
  font-family: Sora-Regular_SemiBold;
  line-height: 22px;
  display: block;
  white-space: normal;
  word-break: break-word;
  overflow-wrap: break-word;
}
.card-icon {
  width: 98px;
  height: 96px;
  flex-shrink: 0;
  object-fit: contain;
}

// ─── download button ──────────────────────────────────────────────────────────
.download-btn-wrap {
  position: relative;
  width: 152px;
  height: 44px;
  border-radius: 4px;
  border: 0.75px solid rgba(255, 255, 255, 0.5);
  cursor: pointer;
}
.download-btn-bg {
  position: absolute;
  inset: -4px;
  background: url('../../assets/webx-how-to-use/icon-12.png') center / cover no-repeat;
  border-radius: 4px;
}
.download-btn-text {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: #fff;
  font-size: 18px;
  font-family: Sora-Regular_Bold;
  line-height: 22px;
}

// ─── progress indicator (step 3) ──────────────────────────────────────────────
.progress-row {
  display: flex;
  align-items: center;
  gap: 18px;
  width: 213px;
}
.progress-dots {
  width: 51px;
  height: 9px;
  background: url('../../assets/webx-how-to-use/icon-21.png') left top / 51px 10px no-repeat;
  flex-shrink: 0;
}
.progress-line {
  flex: 1;
  height: 1px;
  background: url('../../assets/webx-how-to-use/icon-22.png') left top / 100% 3px no-repeat;
}

// ─── video column ─────────────────────────────────────────────────────────────
.video-col {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding-top: 0;
}
.nav-arrows {
  width: 54px;
  height: 120px;
  background: url('../../assets/webx-how-to-use/icon-15.png') left top / 54px 678px no-repeat;
  flex-shrink: 0;
}
.video-frame {
  width: 550px;
  height: 380px;
  border-radius: 24px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  overflow: hidden;
  position: relative;
  background: url('../../assets/webx-how-to-use/icon-17.png') center / cover no-repeat;
}
.video-inner-wrap {
  position: relative;
  margin: 22px 28px;
  width: calc(100% - 56px);
  height: calc(100% - 44px);
  border-radius: 24px;
  overflow: hidden;
  background-color: rgba(239, 151, 44, 1);
}
.video-content {
  width: 100%;
  height: 100%;
  background: url('../../assets/webx-how-to-use/icon-18.png') center / cover no-repeat;
}
.video-overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.play-btn {
  width: 80px;
  height: 80px;
  background: url('../../assets/webx-how-to-use/icon-19.png') -16px -16px / 112px 112px no-repeat;
}

// ─── help text ────────────────────────────────────────────────────────────────
.help-text {
  color: rgba(123, 124, 138, 1);
  font-size: 18px;
  font-family: Sora-Regular;
  text-align: center;
  margin-top: 80px;
  cursor: pointer;
  &:hover {
    color: rgba(180, 181, 200, 1);
  }
}

// ─── responsive ───────────────────────────────────────────────────────────────
@media (max-width: 1200px) {
  .main-layout {
    gap: 32px;
  }
  .video-frame {
    width: 420px;
    height: 290px;
  }
  .video-inner-wrap {
    width: 364px;
    height: 246px;
    margin: 16px 20px;
  }
  .page-desc {
    font-size: 22px;
  }
}

@media (max-width: 1024px) {
  .main-layout {
    flex-direction: column;
    gap: 0;
  }
  .video-col {
    flex-direction: row;
    align-items: center;
    gap: 20px;
    padding-top: 0;
    margin-top: 24px;
  }
  .nav-arrows {
    display: none;
  }
  .video-frame {
    width: 100%;
    max-width: 550px;
    height: 300px;
  }
  .video-inner-wrap {
    width: calc(100% - 48px);
    height: calc(100% - 44px);
    margin: 20px 24px;
  }
  .step-card {
    width: 100%;
    max-width: 450px;
  }
}

@media (max-width: 768px) {
  .page-inner {
    padding: 0 16px 60px;
  }
  .nav-links {
    display: none;
  }
  .page-title {
    margin-top: 40px;
    flex-wrap: wrap;
  }
  .title-white,
  .title-cyan {
    font-size: 32px;
    line-height: 40px;
  }
  .page-desc {
    font-size: 16px;
    line-height: 26px;
    margin-top: 20px;
  }
  .main-layout {
    margin-top: 40px;
  }
  .step-row {
    gap: 20px;
  }
  .step-card {
    height: auto;
    min-height: 120px;
    padding-bottom: 10px;
  }
  .card-content {
    flex-wrap: wrap;
    height: auto;
  }
  .card-icon {
    width: 64px;
    height: 64px;
  }
  .video-col {
    width: 100%;
  }
  .video-frame {
    max-width: 100%;
    height: 220px;
  }
}
</style>
