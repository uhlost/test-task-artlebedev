<script setup lang="ts">
import type { FormField } from "../../../entities"

defineProps<{
  field: FormField
}>()

defineEmits<{
  validField: []
}>()

const selectValue = defineModel<boolean>({ required: true })
const errors = defineModel<string>("errors", { required: true })
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label class="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        v-model="selectValue"
        @change="$emit('validField')"
        :class="[
          'w-4 h-4 rounded border-2 cursor-pointer',
          errors
            ? 'border-red-500 text-red-500 focus:ring-red-500'
            : 'border-gray-300 text-blue-600 focus:ring-blue-500',
        ]"
      />
      <span class="text-sm font-medium text-gray-700">
        {{ field.label }}
      </span>
    </label>

    <span v-if="errors !== ''" class="text-sm text-red-500 ml-6">
      {{ errors }}
    </span>
  </div>
</template>
