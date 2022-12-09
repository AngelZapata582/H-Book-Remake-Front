<template>
    <router-link :to="('/book/' + book.id)">
        <img v-bind:src="imageUrl" alt="Book cover" />
        <p>{{ book.titulo }}</p>
        <p>
            <small>{{ book.autor }}</small>
        </p>
    </router-link>
</template>

<script>
import url from '../../../enviroment.js'
export default {
    name: 'BookCard',
    props: {
        book: {
            type: Object,
            default: () => ({
                id: null,
                titulo: '',
                imagen: '',
                autor: '',
            }),
        },
    },
    mounted(){
        console.log(this.book)
        console.log(`${this.urlapi}image/${book.imagen}`)
    },
    data(){
        return{
            urlapi:url,
            imageUrl: '',
        }
    },
    beforeCreate() { 
        this.imageUrl = `${this.urlapi}image/${this.book.imagen}`
        console.log(this.imageUrl)
    }
    
}
</script>

<style scoped> 
    div {
        width: 200px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    img {
        width: 100%;
        border-radius: 10px;
        aspect-ratio: 9/16;
        object-fit: cover;
    }
    div p {
        color: #fff;
        font-weight: 600;
        margin: 0;
        text-align: start;
    }
    a {
        text-decoration: none;
        color: #fff;
    }
    a:hover {
        text-decoration: none;
    }
</style>
