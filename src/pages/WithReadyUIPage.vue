<script setup lang="ts">
import { ElSkeleton } from "element-plus"
import { onMounted, reactive } from "vue"
import { storeToRefs } from "pinia"
import WithForm from "../widgets/Forms/WithForm.vue"
import { useFormFieldsStore } from "../entities"

const formFieldsStore = useFormFieldsStore()
const { fields, isLoading } = storeToRefs(formFieldsStore)

const formData = reactive<Record<string, any>>({})

onMounted(async () => {
  await formFieldsStore.getFormFields()
})
</script>

<template>
  <ElSkeleton v-if="isLoading" :rows="7" animated />
  <WithForm v-else :fields v-model="formData" />
</template>
