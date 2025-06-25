<template>
  <input v-model="modelValue" :class="blockClass" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { FormInputProps } from '../model'

const props = defineProps<FormInputProps>()

const modelValue = defineModel()

const blockClass = computed(() => {
  return {
    'form-input': true,
    'form-input_error': props.isError,
  }
})
</script>

<style src="../styles/form-input.scss"></style>
