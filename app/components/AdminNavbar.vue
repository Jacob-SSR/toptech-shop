<template>
  <header
    class="h-[72px] flex items-center justify-between px-4 md:px-6 bg-white border-b border-gray-200"
  >
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

    <div class="flex items-center gap-3 text-sm">
      <span class="text-gray-700 font-medium hidden sm:block">Admin</span>
      <button
        class="border px-4 py-1.5 rounded-md hover:bg-gray-100 text-sm font-medium"
        @click="logout"
      >
        Logout
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import Swal from "sweetalert2";
import { useSupabaseClient } from "#imports";

const supabase = useSupabaseClient();

const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    await Swal.fire({
      icon: "success",
      title: "ออกจากระบบแล้ว",
      timer: 1500,
      showConfirmButton: false,
    });

    window.location.replace("/admin/login");
  } catch (err) {
    console.error("Logout error:", err);
    Swal.fire("Error", "ไม่สามารถออกจากระบบได้", "error");
  }
};

defineEmits(["toggleSidebar"]);
</script>
