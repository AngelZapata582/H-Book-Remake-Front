<template>
    <div class="container">
        <button type="button" id="myModal" class="btn text-light my-2" style="background-color: #2B5CBA;"
            data-bs-toggle="modal" data-bs-target="#exampleModal" @click="edit = false">
            Agregar
        </button>
        <div class="container-fluid text-center">
            <table class="table">
                <thead>
                    <tr class="text-light">
                        <th scope="col">N</th>
                        <th scope="col">Cita</th>
                        <th scope="col">Libro</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="text-light" v-for="(cita, index) in citas" :key="cita.id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ cita.cita }}</td>
                        <td>{{ cita.titulo }}</td>
                        <td>
                            <div>
                                <button type="button" class="btn m-1" style="background-color: #33FF00;"
                                    @click="setEditCita(cita)" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path
                                            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fill-rule="evenodd"
                                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                    </svg>
                                </button>
                                <button type="button" class="btn m-1" style="background-color: #2B5CBA;" 
                                @click="deleteCategory(cita.id)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white"
                                        class="bi bi-trash" viewBox="0 0 16 16">
                                        <path
                                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                        <path fill-rule="evenodd"
                                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                    </svg>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body" style="background-color: #020202;">
                    <form @submit="save">
                        <div class="mb-3 text-light">
                            <label for="titulo" class="form-label">Cita</label>
                            <textarea v-model="cita.cita" id="titulo" class="form-control"></textarea>
                        </div>
                        <div class="mb-3 text-light">
                            <input class="form-control" placeholder="Buscar Libro" v-model="query" />
                            <select class="form-select my-2" size="3" aria-label="size 3 select example"
                                v-model="cita.book_id">
                                <option :value="book.id" v-for="(book, index) in computedList" :key="index"
                                    :data-index="index">
                                    {{ book.titulo }}
                                </option>
                            </select>

                        </div>
                        <div class="d-grid gap-2">
                            <button type="submit" class="btn text-light" style="background-color: #2B5CBA;">Guardar</button>
                            <button type="button" class="btn btn-danger text-light" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios';
import url from '../../../enviroment.js'
import VueCookies from 'vue-cookies';
import Swal from 'sweetalert2';
export default {
    computed: {
        computedList() {
            return this.books.filter((item) => item.titulo.toLowerCase().includes(this.query));
        }
    },
    mounted(){
        this.getBooks()
        this.getCitas()
    },
    data() {
        return {
            book:0,
            citas: [],
            cita: {
                cita:'',
                book_id:0
            },
            query: '',
            books: [],
            edit:false,
            entity:'cita',
            Toast:Swal.mixin({
                toast: true,
                position: 'top-right',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            }),
            token: VueCookies.isKey('token') ? VueCookies.get('token') : null
        }
    },
    methods: {
        getBooks(){
            axios.get(url+'book',{headers:{Authorization: "Bearer " + this.token}})
            .then(r=>{
                this.books = r.data.books
            })
        },
        getCitas(){
            this.Toast.fire({
                icon: 'info',
                title: 'Cargando las citas.'
            })
            axios.get(url+'cita',{headers:{Authorization: "Bearer " + this.token}})
            .then(r=>{
                this.Toast.fire({
                    icon: 'success',
                    title: 'Citas cargadas.'
                })
                this.citas = r.data.citas
            })
            .catch(e=>{
                this.Toast.fire({
                    icon: 'error',
                    title: 'Ha ocurrido un error al cargar las citas.'
                })
            })
        },
        save(e){
            console.log(this.citas)
            e.preventDefault();
            let form = new FormData()
            
            form.append('cita',this.cita.cita)
            form.append('book_id',this.cita.book_id)
            
            if(!this.edit){
                axios.post(url+this.entity,form,
                { headers: { Authorization: "Bearer " + this.token }, })
                .then(res=>{
                    this.Toast.fire({
                        icon: 'success',
                        title: 'Categoria guardada.'
                    })
                    this.loading = false;
                    this.getCitas()
                    this.clearForm()
                })
                .catch(e => {
                    this.Toast.fire({
                        icon: 'error',
                        title: 'Ha ocurrido un error al guardar la categoria.'
                    })
                    this.loading = false;
                    console.log(e)
                })
            }
            if(this.edit){
                axios.put(url+this.entity+'/'+this.cita.id,this.cita,
                { headers: { Authorization: "Bearer " + this.token }, })
                .then(res=>{
                    this.Toast.fire({
                        icon: 'success',
                        title: 'Categoria guardada.'
                    })
                    this.loading = false;
                    this.getCitas()
                })
                .catch(e => {
                    this.Toast.fire({
                        icon: 'error',
                        title: 'Ha ocurrido un error al guardar la categoria.'
                    })
                    this.loading = false;
                    console.log(e)
                })
            }

        },
        setEditCita(cita){
            this.clearForm()
            this.edit = true
            this.cita = cita 
        },
        clearForm(){
            this.cita = {}
        },
        deleteCategory(id) {
            console.log(id)
            axios.delete(url + this.entity + '/' + id,
                { headers: { Authorization: "Bearer " + this.token } })
                .then(r => {
                    this.loading = false;
                    this.Toast.fire({
                        icon: 'info',
                        title: 'La cita a sido eliminada.'
                    })
                    this.getCitas()
                })
                .catch(e => {
                    this.loading = false;
                    this.Toast.fire({
                        icon: 'error',
                        title: 'Ha ocurrido un error al eliminar la cita.'
                    })
                    console.log(e)
            })
        },
    }
}
</script>
<style>
.mybutton {
    border: none;
    padding: .5rem;
    border-radius: 50%;
    outline: none;
}

.mybutton:hover {
    border: none;
    outline: none;
    cursor: pointer;
}
</style>