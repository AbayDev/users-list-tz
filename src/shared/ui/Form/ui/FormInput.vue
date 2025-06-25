<template>
  <input v-model="modelValue" :class="blockClass" />
</template>

<script setup lang="ts">
import { computed } from 'vue'

type Props = {
  isError?: boolean
}

const props = defineProps<Props>()

const modelValue = defineModel()

const blockClass = computed(() => {
  return {
    'form-input': true,
    'form-input_error': props.isError,
  }
})
</script>

<style src="../styles/form-input.scss"></style>
