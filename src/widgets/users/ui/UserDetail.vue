<template>
  <PageContainer>
    <PageHeader>
      <PageTitle> Пользователь </PageTitle>
      <AppButtonList>
        <AppButton @click="onBack"> Назад </AppButton>
        <AppButton :disabled="loading" @click="onEdit"> Редактировать </AppButton>
        <AppButtonDelete
          :disabled="loading"
          title="Удалить пользователя"
          confirm-message="Вы действительно хотите удалить пользователя?"
          @delete-confirmed="onDeleteConfirmed"
        >
        </AppButtonDelete>
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
import { UserStatus, useUserDelete, useUserDetail } from '@/entities/users'
import { useRoute, useRouter } from 'vue-router'
import { DataField, DataList } from '@/shared/ui/DataField'
import { AppButton, AppButtonDelete, AppButtonList } from '@/shared/ui/AppButton'
import { computed } from 'vue'

const route = useRoute()
const router = useRouter()

const { getUserById, loading: fetchLoading, user } = useUserDetail()
const { deleteUserById, loading: deleteLoading, onDone: onDeleteDone } = useUserDelete()

const loading = computed(() => {
  return fetchLoading.value || deleteLoading.value
})

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

const onDeleteConfirmed = () => {
  if (route.name === 'UserDetail') {
    deleteUserById(Number(route.params.id))
  }
}

onDeleteDone(onBack)

getUser()
</script>
