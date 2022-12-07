<template>
  <nav class="navbar" style="background:#000 " v-if="showing">
    <div class="container-fluid">
      <a class="navbar-brand" href="/home"><b class="text-light">
          <img class="img-fluid logo-icon" src="../../assets/logo/logo.png" />
          H - Books
        </b></a>
      <div class="row mx-auto mx-md-4">
        <div class="col-6 col-md-6">
          <div class="dropdown-center">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              Categorias
            </button>
            <ul class="dropdown-menu">
              <div v-for="category in categories" v-bind:key="category"><li><a class="dropdown-item" href="#">{{category.categoria}}</a></li></div>
            </ul>
          </div>
        </div>

        <div class="col-6 col-md-6">
          <div class="dropdown-center">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              Usuario
            </button>
            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-lg-start">
              <li><a class="dropdown-item" href="#">Perfil</a></li>
              <li><a class="dropdown-item" href="#">Cerrar sesión</a></li>
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
import url from '../../../enviroment.js'
export default {
  mounted(){
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
    getCategories() {
      axios.get(url+this.entity, {
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
<style>
.logo-icon {
  width: 50px;
  height: 50px;
}
</style>