<template>
  <div>
    <h1>Home</h1>
    <UButton @click="createUser">Create User</UButton>
    <UTable :rows="data" />
    <pre>{{ data }}</pre>
  </div>
</template>

<script lang="ts" setup>
const { data, refresh } = await useFetch("/api/users");

const createUser = async () => {
  await $fetch("/api/users", {
    method: "POST",
    body: {
      name: "John Doe",
      email: "example@gmail.com",
    },
  });
  refresh();
};
</script>
