<script setup lang="ts">
import { onMounted, ref } from "vue";
import Sidebar from "../components/Sidebar.vue";
import Navbar from "../components/Navbar.vue";
import Home from "../views/Home.vue";
import store from "../store/store";

onMounted(async () => {
  store.actions.getSidebarStatus();
});
const visibleLeft = ref(false);
const showSidebar = ref(store.getters.sidebarStatus);

const closeSideBar = () => {
  visibleLeft.value = false;
};
</script>

<template>
  <div class="grid grid-cols-auto-1fr">
    <div class="hidden md:block">
      <Sidebar :showSidebar="true" />
    </div>

    <div class="h-screen overflow-y-auto custom-scrollbar">
      <router-view v-slot="{ Component, route }">
        <div class="sticky top-0">
          <Navbar />
        </div>
        <transition name="fade" appear mode="out-in">
          <div :key="route.name">
            <component :is="Component" />
          </div>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<style scoped></style>
