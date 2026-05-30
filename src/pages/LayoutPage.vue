<script setup lang="ts">
import {
  ElAside,
  ElContainer,
  ElHeader,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElScrollbar,
} from "element-plus"
import { useRoute, useRouter } from "vue-router"

const router = useRouter()
const route = useRoute()
</script>

<template>
  <ElContainer class="h-screen">
    <ElHeader class="flex items-center border-b border-gray-300">
      Тестовое задание artlebedev
    </ElHeader>
    <ElContainer class="overflow-hidden">
      <ElAside>
        <ElMenu
          :default-active="route.path.split('/')[2]"
          class="h-full"
          @select="(route) => router.push({ name: route })"
        >
          <ElMenuItem index="withUI"> С готовым UI </ElMenuItem>
          <ElMenuItem index="withoutUI"> Без готового UI </ElMenuItem>
        </ElMenu>
      </ElAside>
      <ElMain>
        <ElScrollbar wrap-class="pr-3" class="h-full w-full">
          <RouterView />
        </ElScrollbar>
      </ElMain>
    </ElContainer>
  </ElContainer>
</template>
