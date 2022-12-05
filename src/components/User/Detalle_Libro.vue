<template  style="overflow-x: hidden;">
    <!-- navbar -->
    <br>
    <div class="container" style="color: white;">
        <div class="row text-center">

            <h2>{{libro.titulo}}</h2>
        </div><br>
        <div class="row text-start">
            <div class="col-lg-3 ">
                <img v-bind:src="`http://127.0.0.1:8000/api/image/${libro.imagen}`" class="w-100" >
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
                <a v-bind:href="'http://127.0.0.1:8000/api/file/'+libro.pdf" type="button" class="btn btn-primary" download>Descargar PDF</a>
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
        <div class="row">
            <!-- Carrusel de libros similares -->
            <br>
        </div>

        <div class="row text-start">
            <span style="color: grey;">Un amor para sentir y desear</span>
            <h2>Romance erotico</h2>
        </div>
        <div class="row text-center">
            <!-- Carrusel e libros recomedados -->
        </div>

    </div>
</template>

<script>
import VueCookies from 'vue-cookies'
import axios from 'axios';
export default {
    data(){
        return {
            libro:{},
            user:{}
        }
    },
    mounted(){
        this.getLibro(this.$route.params.id)
    },
    methods:{
        getToken(){
            /* return VueCookies.get("token")  */
            return "2|j3gyYsAjQ0dze5HCNulIE88fiTfSlSKft57cEGf3";
        },
        async getLibro(id){
            await axios.get('http://127.0.0.1:8000/api/book/'+id,{
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
            await axios.get('http://127.0.0.1:8000/api/check',{
                headers:{
                    'Authorization': `Bearer ${this.getToken()}` 
                },
            }).then(response=>{
                if(response.data.status){
                    this.user = response.data.user
                }else{
                    alert("Algo salio mal con su session")
                }
            }).catch(error=>{
                console.log(error)
                alert("Algo salio mal con su session")
            })
        },
        async guardarLibro(){
            await axios.post('http://127.0.0.1:8000/api/book/save',{
                book_id:this.libro.id,
            },{
                headers:{
                    'Authorization': `Bearer ${this.getToken()}` 
                },
            }).then(response=>{
                if(response.data.status){
                    alert(response.data.message)
                }else{
                    alert("Algo salio mal")
                }
            }).catch(error=>{
                console.log(error)
                alert("Algo salio mal")
            })
        },
    }
}
</script>
<style>

</style>