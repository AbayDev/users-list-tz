<template>
  <div class="user-status" :class="statusClass">
    {{ text }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { UserStatusId } from '../model/UserStatusId'
import { UserStatusClass, UserStatusText } from '../model/UserStatusConfig'

type Props = {
  statusId: UserStatusId
}

const props = defineProps<Props>()

const text = computed(() => {
  return UserStatusText[props.statusId]
})

const statusClass = computed(() => {
  return UserStatusClass[props.statusId]
})
</script>

<style src="../styles/user-status.scss"></style>
