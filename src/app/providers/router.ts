import { createRouter, createWebHistory } from "vue-router"
import { routes } from "../index"

export const router = createRouter({
  history: createWebHistory(),
  routes,
})