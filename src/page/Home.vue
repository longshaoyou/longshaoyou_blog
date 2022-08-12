<script setup lang="ts">
import { Ref, ref } from "vue";
import Card from "../components/Card.vue";
const title: Ref<string> = ref("欢迎来到龙家明的个人网站!");
// const releaseTime: Ref<number> = ref(Date.now());
const releaseTime: Ref<number> = ref(1657955931535);
const markdownhtml: Ref<string> = ref(`
## 介绍
### 这是一个使用 Vue3 + TypeScript 的个人网站（目前还没接后端）
技术栈：
+ Vue3 全家桶
+ TypeScript
+ Vite
+ Markdownhtml （解析Markdown）
### 目前有的功能：
+ 文章的编写 (支持Markdown编写)
+ 文章的查看
+ 分页浏览文章
+ 搜索标签
+ 搜索标题
+ ...未完待续
## ps: npm run dev 就可以运行了
`);

const close = ref(true);
</script>

<template>
  <div class="home">
    <Card :title="title" :releaseTime="releaseTime" :content="markdownhtml"></Card>
  </div>
</template>

<style>
.home {
  width: 100%;
  height: 100%;
  /* margin:auto; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
