<template>
  <aside
    class="w-[240px] bg-white border-r border-gray-200 flex flex-col h-full"
  >
    <nav class="flex-1 px-3 py-6 space-y-1 text-[15px] font-medium">
      <!-- Add Product -->
      <NuxtLink
        to="/admin/add"
        class="relative block px-4 py-2 rounded-md transition"
        :class="{
          'text-red-600 bg-red-50': route.path === '/admin/add',
          'text-gray-700 hover:bg-gray-50': route.path !== '/admin/add',
        }"
        @click="$emit('close')"
      >
        <!-- Active bar -->
        <span
          v-if="route.path === '/admin/add'"
          class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-red-500 rounded-r"
        ></span>

        Add Product
      </NuxtLink>

      <!-- Product List -->
      <NuxtLink
        to="/admin/list"
        class="relative block px-4 py-2 rounded-md transition"
        :class="{
          'text-red-600 bg-red-50': route.path === '/admin/list',
          'text-gray-700 hover:bg-gray-50': route.path !== '/admin/list',
        }"
        @click="$emit('close')"
      >
        <!-- Active bar -->
        <span
          v-if="route.path === '/admin/list'"
          class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-red-500 rounded-r"
        ></span>

        Product List
      </NuxtLink>
    </nav>
  </aside>
</template>

<script setup lang="ts">
const route = useRoute();
defineEmits(["close"]);
</script>
