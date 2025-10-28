<script setup lang="ts">
import { useSupabaseClient } from "#imports";
import Swal from "sweetalert2";
import { ref } from "vue";

const supabase = useSupabaseClient();
const email = ref("");
const password = ref("");
const loading = ref(false);

const handleLogin = async () => {
  loading.value = true;
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    if (error) throw error;

    await Swal.fire({
      icon: "success",
      title: "เข้าสู่ระบบสำเร็จ",
      timer: 1000,
      showConfirmButton: false,
    });

    window.location.replace("/admin/list");
  } catch (err: any) {
    Swal.fire("Error", err.message || "เข้าสู่ระบบไม่สำเร็จ", "error");
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div
      class="bg-white p-8 rounded-lg shadow-md w-full max-w-sm border border-gray-200"
    >
      <h1 class="text-2xl font-bold mb-6 text-center text-red-600">
        Admin Login
      </h1>

      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          v-model="email"
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
        />
      </div>

      <div class="mb-6">
        <label
          for="password"
          class="block text-sm font-medium text-gray-700 mb-1"
        >
          Password
        </label>
        <input
          v-model="password"
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
        />
      </div>

      <button
        @click="handleLogin"
        :disabled="loading"
        class="w-full bg-red-500 text-white font-medium py-2 rounded-md hover:bg-red-600 transition disabled:opacity-50 flex justify-center items-center gap-2"
      >
        <span v-if="!loading">Login</span>
        <span v-else>Loading...</span>
      </button>
    </div>
  </div>
</template>
