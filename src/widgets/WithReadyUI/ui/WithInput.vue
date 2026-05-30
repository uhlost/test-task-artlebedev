<script setup lang="ts">
import { ElInput } from "element-plus"
import type { FormField } from "../../../entities"

defineProps<{
  field: FormField
}>()

const inputValue = defineModel<string | number>({ required: true })
</script>

<template>
  <ElInput
    :type="field.type"
    :show-password="field.type === 'password'"
    v-model="inputValue"
  />
</template>
