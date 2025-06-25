<template>
  <PageContainer>
    <PageHeader>
      <PageTitle> Создание пользователя </PageTitle>
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
import { ref } from 'vue'
import { UserStatusId, type UserEditableFields } from '@/entities/users'
import { useValidation } from '@/shared/composables/validation'
import { AppButton, AppButtonList } from '@/shared/ui/AppButton'
import { useRouter } from 'vue-router'
import { useHttpPost } from '@/shared/api/useHttpPost'

const router = useRouter()

const { loading, onDone, post } = useHttpPost<{ id: number }, UserEditableFields>()

const form = ref<UserEditableFields>({
  email: '',
  names: '',
  statusId: UserStatusId.Active,
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

const onSubmit = () => {
  clearErrors()
  const isValid = validate()

  if (isValid) {
    post('users', form.value)
  }
}

const onCancel = () => {
  router.push({
    name: 'Users',
  })
}

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
