<template>
  <div class="form-field" :style="{ flexGrow }">
    <slot></slot>
    <div v-if="error" class="form-field__error">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
type Props = {
  error?: string
  flexGrow?: string | number
}

defineProps<Props>()
</script>

<style src="../styles/form-field.scss"></style>
