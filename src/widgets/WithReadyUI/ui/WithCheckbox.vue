<script setup lang="ts">
import { ElCheckbox } from "element-plus"
import type { FormField } from "../../../entities"

defineProps<{
  field: FormField
}>()

const checkboxVal = defineModel<boolean>({ required: true })
</script>

<template>
  <ElCheckbox v-model="checkboxVal">
    {{ field.label }}
  </ElCheckbox>
</template>
