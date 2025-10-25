<template>
  <div class="min-h-screen flex flex-col bg-white">
    <!-- Navbar -->
    <AdminNavbar @toggleSidebar="sidebarOpen = !sidebarOpen" />

    <!-- Main content area -->
    <div class="flex flex-1">
      <!-- Sidebar -->
      <transition name="slide">
        <AdminSidebar
          v-if="sidebarOpen || isDesktop"
          class="fixed md:static inset-y-0 left-0 z-50 w-[240px] bg-white border-r border-gray-200"
          @close="sidebarOpen = false"
        />
      </transition>

      <!-- Content -->
      <main class="flex-1 p-6 overflow-y-auto bg-white">
        <slot />
      </main>
    </div>

    <!-- Overlay for mobile -->
    <div
      v-if="sidebarOpen && !isDesktop"
      class="fixed inset-0 bg-black/40 md:hidden"
      @click="sidebarOpen = false"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import AdminNavbar from "~/components/AdminNavbar.vue";
import AdminSidebar from "~/components/AdminSidebar.vue";

const sidebarOpen = ref(false);
const isDesktop = ref(false);

const handleResize = () => {
  isDesktop.value = window.innerWidth >= 1024;
  if (isDesktop.value) sidebarOpen.value = true;
};

onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
});
onUnmounted(() => window.removeEventListener("resize", handleResize));
</script>
