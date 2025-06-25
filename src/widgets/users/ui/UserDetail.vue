<template>
  <PageContainer>
    <PageHeader>
      <PageTitle> Пользователь </PageTitle>
      <AppButtonList>
        <AppButton @click="onBack"> Назад </AppButton>
        <AppButton @click="onEdit"> Редактировать </AppButton>
        <AppButton> Удалить </AppButton>
      </AppButtonList>
    </PageHeader>
    <PageBody :is-loading="loading">
      <template v-if="user">
        <DataList>
          <DataField>
            <template #label> ID: </template>
            {{ user.id }}
          </DataField>
          <DataField>
            <template #label>ФИО:</template>
            {{ user.names }}
          </DataField>

          <DataField>
            <template #label>Почта:</template>
            {{ user.email }}
          </DataField>

          <DataField>
            <template #label>Статус</template>
            <UserStatus :status-id="user.statusId" />
          </DataField>
        </DataList>
      </template>
    </PageBody>
  </PageContainer>
</template>

<script setup lang="ts">
import { PageBody, PageContainer, PageHeader, PageTitle } from '@/shared/ui/PageContainer'
import { UserStatus, useUserDetail } from '@/entities/users'
import { useRoute, useRouter } from 'vue-router'
import { DataField, DataList } from '@/shared/ui/DataField'
import { AppButton, AppButtonList } from '@/shared/ui/AppButton'

const route = useRoute()
const router = useRouter()

const { getUserById, loading, user } = useUserDetail()

const getUser = () => {
  if (route.name === 'UserDetail' && typeof route.params.id === 'string') {
    getUserById(Number(route.params.id))
  }
}

const onBack = () => {
  router.push({
    name: 'Users',
  })
}

const onEdit = () => {
  if (route.name === 'UserDetail') {
    router.push({
      name: 'UserEdit',
      params: {
        id: Number(route.params.id),
      },
    })
  }
}

getUser()
</script>
