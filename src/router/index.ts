import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import MainLayout from "../layout/MainLayout.vue";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Main",
        component: MainLayout,
        children: [
          {
            path: "/",
            name: "Home",
            component: Home,
            meta: {
              title: "Home",
            },
          },
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
  
    scrollBehavior(to, from, savedPosition) {
      if (to.hash) {
        return {
          selector: to.hash,
          behavior: "smooth",
        };
      }
    },
  });

  export default router