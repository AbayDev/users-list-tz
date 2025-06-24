<template>
  <PageContainer>
    <PageHeader>
      <PageTitle> Список пользователей </PageTitle>
      <ListSearchInput v-model="store.search" placeholder="Найти..." />
    </PageHeader>
    <PageBody :is-loading="store.loading">
      <UsersTable :users="store.users" />
    </PageBody>
    <PageFooter>
      <AppPagination v-model="store.pageIndex" :totalPage="store.totalPage" />
    </PageFooter>
  </PageContainer>
</template>

<script setup lang="ts">
import { PageContainer, PageHeader, PageTitle } from '@/shared/ui/PageContainer'
import UsersTable from './UsersTable.vue'
import { useUsersListStore } from '../store/useUsersListStore'
import PageBody from '@/shared/ui/PageContainer/ui/PageBody.vue'
import { AppPagination } from '@/shared/ui/AppPagination'
import { ListSearchInput } from '@/shared/ui/ListSearchInput'
import { useUsersListRouteQuery } from '../composables/useUsersListRouteQuery'
import { watch } from 'vue'
import { debounce } from '@/shared/lib/debounce'

const store = useUsersListStore()
const { applyRouteQuery, saveRouteQuery } = useUsersListRouteQuery()

applyRouteQuery()
store.getUsers()

/**
 * при изменении фильтра и страницу, сохраняем в `route.query`
 * что бы запомнить выбор пользователя
 * оптимизируем изменения роута с помощью `debounce`
 */
watch([() => store.search, () => store.pageIndex], debounce(saveRouteQuery, 300))
</script>
