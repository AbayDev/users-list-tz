<template>
  <label :for="props.for" class="form-label">
    <slot></slot>
  </label>
</template>

<script setup lang="ts">
type Props = {
  for?: string
}

const props = defineProps<Props>()
</script>

<style src="../styles/form-label.scss"></style>
