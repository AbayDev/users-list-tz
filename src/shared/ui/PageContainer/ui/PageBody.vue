<template>
  <main :class="blockClass">
    <slot></slot>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type Props = {
  isLoading?: boolean
}

const props = defineProps<Props>()

const blockClass = computed(() => {
  return {
    'page-body': true,
    'page-body_loading': props.isLoading,
  }
})
</script>

<style src="../styles/page-body.scss"></style>
