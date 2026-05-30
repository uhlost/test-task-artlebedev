import { ElMessage } from "element-plus"
import { formFields } from "../mock/formFields.mock"
import { ref } from "vue"
import { defineStore } from "pinia"
import type { Form } from "../types/form.types"

export const useFormFieldsStore = defineStore("form-fields", () => {
  const fields = ref<Form | undefined>()
  const isLoading = ref(false)

  async function getFormFields() {
    isLoading.value = true
    try {
      return new Promise((resolve) => {
        setInterval(() => {
          fields.value = formFields
          isLoading.value = false
          resolve(fields.value)
        }, 1000)
      })
    } catch (e) {
      ElMessage.error({
        message: String(e),
      })
    }
  }

  return {
    fields,
    getFormFields,
    isLoading,
  }
})
