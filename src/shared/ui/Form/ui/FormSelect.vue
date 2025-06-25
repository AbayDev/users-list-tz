<template>
  <select v-model="model" :class="blockClass">
    <option :disabled="!isClearable" value="">{{ placeholder }}</option>
    <option v-for="option of options" :key="option.value" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { FormSelectProps } from '../model'
import { FORM_SELECT_DEFAULT_PLACEHOLDER } from '../config'

const props = defineProps<FormSelectProps>()

const model = defineModel<string | number>()

const placeholder = computed(() => {
  return props.placeholder || FORM_SELECT_DEFAULT_PLACEHOLDER
})

const blockClass = computed(() => {
  return {
    'form-select': true,
    'form-select_error': props.isError,
  }
})
</script>

<style src="../styles/form-select.scss"></style>
