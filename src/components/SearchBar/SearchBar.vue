<template>
    <div class="search-bar-container">
        <div class="">
            <div class="d-flex">
                <input
                v-model="search"
                placeholder="Buscar un libro..."
                @input="onSearch"
                @change="onSearch"
                clearable
                size="mini"
                style="width: 100%"
                >
                <button @click="onSearch">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                </button>
                
            </div>
            <div class="search-results-container container-results mt-3" v-if="(results.length >= 1 ) && search != ''">
                <div class="d-flex flex-column">
                    <div v-for="result in results" :key="result.id">
                        <router-link :to="('/book/' + result.id)"  class="d-flex align-items-center">
                            <img v-bind:src="result.imagen" class="img-cover-book">
                            <p class="ms-3">{{ result.titulo }}</p>
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="search-results-container container-results mt-3" v-else-if="(results.length <= 1 ) && search != ''">
                <div class="d-flex flex-column align-items-center justify-content-center ms-5 mt-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-emoji-frown-fill" viewBox="0 0 16 16">
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm-2.715 5.933a.5.5 0 0 1-.183-.683A4.498 4.498 0 0 1 8 9.5a4.5 4.5 0 0 1 3.898 2.25.5.5 0 0 1-.866.5A3.498 3.498 0 0 0 8 10.5a3.498 3.498 0 0 0-3.032 1.75.5.5 0 0 1-.683.183zM10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8z"/>
                    </svg>
                    <p>No se encontro un libro similar...</p>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import VueCookies from 'vue-cookies';
import axios from 'axios';
import env from '/env';
export default {
    name: 'SearchBar',
    data() {
        return {
            search: '',
            results: [],
            API_URL: env.API_URL,
        }
    },
    methods: {
        getToken: () => VueCookies.get('token'),
        async onSearch() {
            await axios.get( this.API_URL + `book/search/${this.search}`, {
                headers: {
                    'Authorization': `Bearer ${this.getToken()}` 
                }
            }).then( res => {
                this.results = res.data.book;
            })
        }
    }
}
</script>

<style scoped>
    .container-results {
        background-color: white;
        border-radius: 10px;
        padding: 10px;
        box-shadow: 0 0 10px 0 rgba(0,0,0,0.2);
    }
    .search-bar-container {
        padding-right: 70px;
        display: flex;
        align-items: center;
        justify-content: end;
    }
    .search-results-container {
        position: absolute;
        width: 300px;
        z-index: 1;
        padding-right: 70px;
        display: flex;
        align-items: center;
        justify-content: start;
    }
    .search-bar-container input {
        border: none;
        border-radius: 20px;
        padding-inline: 30px;
        margin-right: 10px;
    }
    .search-bar-container button {
        border: none;
        border-radius: 100%;
        width: 47px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .search-bar-container input:focus {
        outline: none;
    }
    @media (max-width: 768px) {
        .search-bar-container {
            padding-right: 0;
            justify-content: center;
        }
    }
    .img-cover-book{
        margin-block: 10px;
        border-radius: 5px;
        width: 50px;
        aspect-ratio: 9/16;
        object-fit: cover;
    }
    a {
        text-decoration: none;
        color: black;
    }
    a:hover {
        text-decoration: none;
        color: black;
    }
</style>