<script setup lang="ts">
const handleLogout = async () => {
  await $fetch("/api/auth/logout", {
    method: "POST",
  });
  navigateTo("/auth/login");
};
</script>

<template>
  <UHeader title="Outlay" to="/dashboard">
    <template #left> </template>
    <template #right>
      <UButton label="Logout" @click="handleLogout" />
      <UColorModeButton />
    </template>
  </UHeader>
  <UMain>
    <div class="pt-4">
      <slot></slot>
    </div>
  </UMain>
</template>
