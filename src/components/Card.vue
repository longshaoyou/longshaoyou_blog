<script setup lang="ts">
import { computed } from "vue";
const props = defineProps<{ title?: string; releaseTime?: number; content?: string; width?: string; height?: string; close?: boolean; tags?: string[]; position?: "static" | "relative" | "absolute" | "sticky" | "fixed"; className?: string }>();
const emit = defineEmits<{ (e: "closeCard"): void }>();
// 从props中区参数
const { releaseTime, className } = props;
const time = computed(() => {
  const time: Date = new Date(releaseTime || +new Date());
  return time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate();
});
</script>
<template>
  <div :class="className ? className + ' card' : '' + ' card'" :style="{ width: width, height: height, position: position }">
    <div v-if="close" @click="() => emit('closeCard')">
      <svg class="close-svg" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M576 512l277.333333 277.333333-64 64-277.333333-277.333333L234.666667 853.333333 170.666667 789.333333l277.333333-277.333333L170.666667 234.666667 234.666667 170.666667l277.333333 277.333333L789.333333 170.666667 853.333333 234.666667 576 512z" fill="#222222"></path></svg>
    </div>
    <div class="card-header" v-if="title">
      <div class="card-title">{{ title }}</div>

      <div class="card-info">
        <div class="card-info-time">
          <svg class="card-info-time-svg" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path d="M512 1024A512 512 0 1 1 512 0a512 512 0 0 1 0 1024z m0-78.774857A433.225143 433.225143 0 1 0 512 78.774857a433.225143 433.225143 0 0 0 0 866.450286z m0-393.874286h236.251429a39.424 39.424 0 0 1 0 78.774857H472.649143a39.350857 39.350857 0 0 1-39.350857-39.350857V236.251429A39.350857 39.350857 0 1 1 512 236.251429v315.026285z" fill="#999999"></path>
          </svg>
          <span>发表于:{{ time || "未知" }}</span>
          <div v-if="tags" class="card-tags">
            <span v-for="tag in tags" class="card-tag">{{ tag }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="card-body">
      <v-md-editor v-if="content" :model-value="content" mode="preview"></v-md-editor>
      <slot></slot>
    </div>
  </div>
</template>

<style scpoed>
.card {
  margin: 10px;
  width: 80%;
  background: #fff;
  box-shadow: 0 2px 2px 0 rgb(0 0 0 / 12%), 0 3px 1px -2px rgb(0 0 0 / 6%), 0 1px 5px 0 rgb(0 0 0 / 12%);
  position: relative;
}
.close-svg {
  width: 30px;
  position: absolute;
  top: 0;
  right: 0;
  transform: rotate(270deg);
  cursor: pointer;
}
.card-title {
  margin-top: 50px;
  margin-bottom: 10px;
  font-size: 24px;
}
.card-info-time {
  color: #999999;
}
.card-info-time-svg {
  width: 10px;
}

.card-body {
  text-align: left;
  padding: 20px;
}
.cardContent-title {
  margin-top: 10px;
  font-size: 20px;
  line-height: 1.5;
  color: #555555;
}
.cardContent-divider {
  width: 100%;
  height: 0;
  border: 1px #555 solid;
  margin-bottom: 10px;
}
.card-tag {
  background: #ecf5ff;
  border: 1px #d9ecff solid;
  height: 36px;
  margin: 1px;
  line-height: 36px;
  padding: 0 9px;
  border-radius: 4px;
  color: #409eff;
}
</style>
