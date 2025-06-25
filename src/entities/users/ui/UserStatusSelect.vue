<template>
  <FormSelect
    v-bind="props"
    :model-value="statusId"
    :options="options"
    @update:model-value="onUpdateModelValue"
  />
</template>

<script setup lang="ts">
import { FormSelect } from '@/shared/ui/Form'
import type { FormSelectOption, FormSelectProps } from '@/shared/ui/Form'
import { UserStatusId } from '../model/UserStatusId'

type Props = Omit<FormSelectProps, 'options'>

const props = defineProps<Props>()

const statusId = defineModel<UserStatusId>()

const options: FormSelectOption[] = [
  {
    name: 'Активирован',
    value: String(UserStatusId.Active),
  },
  {
    name: 'Заблокирован',
    value: String(UserStatusId.Disabled),
  },
]

const onUpdateModelValue = (value: string | number | undefined) => {
  if (value) {
    statusId.value = Number(value) as UserStatusId
  }
}
</script>
