<script setup lang="ts">
import {
  ElButton,
  ElForm,
  ElFormItem,
  type FormInstance,
  type FormItemRule,
} from "element-plus"
import { computed, onBeforeMount, reactive, ref } from "vue"
import { type Form } from "../../entities"
import { WithCheckbox, WithInput, WithSelect } from "../WithReadyUI"

const prop = defineProps<{
  fields: Form | undefined
}>()

const formRef = ref<FormInstance>()

const formData = defineModel<Record<string, any>>({ required: true })

const formRules = computed(() => {
  const rules = reactive<Record<string, FormItemRule[]>>({})

  if (prop.fields) {
    prop.fields.fields.forEach((field) => {
      const fieldRules: FormItemRule[] = []

      if (field.required) {
        if (field.type === "checkbox") {
          fieldRules.push({
            trigger: "change",
            validator: (_rule, value, callback) => {
              if (value === true) callback()
              else callback(new Error(`Нужно поставить галочку`))
            },
          })
        } else {
          fieldRules.push({
            required: true,
            message: `Поле "${field.label}" обязательно для заполнения`,
            trigger: "blur",
          })
        }
      }

      if (field.minLength && (field.type === "text" || field.type === "password")) {
        fieldRules.push({
          min: field.minLength,
          message: `${field.label} должен содержать минимум ${field.minLength} символов`,
          trigger: "blur",
        })
      }

      if (field.type === "email") {
        fieldRules.push({
          type: "email",
          message: "Введите корректный email адрес",
          trigger: "blur",
        })
      }

      if (fieldRules.length > 0) rules[field.model] = fieldRules
    })
  }

  return rules
})

function initFormData() {
  if (prop.fields) {
    prop.fields.fields.forEach((field) => {
      if (field.type === "checkbox") formData.value[field.model] = false
      else formData.value[field.model] = ""
    })
  }
}

function resetForm() {
  if (!prop.fields) return

  prop.fields.fields.forEach((field) => {
    if (field.type === "checkbox") formData.value[field.model] = false
    else formData.value[field.model] = ""
  })
}

async function submitForm(formEl: FormInstance | undefined) {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) console.log(formData.value)
  })
}

onBeforeMount(() => {
  initFormData()
})
</script>

<template>
  <ElForm
    ref="formRef"
    hide-required-asterisk
    :model="formData"
    :rules="formRules"
    label-position="top"
  >
    <template v-for="field in fields?.fields" :key="field.label">
      <ElFormItem
        v-if="field.type === 'select'"
        :prop="field.model"
        :label="field.label"
      >
        <WithSelect v-model="formData[field.model]" :field></WithSelect>
      </ElFormItem>
      <ElFormItem :prop="field.model" v-else-if="field.type === 'checkbox'">
        <WithCheckbox v-model="formData[field.model]" :field></WithCheckbox>
      </ElFormItem>
      <ElFormItem :prop="field.model" v-else :label="field.label">
        <WithInput v-model="formData[field.model]" :field></WithInput>
      </ElFormItem>
    </template>
    <div class="justify-end flex">
      <ElButton @click="submitForm(formRef)" type="primary"
        >Отправить форму</ElButton
      >
      <ElButton @click="resetForm()" type="info">Сбросить</ElButton>
    </div>
  </ElForm>
</template>
