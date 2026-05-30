<script setup lang="ts">
import type { FormField } from "../../../entities"

defineProps<{
  field: FormField
}>()

defineEmits<{
  validField: []
}>()

const inputValue = defineModel<string>({ required: true })
const errors = defineModel<string>("errors", { required: true })
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label :for="field.model" class="text-sm font-medium text-gray-700">
      {{ field.label }}
    </label>

    <input
      :id="field.model"
      :type="field.type"
      v-model="inputValue"
      :placeholder="`Введите ${field.label.toLowerCase()}`"
      :class="[
        'px-2.5 py-1 border rounded-lg outline-none transition-all duration-200',
        errors
          ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
          : 'border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500',
      ]"
      @blur="$emit('validField')"
      class="field-input"
    />

    <span v-if="errors !== ''" class="text-sm text-red-500">
      {{ errors }}
    </span>
  </div>
</template>
