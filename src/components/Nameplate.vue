<script setup lang="ts"></script>

<template>
  <div class="personal-nameplate">
    <p>欢迎来到</p>
    <a class="owner-name">龙家明的个人网站</a>
  </div>
</template>

<style scpoed>
.owner-name {
  color: #fff;
  text-decoration: none;
  text-align: center;
  font-weight: normal;
  font-size: 25px;
  line-height: 1.5;
}
@media screen and (min-width: 1200px) {
  .personal-nameplate {
    background: #222;
    color: #fff;
    width: 220px;
    height: 111px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
@media screen and (max-width: 1200px) {
  .personal-nameplate {
    background: #222;
    color: #fff;
    height: 111px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
