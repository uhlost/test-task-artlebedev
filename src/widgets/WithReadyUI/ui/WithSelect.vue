<script setup lang="ts">
import { ElOption, ElSelect } from "element-plus"
import type { FormField } from "../../../entities"

defineProps<{
  field: FormField
}>()

const selectValue = defineModel<string>({ required: true })
</script>

<template>
  <ElSelect v-model="selectValue">
    <ElOption
      v-for="option in field.options"
      :key="option"
      :value="option"
      :label="option"
    >
    </ElOption>
  </ElSelect>
</template>
