const routes = [
  {
    path: "/dashboard",
    component: () => import("@/layouts/dashboard.vue"),
    children: [
      {
        path: "",
        name: "dashboard",
        component: () => import("@/views/dashboard/dashboard.vue"),
      },
    ],
  },
];

export default routes;
