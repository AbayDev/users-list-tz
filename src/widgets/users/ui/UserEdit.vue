<template>
  <PageContainer>
    <PageHeader>
      <PageTitle> Редактировать пользователя </PageTitle>
    </PageHeader>
    <PageBody :is-loading="loading">
      <FormBase @submit.prevent="onSubmit">
        <FormContainer>
          <FormField :error="errors.names">
            <FormLabel> Фамилия Имя Отчество </FormLabel>
            <FormInput
              v-model="form.names"
              :is-error="!!errors.names"
              @update:model-value="onChange('names')"
            />
          </FormField>
          <FormField :error="errors.email">
            <FormLabel> Электронная почта </FormLabel>
            <FormInput
              v-model="form.email"
              :is-error="!!errors.email"
              @update:model-value="onChange('email')"
            />
          </FormField>
          <FormField>
            <FormLabel> Статус </FormLabel>
            <UserStatusSelect v-model="form.statusId" />
          </FormField>
          <AppButtonList>
            <AppButton type="submit" title="Создать пользователя" :disabled="loading">
              Сохранить
            </AppButton>
            <AppButton
              type="button"
              title="Перейти в список пользователей"
              :disabled="loading"
              @click="onCancel"
            >
              Отменить
            </AppButton>
          </AppButtonList>
        </FormContainer>
      </FormBase>
    </PageBody>
  </PageContainer>
</template>

<script setup lang="ts">
import { PageBody, PageContainer, PageHeader, PageTitle } from '@/shared/ui/PageContainer'
import { FormBase, FormContainer, FormField, FormInput, FormLabel } from '@/shared/ui/Form'
import { computed } from 'vue'
import { UserStatusSelect, type UserEditableFields } from '@/entities/users'
import { useValidation } from '@/shared/composables/validation'
import { AppButton, AppButtonList } from '@/shared/ui/AppButton'
import { useRoute, useRouter } from 'vue-router'
import { useUserEditForm } from '../composables/useUserEdit'
import { useHttpPatch } from '@/shared/api/useHttpPatch'

const router = useRouter()
const route = useRoute()

const { form, loading: fetchLoading, getUserById } = useUserEditForm()
const { loading: updateLoading, onDone, patch } = useHttpPatch<{ id: number }, UserEditableFields>()

const loading = computed(() => {
  return updateLoading.value || fetchLoading.value
})

const { errors, clearErrors, validate, onChange } = useValidation({
  form,
  rules: {
    email: [
      {
        type: 'required',
      },
      {
        type: 'email',
      },
    ],
    names: [
      {
        type: 'required',
      },
    ],
  },
})

const getUser = () => {
  if (route.name === 'UserEdit' && typeof route.params.id === 'string') {
    getUserById(Number(route.params.id))
  }
}

const onSubmit = () => {
  clearErrors()
  const isValid = validate()

  if (route.name === 'UserEdit' && isValid) {
    patch(`users/${route.params.id}`, form.value)
  }
}

const onCancel = () => {
  if (route.name === 'UserEdit') {
    router.push({
      name: 'UserDetail',
      params: {
        id: route.params.id,
      },
    })
  }
}

getUser()

onDone((res) => {
  if (res.id) {
    router.push({
      name: 'UserDetail',
      params: {
        id: res.id,
      },
    })
  }
})
</script>
