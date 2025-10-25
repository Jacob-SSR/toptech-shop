<template>
  <header
    class="h-[72px] flex items-center justify-between px-4 md:px-6 bg-white border-b border-gray-200"
  >
    <!-- Left: Logo & Hamburger -->
    <div class="flex items-center gap-3">
      <button
        class="md:hidden text-gray-700 hover:text-red-600"
        @click="$emit('toggleSidebar')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <img src="/logo.png" alt="TopTech Logo" class="h-6 object-contain" />
    </div>

    <!-- Right: Admin + Logout -->
    <div class="flex items-center gap-3 text-sm">
      <span class="text-gray-700 font-medium hidden sm:block">Admin</span>
      <button
        class="border px-4 py-1.5 rounded-md hover:bg-gray-100 text-sm font-medium"
      >
        Logout
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
defineEmits(["toggleSidebar"]);
</script>
