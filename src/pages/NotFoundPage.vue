<script setup lang="ts">
import { ElButton } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="h-screen bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500">
    <div class="flex h-full flex-col gap-2 items-center justify-center">
      <p>Неверный url</p>
      <ElButton @click="router.push('/layout')">
        Вернуться к форме
      </ElButton>
    </div>
  </div>
</template>