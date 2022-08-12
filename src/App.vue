<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { useDark, useToggle } from "@vueuse/core";
import { useStore } from "vuex";
import Nameplate from "./components/Nameplate.vue";
import Menu from "./components/Menu.vue";
import { onMounted } from "vue";
const store = useStore();
onMounted(() => {
  store.commit("sortArticles");
});
</script>

<template>
  <div class="app">
    <div class="headband"></div>
    <div class="github-corner"></div>
    <img class="github-logo" width="50" src="./assets/github.png" alt="github" />
    <div class="page-layout">
      <div class="aisde">
        <div class="aisde-fun"><Nameplate /><Menu /></div>
      </div>
      <div class="content-div"><router-view></router-view></div>
    </div>
  </div>
</template>

<style>
/* 公共样式 */
* {
  margin: 0;
  padding: 0;
}
html,
body {
  width: 100%;
  height: 100%;
  background-color: #eee;
}
a {
  text-decoration: none;
}
::-webkit-scrollbar {
  width: 7px;
  height: 7px;
  background-color: #f5f5f5;
}
/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f5f5f5;
}
/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #c8c8c8;
}
/* app样式 */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
}
.headband {
  background: #222;
  height: 3px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
.github-corner {
  width: 0;
  height: 0;
  border: 50px solid #222;
  border-left-color: transparent;
  border-bottom-color: transparent;
  position: absolute;
  right: 0;
}

.github-logo {
  position: absolute;
  right: 0;
  transform: rotate(45deg);
}

.content-div {
  width: calc(100% - 252px);
  /* position: absolute; */
}
@media screen and (min-width: 1200px) {
  .page-layout {
    display: flex;
    justify-content: space-evenly;
    margin: 0 auto;
  }
}

.aisde-fun {
  box-shadow: 0 2px 2px 0 rgb(0 0 0 / 12%), 0 3px 1px -2px rgb(0 0 0 / 6%), 0 1px 5px 0 rgb(0 0 0 / 12%);
}
/* 移动端适配 */
@media screen and (max-width: 1200px) {
  .page-layout {
    display: flex;
    flex-direction: column;
  }
}
</style>
