import QChart from 'quasar-components-chart'
import MainLayout from "../layouts/MainLayout";
import Index from "../pages/Index";
import Login from "../pages/Login";
import Secure from "../pages/Secure";
import Product from "../pages/Product";
import Dosage from "../pages/Dosage";
import Client from "../pages/Client";
import User from "../pages/User";
import Venta from "../pages/Venta";
import Listado from "../pages/Listado";
import Listadodeliveri from "../pages/Listadodeliveri";
import Resumen from "../pages/Resumen";
import Libroiva from "../pages/Libroiva";
import Deliveri from "../pages/Deliveri";
import Informe from "../pages/Informe";
const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', component:Index },
      { path: '/login', component:Login },
      { path: '/secure', component:Secure ,meta: {requiresAuth: true}},
      { path: '/product', component:Product ,meta: {requiresAuth: true}},
      { path: '/dosage', component:Dosage ,meta: {requiresAuth: true}},
      { path: '/client', component:Client ,meta: {requiresAuth: true}},
      { path: '/user', component:User ,meta: {requiresAuth: true}},
      { path: '/venta', component:Venta ,meta: {requiresAuth: true}},
      { path: '/listado', component:Listado ,meta: {requiresAuth: true}},
      { path: '/listadodeliveri', component:Listadodeliveri ,meta: {requiresAuth: true}},
      { path: '/resumen', component:Resumen ,meta: {requiresAuth: true}},
      { path: '/libroiva', component:Libroiva ,meta: {requiresAuth: true}},
      { path: '/deliveri', component:Deliveri ,meta: {requiresAuth: true}},
      { path: '/informe', component:Informe ,meta: {requiresAuth: true}},
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
