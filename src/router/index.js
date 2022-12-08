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
import notfound from '../components/Notfound/notfound.vue'

import App from '../App.vue'
import AdminMenu from '../components/Admin/AdminMenu.vue'
import axios from "axios";
import url from '../../enviroment.js'
import VueCookies from "vue-cookies";
function checkLogin() {
    return VueCookies.isKey('token')
}
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/', component: ViewRoutes, children: [
                //home {path:'',component:},
           
                { path: '', redirect: { name: 'welcome' } },
                { path: 'welcome', component: Welcome, name: 'welcome' },
                {
                    path: 'admin', children: [
                        { path: '', redirect: { name: 'menuAdmin' } },
                        { path: 'menu', component: AdminMenu, name: 'menuAdmin' },
                        { path: 'book', component: Books, name: 'menuBook' },
                        { path: 'category', component: Category, name: 'menuCategory' },
                        { path: 'cita', component: Cita, name: 'menuCita' }
                    ]
                },
                { path: 'home', component: Home, name: 'home' },
                { path: 'categories', component: Categories, name: 'categories' },
                { path: 'book/:id', component: BookDetail, name: 'book' },
                { path: 'profile', component: Profile, name: 'profile' },
                { path: 'login', component: Login, name: 'login' },
                { path: 'registro', component: Registro, name: 'register' },
                {path:'/:catchAll(.*)',component:notfound}
            ]
        }
    ]
})
router.beforeEach(async (to, from) => {
    if (!VueCookies.isKey('token') && to.name !== 'login' && to.name !== 'register' && to.name !== 'welcome'
    ) {
        return { name: 'login' }
    }
})

export default router