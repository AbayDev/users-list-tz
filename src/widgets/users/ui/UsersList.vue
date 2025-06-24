<template>
  <PageContainer>
    <PageHeader>
      <PageTitle> Список пользователей </PageTitle>
      <ListSearchInput v-model="usersStore.search" placeholder="Найти..." />
    </PageHeader>
    <PageBody>
      <UsersTable :users="usersStore.users" />
    </PageBody>
    <PageFooter>
      <AppPagination v-model="usersStore.pageIndex" :totalPage="usersStore.totalPage" />
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

const usersStore = useUsersListStore()

usersStore.getUsers()
</script>
