import { createRouter, createWebHistory } from "vue-router";
import Books from '../components/Admin/Libros.vue'
import Category from '../components/Admin/Categoria.vue'
import Cita from '../components/Admin/Cita.vue'
import Login from '../components/User/Login.vue'
import ViewRoutes from '../components/ViewRoutes/ViewRoutes.vue'
import BookDetail from '../components/User/BookDetail.vue'
import Profile from '../components/User/Profile.vue'
import Welcome from '../components/Welcome/Welcome.vue'
import Home from '../components/User/Home/Home.vue'
import Registro from '../components/User/Registro.vue'
import Categories from '../components/User/Categories/Categories.vue'
import App from '../App.vue'
import AdminMenu from '../components/Admin/AdminMenu.vue'
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/', component: ViewRoutes, children: [
                //home {path:'',component:},
                //404 {path:'/:catchAll(.*)',component:},
                { path: '', redirect: '/welcome' },
                {
                    path: 'admin', children: [
                        { path: '', redirect: { name: 'menuAdmin' } },
                        { path: 'menu', component: AdminMenu, name: 'menuAdmin' },
                        { path: 'book', component: Books, name: 'menuBook' },
                        { path: 'category', component: Category, name: 'menuCategory' },
                        { path: 'cita', component: Cita, name: 'menuCita' }
                    ]
                },
                { path: 'welcome', component: Welcome },
                { path: 'home', component: Home },
                { path: 'categories', component: Categories },
                { path: 'book/:id', component: BookDetail },
                { path: 'profile', component: Profile },
                { path: 'login', component: Login },
                { path: 'registro', component: Registro }
            ]
        }
    ]
})

export default router