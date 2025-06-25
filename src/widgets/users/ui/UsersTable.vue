<template>
  <AppTable>
    <AppTableHead>
      <AppTableHeader> ID </AppTableHeader>
      <AppTableHeader> ФИО </AppTableHeader>
      <AppTableHeader> Email </AppTableHeader>
      <AppTableHeader> Статус </AppTableHeader>
      <AppTableHeader> Действия </AppTableHeader>
    </AppTableHead>
    <AppTableBody>
      <AppTableRow v-for="user of users" :key="user.id">
        <AppTableData>
          {{ user.id }}
        </AppTableData>
        <AppTableData>
          {{ user.names }}
        </AppTableData>
        <AppTableData>
          {{ user.email }}
        </AppTableData>
        <AppTableData>
          <UserStatus :status-id="user.statusId" />
        </AppTableData>
        <AppTableData>
          <AppButtonList>
            <AppButton @click="onRedirect(user.id)"> Перейти </AppButton>
            <AppButton @click="onEdit(user.id)"> Редактировать </AppButton>
          </AppButtonList>
        </AppTableData>
      </AppTableRow>
    </AppTableBody>
  </AppTable>
</template>

<script setup lang="ts">
import { UserStatus, type User } from '@/entities/users'
import {
  AppTable,
  AppTableHead,
  AppTableHeader,
  AppTableBody,
  AppTableRow,
  AppTableData,
} from '@/shared/ui/TableList'
import { AppButton, AppButtonList } from '@/shared/ui/AppButton'
import { useRouter } from 'vue-router'

type Props = {
  users: User[]
}

defineProps<Props>()

const router = useRouter()

const onRedirect = (userId: number) => {
  router.push({
    name: 'UserDetail',
    params: {
      id: userId,
    },
  })
}

const onEdit = (userId: number) => {
  router.push({
    name: 'UserEdit',
    params: {
      id: userId,
    },
  })
}
</script>
