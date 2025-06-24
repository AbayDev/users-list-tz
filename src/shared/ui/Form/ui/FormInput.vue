<template>
  <input v-model="modelValue" class="form-input" />
</template>

<script setup lang="ts">
const modelValue = defineModel()
</script>

<style src="../styles/form-input.scss"></style>
