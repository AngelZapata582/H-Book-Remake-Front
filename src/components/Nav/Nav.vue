<template>
  <nav class="navbar" style="background:#000 ">
    <div class="container-fluid">
      <a class="navbar-brand" href="/home"><b class="text-light">
          <img class="img-fluid logo-icon" src="../../assets/logo/logo.png" />
          H - Books
        </b></a>
      <div class="row mx-auto mx-md-4"  v-if="showing">
        <div class="col-6 col-md-6">
          <div class="dropdown-center">
            <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              Categorias
            </button>
            <ul class="dropdown-menu">
              <div v-for="category in categories" v-bind:key="category">
                <li><a class="dropdown-item">
                  <router-link class="text-decoration-none text-dark" 
                  :to="{name:'categories',params:{id:category.id}}">{{category.categoria}}</router-link>
                </a></li>
              </div>
            </ul>
          </div>
        </div>

        <div class="col-6 col-md-6">
          <div class="dropdown-center">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
              aria-expanded="false" style="background-color: #2B5CBA;border: none;">
              Usuario
            </button>
            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-lg-start">
              <li><a class="dropdown-item" href="#">Perfil</a></li>
              <li><a class="dropdown-item" v-if="admin">
                <router-link :to="{name:'menuAdmin'}" class="text-decoration-none text-dark">Administrar</router-link>
              </a></li>
              <li><a class="dropdown-item" href="#" v-on:click="logout()">Cerrar sesión</a></li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  </nav>
</template>
<script>
import axios from 'axios';
import VueCookies from 'vue-cookies';
import env from '../../../env'
export default {
  mounted(){
    this.checkAdmin()
    this.showing = VueCookies.isKey('token') ? true : false;
    if(this.showing){
      this.getCategories()
    }
  },
  data() {
    return {
      showing:false,
      categories: [],
      token: VueCookies.isKey('token') ? VueCookies.get('token') : null,
      isLogin: VueCookies.isKey('token'),
      entity: 'categories'
    }
  },
  methods: {
    logout(){
      VueCookies.remove('token')
      //axios.get(url+'logout')
      //.then(r=>{console.log(r)})
      window.location.reload()
    },
    checkAdmin(){
      axios.get(url+'check',{headers: {Authorization: "Bearer " + this.token}}).then(r=>{this.admin = r.data})
    },
    getCategories() {
      axios.get(this.API_URL+this.entity, {
        headers: {
          Authorization: "Bearer " + this.token,
        }
      }).
        then(r => {
          this.categories = r.data.categories
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>
<style scoped>
.logo-icon {
  width: 50px;
  height: 50px;
}
li {
  cursor: pointer;
}
</style>