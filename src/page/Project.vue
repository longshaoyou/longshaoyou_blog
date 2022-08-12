<script setup lang="ts">
import Card from "../components/Card.vue";
import { useStore } from "vuex";
import { State } from "../types";
const state = useStore().state as State;
state.projects[0];
</script>

<template>
  <div class="project">
    <Card v-for="project in state.projects" :key="project.id" height="128px" width="80%" className="project-item-card">
      <a :href="project.url" class="project-item">
        <div class="project-main-content">
          <div class="project-info">
            <div class="project-logo-layout"><img class="project-logo" :src="project.logoURL" :alt="project.name + 'Logo'" /></div>

            <div class="project-content">
              <h2>{{ project.name }}</h2>
              <div>{{ project.introduce }}</div>
              <div class="project-tags">
                标签：
                <span class="project-tag" v-for="tag in project.tags" :key="tag">{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="project-to-layout"><a class="project-to" :href="project.url">></a></div>
      </a>
    </Card>
  </div>
</template>

<style scpoed>
.project {
  width: 100%;
  margin: 10px;
  /* height: 80vh; */
  max-height: calc(100vh - 20px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-y: auto;
}

.project-item {
  display: flex;
  justify-content: space-between;
  color: #222;
}
.project-info {
  display: flex;
}
.project-tag {
  background: #ecf5ff;
  border: 1px #d9ecff solid;
  height: 36px;
  margin: 1px;
  line-height: 36px;
  padding: 0 9px;
  border-radius: 4px;
  color: #409eff;
}
.project-logo {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin: 0 20px;
}

.project-logo-layout {
  display: flex;
  justify-content: center;
  align-items: center;
}
.project-to-layout {
  display: flex;
}
.project-to {
  line-height: 88px;
  text-align: center;
  width: 30px;
}
.project-item-card {
  transition: transform 0.5s;
}
.project-item-card:hover {
  transform: scale(1.05);
  color: #222;
}
</style>
