<template>
  <AppButton class="app-button_delete" @click="onClick">
    <slot> Удалить </slot>
  </AppButton>
</template>

<script setup lang="ts">
import AppButton from './AppButton.vue'

type Props = {
  confirmMessage?: string
}

type Emits = {
  (e: 'deleteConfirmed'): void
  (e: 'click', event: MouseEvent): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const onClick = (event: MouseEvent) => {
  emit('click', event)
  if (props.confirmMessage) {
    const isConfirmed = window.confirm(props.confirmMessage)
    if (isConfirmed) {
      emit('deleteConfirmed')
    }
  }
}
</script>

<style src="../styles/index.scss"></style>
