<template>
    <div class="container-fluid" style="padding-top: 5%;padding-bottom: 5%;" >
        <div class="row align-items-center">
            <div class="row pt-5 align-items-center"> <!-- align-items-center -->
                <div class="col-lg-2 text-center ">
                    <img v-bind:src="`../../../images/user.png`" class="" width="150">
                </div>
                <div class="col-lg-3">
                    <h2 style="color: white;">{{user.name}}</h2>
                    <span style="color: grey;">{{user.email}}</span>
                </div>
            </div>
            <div class="row pt-4 pb-5">
                <div class="col-lg-3">
                    <a type="button" class="btn btn-primary btn-sm rounded-pill px-5" data-bs-toggle="modal" data-bs-target="#exampleModal">Actualizar mis datos</a>
                </div>
            </div>
        </div>
    </div>
    <br>

    <!-- spinner -->
    <div v-show="isLoading" class="spinner-border text-dark text-center" style="width: 3rem; height: 3rem;" role="status">
    </div>

    <!-- Libros guardados -->
<div v-show="!isLoading" style="width:100%;">
    <h2 class="letter-page text-start ms-4 fs-3 text-white">Libros guardados</h2>
    <div
    v-show="!isLoading"
    class="bloque"
    v-if="libros.length > 0"
    style="width: 100%; display: inline-block; margin: 1rem;"
    >
    <div class="m-2 bloque" v-for="(cat, index) in libros" :key="cat">
        <div class="card-book" style="float: left">
        <img v-bind:src="`http://127.0.0.1:8000/api/image/${cat.imagen}`" class="img-card" @click="showBook(cat.book_id)"/>
        <div class="row align-items-start mt-2">
            <div class="col text-start">
                <b class="letter-page book col-md-9 text-white" >{{ cat.titulo }}</b>
            </div>
            <div class="col text-end">
                <button type="button" class="btn btn-primary" style="border-radius: 50%;"  @click="deleteBook(cat.book_id)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                </button>
            </div>
        </div>
        </div>
    </div>
    </div>
    <div v-show="!isLoading" v-else class="text-center pb-5 pt-5">
        <h3 class="title-main m-4">No tienes libros guardados</h3>
        
    </div>
</div>

<!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Acualiza tu informacion</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <form method="PUT">
            <!--<input type="file" class="form-control m-2"/>-->
            <input type="text" v-model='request.name' class="form-control m-2" placeholder="Ingresa tu nombre"/>
            <input type="text" v-model='request.email' class="form-control m-2" placeholder="Ingresa tu email"/>
            </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-primary" @click="updateUser()">Actualizar</button>
        </div>
        </div>
    </div>
</div>
</template>


<script>
import Swal from 'sweetalert2'
import url from '../../../enviroment.js'
import axios from "axios";
import VueCookies from 'vue-cookies';
export default {
data() {
    return {
        isLoading:false,
        token:VueCookies.get('token'),
        libros: [],
        user:{
            user:"",
            email:""
        },
        request:{
            user:"",
            email:""
        },
        };
    },
    mounted() {
        this.getInfo()
        this.getBooks()
    },
    methods: {
        getInfo(){
            this.isLoading = true
            axios.get(url+"user",
            {
                headers: {
                Authorization: 'Bearer ' + this.token
                }
            })
            .then((response) => {
                this.user.name = response.data.user.name;
                this.user.email = response.data.user.email;
                this.request.name = this.user.name;
                this.request.email = this.user.email;
            })
            .catch((error) => console.log(error));
        },
        updateUser(){
            axios
            .put(url+"user",{
                name:this.request.name,
                email: this.request.email
            },{
            headers:{
                Authorization: 'Bearer ' + this.token,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
            }
            })
            .then((response) => {
                this.user.name = response.data.user.name;
                this.user.email = response.data.user.email;
            })
            .catch((error) => console.log(error));
        },
        getBooks() {
        this.isLoading = true
        axios.get(url+"book/list",{
            headers:{
                Authorization: 'Bearer ' + this.token
            }
            })
            .then((response) => {
            this.libros = response.data.libros;
            console.log(response.data.libros);
            })
            .catch((error) => console.log(error),this.isLoading = false);
        },
        showBook(id) {
            this.$router.push('/book/'+id);
            //window.location.href = "http://localhost:5173/book/"+id;
        },
        deleteBook(id){
            axios.delete(url+"book/delete/"+id,{
            headers:{
                Authorization: 'Bearer ' + this.token,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
            }
            })
            .then((response) => {
                if(response.data.status){
                    Swal.fire(
                        'Eliminado correctamente',
                        '',
                        'success'
                    )
                    this.getBooks();
                }else{
                    Swal.fire(
                        'Algo salio mal',
                        '',
                        'error'
                    )
                }
                
            })
            .catch((error)=> {
                console.log(error);
                Swal.fire(
                        'Algo salio mal',
                        '',
                        'error'
                    )
            });
        },
    }
}
</script>


<style>
.vertical-center {
  min-height: 100%;  /* Fallback for browsers do NOT support vh unit */
  min-height: 100vh; /* These two lines are counted as one :-)       */

    display: flex;
    align-items: center;
}

@media (max-width: 500px) {
  .bloque {
    display: none;
  }
  .bloque-xs {
    width: 100%;
    display: inline;
  }
}
@media (min-width: 500px) {
  .bloque-xs-div {
    display: none;
  }
}
.card-book {
  text-align: left;
  width: 200px;
  height: 300px;
  margin-top:0rem;
  margin: 2rem;
}
.img-card {
  image-rendering: optimizeSpeed;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.btn-rounded-css {border-radius: 50%;}

</style>