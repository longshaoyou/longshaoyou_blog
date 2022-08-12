<script setup lang="ts">
import { useStore } from "vuex";
import { State } from "../types";
const state = useStore().state as State;
</script>

<template>
  <div class="Menu">
    <ul>
      <li class="menu-item" v-for="MenuItem in state.MenuItems" :key="MenuItem.id">
        <router-link :to="MenuItem.to">{{ MenuItem.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<style scpoed>
.Menu {
  width: 220px;
  /* height: 111px; */
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 10px 0;
}
.menu-item {
  /* width: 100%; */
  height: 36px;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  transition: background-color 0.5s;
}
.menu-item:hover,
.router-link-active {
  background-color: #f5f5f5;
}
.menu-item > a {
  width: 100%;
  height: 100%;
  line-height: 36px;
  padding: 0 20px;
  text-decoration: none;
  color: #222;
}
</style>
