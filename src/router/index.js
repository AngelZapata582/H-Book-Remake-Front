import { createRouter, createWebHistory } from "vue-router";
import Books from '../components/Admin/Libros.vue'
import Category from '../components/Admin/Categoria.vue'
import Cita from '../components/Admin/Cita.vue'
import Login from '../components/User/Login.vue'
import ViewRoutes from '../components/ViewRoutes/ViewRoutes.vue'
import Detalle_Libro from '../components/User/Detalle_Libro.vue'
import Perfil from '../components/User/Perfil.vue'
import Welcome from '../components/Welcome/Welcome.vue'
import Home from '../components/User/Home/Home.vue'
import Registro from '../components/User/Registro.vue'
import Categories from '../components/User/Categories/Categories.vue'
import notfound from '../components/Notfound/notfound.vue'

import App from '../App.vue'
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/', component: ViewRoutes, children: [
                //home {path:'',component:},
                
                { path: '', redirect: '/welcome' },
                {
                    path: 'admin', children: [
                        { path: 'book', component: Books },
                        { path: 'category', component: Category },
                        { path: 'cita', component: Cita }
                    ]
                },
                { path: 'welcome', component: Welcome },
                { path: 'home', component: Home },
                { path: 'categories', component: Categories },
                { path: 'book/:id', component: Detalle_Libro },
                { path: 'perfil', component: Perfil },
                { path: 'login', component: Login },
                { path: 'registro', component: Registro },
                {path:'/:catchAll(.*)',component:notfound}
              
         

            ]
        }
    ]
})

export default router