<template>
  <div class="app-pagination">
    <button class="app-pagination__btn" :disabled="pageIndex <= 0" @click="prev">← Назад</button>

    <span class="app-pagination__info"> Страница {{ pageIndex + 1 }} из {{ totalPage }} </span>

    <button class="app-pagination__btn" :disabled="pageIndex + 1 >= totalPage" @click="next">
      Вперёд →
    </button>
  </div>
</template>

<script setup lang="ts">
type Props = {
  totalPage: number // всего страниц
}

const props = defineProps<Props>()

const pageIndex = defineModel<number>({ required: true })

const prev = () => {
  if (pageIndex.value) {
    pageIndex.value = pageIndex.value - 1
  }
}

const next = () => {
  if (pageIndex.value + 1 < props.totalPage) {
    pageIndex.value = pageIndex.value + 1
  }
}
</script>

<style src="../styles/index.scss"></style>
