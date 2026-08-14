<script setup lang="ts">
import type { AuthFormField, FormSubmitEvent } from "@nuxt/ui";
import { type LoginSchema, loginSchema } from "@@/shared/schemas/auth/login";
const toast = useToast();

const fields: AuthFormField[] = [
  {
    type: "email",
    name: "email",
    label: "Email",
    autocomplete: "on",
    icon: "i-lucide-mail",
    required: true,
    placeholder: "example@email.com",
  },
  {
    type: "password",
    name: "password",
    label: "Password",
    icon: "i-lucide-user-round",
    required: true,
    placeholder: "**********",
  },
];

const onSubmit = async (payload: FormSubmitEvent<LoginSchema>) => {
  try {
    const res = await $fetch("/api/auth/login", {
      method: "POST",
      body: {
        email: payload.data.email,
        password: payload.data.password,
      },
    });
    if (res.user) {
      navigateTo("/dashboard");
    }
    toast.add({
      title: "Welcome back, " + res.user?.name,
      icon: "i-lucide-circle-check",
      description: "Login successful",
      color: "success",
    });
  } catch (error: any) {
    toast.add({
      title: "Error",
      icon: "i-lucide-circle-alert",
      description: error.statusMessage,
      color: "error",
    });
  }
};
</script>
<template>
  <UCard class="max-w-sm mx-auto">
    <UAuthForm
      :fields="fields"
      @submit="onSubmit"
      title="Welcome back!"
      description="Login into your account"
      icon="i-lucide-lock"
      :schema="loginSchema"
    >
      <template #description>
        Don't have an account?
        <ULink to="/auth/register" class="text-primary font-medium"
          >Sign up</ULink
        >.
      </template></UAuthForm
    >
  </UCard>
</template>
