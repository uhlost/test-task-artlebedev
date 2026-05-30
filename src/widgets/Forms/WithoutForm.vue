<script setup lang="ts">
import { onBeforeMount, reactive } from "vue"
import { type Form, type FormField } from "../../entities"
import { WithoutCheckbox, WithoutInput, WithoutSelect } from "../WithoutReadyUI"

const prop = defineProps<{
  fields: Form | undefined
}>()

const formData = defineModel<Record<string, any>>({ required: true })

const errors = reactive<Record<string, string>>({})

function validateField(field: FormField): boolean {
  const value = formData.value[field.model]
  const errorMessages: string[] = []

  // Required валидация
  if (field.required) {
    if (field.type === "checkbox") {
      if (value !== true)
        errorMessages.push(`Необходимо подтвердить: ${field.label}`)
    } else {
      if (!value || (typeof value === "string" && value.trim() === ""))
        errorMessages.push(`${field.label} обязательно для заполнения`)
    }
  }

  // MinLength валидация для текстовых полей
  if (field.minLength && (field.type === "text" || field.type === "password")) {
    if (value && value.length < field.minLength) {
      errorMessages.push(
        `${field.label} должен содержать минимум ${field.minLength} символов`
      )
    }
  }

  // Email валидация
  if (field.type === "email" && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) errorMessages.push("Введите корректный email адрес")
  }

  if (errorMessages.length > 0) {
    errors[field.model] = errorMessages[0]
    return false
  } else {
    errors[field.model] = ""
    return true
  }
}

function validateForm(): boolean {
  if (!prop.fields) return false

  let isValid = true
  prop.fields.fields.forEach((field) => {
    const fieldIsValid = validateField(field)
    if (!fieldIsValid) isValid = false
  })
  return isValid
}

function handleSubmit() {
  if (validateForm()) console.log(formData.value)
}

function resetForm() {
  if (!prop.fields) return

  prop.fields.fields.forEach((field) => {
    if (field.type === "checkbox") formData.value[field.model] = false
    else formData.value[field.model] = ""

    errors[field.model] = ""
  })
}

function initFormData() {
  if (prop.fields) {
    prop.fields.fields.forEach((field) => {
      if (field.type === "checkbox") formData.value[field.model] = false
      else formData.value[field.model] = ""
      errors[field.model] = ''
    })
  }
}

onBeforeMount(() => {
  initFormData()
})
</script>

<template>
  <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
    <div v-for="field in fields?.fields" :key="field.model" class="flex flex-col">
      <WithoutCheckbox
        v-if="field.type === 'checkbox'"
        v-model="formData[field.model]"
        v-model:errors="errors[field.model]"
        :field
        @valid-field="validateField(field)"
      />

      <WithoutSelect
        v-else-if="field.type === 'select'"
        v-model="formData[field.model]"
        v-model:errors="errors[field.model]"
        :field
        @valid-field="validateField(field)"
      />

      <WithoutInput
        v-else
        v-model="formData[field.model]"
        v-model:errors="errors[field.model]"
        :field
        @valid-field="validateField(field)"
      />
    </div>

    <div class="flex gap-2 justify-end">
      <button
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
        type="submit"
      >
        Отправить
      </button>
      <button
        class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium"
        type="button"
        @click="resetForm"
      >
        Сбросить
      </button>
    </div>
  </form>
</template>
