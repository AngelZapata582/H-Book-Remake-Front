<template  style="overflow-x: hidden;">
    <!-- navbar -->
    <br>
    <div class="container" style="color: white;">
        <div class="row text-center">

            <h2>{{libro.titulo}}</h2>
        </div><br>
        <div class="row text-start">
            <div class="col-lg-3 ">
                <img v-bind:src="`${urlapi}image/${libro.imagen}`" class="w-100" >
            </div>
            <div class="col-lg-9">
                <div class="row">
                    <b>Sinopsis</b> <br>
                    <p>{{libro.sinopsis}}</p>
                </div>
                <div class="row">
                    <b>Informacion adicional</b> 
                    
                    <div class="col">
                        <p>Autor: {{libro.autor}}</p>
                    </div>
                    <div class="col">
                        <p>ISBN: {{libro.isbn}}</p>
                    </div>
                    <div class="col">
                        <p>Edicion: {{libro.edicion}}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <p>Editorial: {{libro.editorial}}</p>
                    </div>
                    <div class="col">
                        <p>Numero de Paginas: {{libro.numero_paginas}}</p>
                    </div>
                    <div class="col">
                        <p>Año: {{libro.año_lanzamiento}}</p>
                    </div>
                </div>
            </div>
        </div>

        <br>

        <div class="row">
            <div class="col-lg-3 d-grid gap-2 p-2">
                <a v-bind:href="urlapi+'file/'+libro.pdf" type="button" class="btn btn-primary" download>Descargar PDF</a>
            </div>

            <div class="col-lg-3 d-grid gap-2 p-2">
                <button type="button" @click="guardarLibro()" class="btn btn-primary text-white">Guardar Libro</button>
            </div>
        </div>


        <br><br><br>

        

        <!-- Recomendaiones -->
        <div class="row text-start">
            <h2>Similares</h2>
        </div>

    <!-- spinner -->
    <div v-show="isLoading" class="spinner-border text-dark text-center" style="width: 3rem; height: 3rem;" role="status">
    </div>


        <div class="row">
                <!-- Libros guardados -->
            <div v-show="!isLoading" style="width:100%;">
                
                <div
                v-show="!isLoading"
                class="bloque"
                v-if="libros.length > 0"
                style="width: 100%; display: inline-block; margin: 1rem;"
                >
                <div class="m-2 bloque" v-for="(cat, index) in libros" :key="cat">
                    <div class="card-book" style="float: left">
                    <img v-bind:src="`${urlapi}image/${cat.imagen}`" class="img-card" @click="showBook(cat.id)"/>
                    <div class="row align-items-start mt-2">
                        <div class="col text-start">
                            <b class="letter-page book col-md-9 text-white" >{{ cat.titulo }}</b>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div v-show="!isLoading" v-else class="text-center pb-5 pt-5">
                    <h3 class="title-main m-4">No tienes hay libros similares</h3>
                </div>
            </div>
        <br>
        </div>


    </div>
</template>

<script>
import url from '../../../enviroment.js'
import Swal from 'sweetalert2'
import VueCookies from 'vue-cookies'
import axios from 'axios';
export default {
    data(){
        return {
            isLoading:false,
            libro:{},
            user:{},
            libros:[],
            urlapi:url
        }
    },
    async mounted(){
        
        await this.getLibro(this.$route.params.id)
        this.getBooksByCategory()
    },
    methods:{
        getToken(){
            return VueCookies.get("token") 
        },
        async getLibro(id){
            await axios.get(url+'book/'+id,{
                headers:{
                    'Authorization': `Bearer ${this.getToken()}` 
                },
            }).then(response=>{
                this.libro = response.data.libro;
            }).catch(error=>{
                console.log(error)
                this.libros = {}
            })
        },
        async check(){
            await axios.get(url+'check',{
                headers:{
                    'Authorization': `Bearer ${this.getToken()}` 
                },
            }).then(response=>{
                if(response.data.status){
                    this.user = response.data.user
                }else{
                    Swal.fire(
                        'Porfavor vuelve a iniciar sesion',
                        '',
                        'warning'
                    )
                    this.$router.push('/login')
                }
            }).catch(error=>{
                console.log(error)
                Swal.fire(
                        'Porfavor vuelve a iniciar sesion',
                        '',
                        'warning'
                    )
                    this.$router.push('/login')
            })
        },
        async guardarLibro(){
            await axios.post(url+'book/save',{
                book_id:this.libro.id,
            },{
                headers:{
                    'Authorization': `Bearer ${this.getToken()}` 
                },
            }).then(response=>{
                if(response.data.status){
                    Swal.fire(
                        'Guardado correctamente',
                        '',
                        'success'
                    )
                }else{
                    Swal.fire(
                        'Algo salio mal',
                        '',
                        'error'
                    )
                }
            }).catch(error=>{
                console.log(error)
                Swal.fire(
                        'Algo salio mal',
                        '',
                        'error'
                    )
            })
        },
        getBooksByCategory() {
        this.isLoading = true
        axios.get(url+"categories/"+this.libro.category_id+"/books",{
            headers:{
                'Authorization': `Bearer ${this.getToken()}` 
            }
            })
            .then((response) => {

            this.libros = response.data.message;
            for (let index = 0; index < this.libros.length; index++) {
                if(this.libros[index]['id'] == this.$route.params.id){
                    this.libros.splice(index,1);
                }
            }
            shuffleArray(this.libros);
            console.log(response.data.message);
            console.log(this.libros);
            })
            .catch((error) => console.log(error),this.isLoading = false);
        },
        async showBook(id) {
            
            await this.$router.push('/book/'+id);
            this.$router.go(this.$router.currentRoute)
            //window.location.href = "http://localhost:5173/book/"+id;
        },
    }
}

function shuffleArray(inputArray){
    inputArray.sort(()=> Math.random() - 0.5);
}
</script>
<style>

</style>