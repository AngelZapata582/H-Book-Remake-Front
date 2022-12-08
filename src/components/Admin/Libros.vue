<template>
    <div class="container">
        <button @click="edit = false,clearForm()" type="button" id="myModal" class="btn text-light my-2"
            style="background-color: #2B5CBA;" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Agregar
        </button>
        <div v-if="loading" class="d-flex justify-content-center">
            <div class="spinner-border text-primary m-4" role="status">
                <span class="visually-hidden text-light">Loading...</span>
            </div>
        </div>
        <div class="container-fluid text-center">
            <table class="table">
                <thead>
                    <tr class="text-light">
                        <th scope="col">N</th>
                        <th scope="col">Titulo</th>
                        <th scope="col">Categoria</th>
                        <th scope="col">Autor</th>
                        <th scope="col">Editorial</th>
                        <th scope="col">ISBN</th>
                        <th scope="col">Portada</th>
                        <th scope="col">PDF</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="books.length > 0 && !loading" class="text-light" v-for="(book, index) in books"
                        :key="book.id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ book.titulo }}</td>
                        <td>{{ book.categoria }}</td>
                        <td>{{ book.autor }}</td>
                        <td>{{ book.editorial }}</td>
                        <td>{{ book.isbn }}</td>
                        <td>{{ book.imagen }}</td>
                        <td>{{ book.pdf }}</td>
                        <td>
                            <div>
                                <button type="button" class="btn m-1" style="background-color: #33FF00;"
                                    @click="setEditBook(book)" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path
                                            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fill-rule="evenodd"
                                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                    </svg>
                                </button>
                                <button type="button" class="btn m-1" style="background-color: #2B5CBA;" 
                                    @click="deleteBook(book.id)">
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
                    <tr v-if="books.length <= 0 && !loading" class="text-light">
                        <td>No hay Libros</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog border">
            <div class="modal-content">
                <div class="modal-body" style="background-color: #020202;">
                    <form accept-charset="UTF-8" enctype="multipart/form-data" @submit="save">
                        <div class="mb-3 text-light">
                            <label for="titulo" class="form-label">Titulo</label>
                            <input type="text" id="titulo" class="form-control" v-model="book.titulo">
                        </div>
                        <div class="mb-3 text-light">
                            <label class="form-label">Autor</label>
                            <input type="text" class="form-control" v-model="book.autor">
                        </div>
                        <div class="mb-3 text-light">
                            <label class="form-label">Editorial</label>
                            <input type="text" class="form-control" v-model="book.editorial">
                        </div>
                        <div class="mb-3 text-light">
                            <label class="form-label">ISBN</label>
                            <input type="text" class="form-control" v-model="book.isbn">
                        </div>
                        <div class="mb-3 text-light">
                            <label class="form-label">Categoria</label>
                            <select class="form-select" v-model="book.category_id">
                                <option v-for="option in categories" :value="option.id" :key="option">
                                    {{ option.categoria }}
                                </option>
                            </select>
                        </div>
                        <div class="mb-3 text-light">
                            <label class="form-label">Paginas</label>
                            <input type="number" class="form-control" v-model="book.numero_paginas">
                        </div>
                        <div class="mb-3 text-light">
                            <label class="form-label">Edicion</label>
                            <input type="text" class="form-control" v-model="book.edicion">
                        </div>
                        <div class="mb-3 text-light">
                            <label class="form-label">Año de lanzamiento</label>
                            <input type="number" class="form-control" v-model="book.año_lanzamiento">
                        </div>
                        <div class="mb-3 text-light">
                            <label class="form-label">sinopsis</label>
                            <textarea type="textarea" class="form-control" v-model="book.sinopsis"></textarea>
                        </div>
                        <div class="mb-3 text-light">
                            <label class="form-label">Portada</label>
                            <input accept="image/png, image/jpeg" id="imageField" type="file" class="form-control"
                                v-on:change="onImageChange">
                        </div>
                        <div class="mb-3 text-light">
                            <label class="form-label">PDF</label>
                            <input accept="application/pdf" id="pdfField" type="file" class="form-control" v-on:change="onFileChange">
                        </div>
                        <div class="d-grid gap-2">
                            <button type="submit" class="btn text-light"
                                style="background-color: #2B5CBA;">Guardar</button>
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
import url from '../../../enviroment'
import VueCookies from 'vue-cookies';
import Swal from 'sweetalert2';
export default {
    beforeEnter: (to, from, next) => {
        axios.get(url+'check',{headers: {Authorization: "Bearer " + this.token,}})
        .then(r=>{
            return r.data
        })
    },
    mounted() {
        this.getBooks();
        this.getCategories()
    },
    data() {
        return {
            books: [],
            book: {
                id: 0,
                titulo: "",
                autor: "",
                editorial: "",
                isbn: "",
                numero_paginas: null,
                edicion: "",
                año_lanzamiento: "",
                sinopsis: "",
                pdf: null,
                imagen: null,
                category_id: 0
            },
            pdf: false,
            imagen: false,
            categories: [],
            category: "",
            loading: false,
            token: VueCookies.isKey('token') ? VueCookies.get('token') : null,
            edit: false,
            Toast: Swal.mixin({
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
            entity: 'book',
            pdfSended:false,
            imagenSended:false
        }
    },
    methods: {
        clearForm(){
            this.book = {
                id: 0,
                titulo: "",
                autor: "",
                editorial: "",
                isbn: "",
                numero_paginas: null,
                edicion: "",
                año_lanzamiento: "",
                sinopsis: "",
                pdf: null,
                imagen: null,
                category_id: 0
            }
            document.getElementById('imageField').value =''
            document.getElementById('pdfField').value = ''
        },
        async getBooks() {
            this.Toast.fire({
                icon: 'info',
                title: 'Cargando libros.'
            })
            this.loading = true;
            await axios.get(url + this.entity, {
                headers: {
                    Authorization: "Bearer " + this.token,
                }
            }).then(r => {
                this.loading = false;
                this.books = r.data.books
                this.Toast.fire({
                    icon: 'success',
                    title: 'Libros cargados.'
                })
            })
                .catch(err => {
                    this.Toast.fire({
                        icon: 'error',
                        title: 'Error al cargar los libros.'
                    })
                })
        },
        async getCategories() {
            await axios.get(url + 'categories', {
                headers: {
                    Authorization: "Bearer " + this.token,
                }
            }).then(r => {
                this.loading = false;
                this.categories = r.data.categories
            })
                .catch(err => {

                })
        },
        onFileChange(e) {
            this.pdf = e.target.files[0]
            this.pdfSended = true
        },
        onImageChange(e) {
            this.imagen = e.target.files[0]
            this.imagenSended = true
            console.log(e.target.files[0])
        },
        save(e) {
            e.preventDefault();
            let form = new FormData()

            form.append('titulo', this.book.titulo)
            form.append('autor', this.book.autor)
            form.append('category_id', this.book.category_id)
            form.append('editorial', this.book.editorial)
            form.append('edicion', this.book.edicion)
            form.append('numero_paginas', this.book.numero_paginas)
            form.append('sinopsis', this.book.sinopsis)
            form.append('isbn', this.book.isbn)
            form.append('año_lanzamiento', this.book.año_lanzamiento)
            if (this.pdfSended) {
                form.append('pdf', this.pdf, this.pdf.name)
            }
            if (this.imagenSended) {
                form.append('imagen', this.imagen, this.imagen.name)
            }

            if (!this.edit) {
                axios.post(url + this.entity, form, {
                    headers: {
                        Authorization: "Bearer " + this.token,
                    }
                })
                    .then(r => {
                        this.clearForm()
                        this.getBooks()
                    })
                    .catch(e => {
                        console.log(e)
                    })
            }else{
                this.editBook(form)
            }
        },
        setEditBook(book) {
            this.clearForm()
            this.edit = true;
            this.book = book
        },
        editBook(form) {
            // let form = new FormData()

            // form.append('titulo', this.book.titulo)
            // form.append('autor', this.book.autor)
            // form.append('category_id', this.book.category_id)
            // form.append('editorial', this.book.editorial)
            // form.append('edicion', this.book.edicion)
            // form.append('numero_paginas', this.book.numero_paginas)
            // form.append('sinopsis', this.book.sinopsis)
            // form.append('isbn', this.book.isbn)
            // form.append('año_lanzamiento', this.book.año_lanzamiento)
            // form.append('pdf', this.pdf, this.pdf.name)
            // form.append('imagen', this.imagen, this.imagen.name)
            form.append('_method','PUT')
            axios.post(url + this.entity + '/' + this.book.id, form, {
                headers: { Authorization: "Bearer " + this.token }
            })
                .then(r => {
                    this.Toast.fire({
                        icon: 'success',
                        title: 'Se ha modificado el libro.'
                    })
                    this.getBooks()
                })
                .catch(e => {
                    this.Toast.fire({
                        icon: 'error',
                        title: 'Ha ocurrido un error al editar el libros.'
                    })
                    console.log(e)
                })
        },
        deleteBook(id){
            axios.delete(url + this.entity + '/' + id,
                { headers: { Authorization: "Bearer " + this.token } })
                .then(r => {
                    this.loading = false;
                    this.Toast.fire({
                        icon: 'info',
                        title: 'El libro a sido eliminada.'
                    })
                    this.getBooks()
                })
                .catch(e => {
                    this.loading = false;
                    this.Toast.fire({
                        icon: 'error',
                        title: 'Ha ocurrido un error al eliminar el libro.'
                    })
                    console.log(e)
            })
        }
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

.border {
    border-color: #2B5CBA;
}
</style>