import type { RouteRecordRaw } from "vue-router"
import LayoutPage from "../../../pages/LayoutPage.vue"
import WithReadyUIPage from "../../../pages/WithReadyUIPage.vue"
import WithoutReadyUIPage from "../../../pages/WithoutReadyUIPage.vue"
import NotFoundPage from "../../../pages/NotFoundPage.vue"

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/layout",
  },
  {
    path: "/layout",
    component: LayoutPage,
    redirect: { name: "withUI" },
    children: [
      {
        path: "withUI",
        name: "withUI",
        component: WithReadyUIPage,
      },
      {
        path: "withoutUI",
        name: "withoutUI",
        component: WithoutReadyUIPage,
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFoundPage,
  },
]
