<script setup lang="ts"></script>

<template>
  <UHeader title="Outlay" to="/auth/login">
    <template #right>
      <UColorModeButton />
    </template>
  </UHeader>
  <UMain>
    <div class="pt-4">
      <slot></slot>
    </div>
  </UMain>
</template>
