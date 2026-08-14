<script setup lang="ts">
import type { AuthFormField, FormSubmitEvent } from "@nuxt/ui";
import {
  type RegisterSchema,
  registerSchema,
} from "@@/shared/schemas/auth/register";

const toast = useToast();
const fields: AuthFormField[] = [
  {
    type: "text",
    name: "name",
    label: "Name",
    icon: "i-lucide-user",
    required: true,
    placeholder: "John Doe",
  },
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
    icon: "i-lucide-lock",
    required: true,
    placeholder: "**********",
  },
  {
    type: "password",
    name: "confirmPassword",
    label: "Confirm Password",
    icon: "i-lucide-lock",
    required: true,
    placeholder: "**********",
  },
];

const onSubmit = async (payload: FormSubmitEvent<RegisterSchema>) => {
  try {
    const res = await $fetch("/api/auth/register", {
      method: "POST",
      body: {
        name: payload.data.name,
        email: payload.data.email,
        password: payload.data.password,
        confirmPassword: payload.data.confirmPassword,
      },
    });
    navigateTo("/auth/login");
    toast.add({
      title: "Account created successfully!",
      icon: "i-lucide-circle-check",
      description: "Now you can login",
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
      :schema="registerSchema"
    >
      <template #description>
        Already have an account?
        <ULink to="/auth/login" class="text-primary font-medium">Login</ULink>
        .
      </template></UAuthForm
    >
  </UCard>
</template>
