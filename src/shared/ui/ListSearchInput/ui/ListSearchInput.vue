<template>
  <FormInput class="list-search-input" v-model="modelValue" />
</template>

<script setup lang="ts">
import { FormInput } from '../../Form'

/**
 * Ответсвенность компонента быть поискам в списках
 */

const modelValue = defineModel()
</script>

<style src="../styles/index.scss"></style>
