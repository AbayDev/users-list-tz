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
            <AppButton> Перейти </AppButton>
            <AppButton> Редактировать </AppButton>
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

type Props = {
  users: User[]
}

defineProps<Props>()
</script>
