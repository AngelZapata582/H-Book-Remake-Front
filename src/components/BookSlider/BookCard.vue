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
    data(){
        return{
            urlapi:url,
            imageUrl: '',
        }
    },
    mounted(){
        console.log(`https://larave-h-books-api-production.up.railway.app/api/image/${book.imagen}`)
    },
    beforeCreate() { 
        this.imageUrl = `https://larave-h-books-api-production.up.railway.app/api/image/${book.imagen}`
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
