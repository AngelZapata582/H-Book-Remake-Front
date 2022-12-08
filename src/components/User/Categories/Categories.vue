<template>
    <h1 class="ps-5 pt-2">{{ CategoryTitle }}</h1>
    <BookSlider 
        :title="firstSection.title" 
        :subtitle="firstSection.subtitle" 
        :books="firstSection.books" />
    <Quotes :coverImage="quote.coverImage" :phrase="quote.phrase" :author="quote.author" />
    <BookSlider 
        :title="secondSection.title" 
        :subtitle="secondSection.subtitle" 
        :books="secondSection.books" />
    <BookSlider 
        :title="thirdSection.title" 
        :subtitle="thirdSection.subtitle" 
        :books="thirdSection.books" />
</template>

<script>
import BookSlider from '../../BookSlider/BookSlider.vue';
import Quotes from '../../Quotes/Quotes.vue';
import VueCookies from 'vue-cookies';
import axios from 'axios';
import env from '../../../../env';
export default {
    name: 'Categories',
    components: {
        BookSlider,
        Quotes
    },
    data() {
        return {
            categories:[
                { id: 1, name: 'Aventura'},
                { id: 2, name: 'Accion' },
                { id: 3, name: 'Terror' },
                { id: 4, name: 'Romance' },
                { id: 5, name: 'Fantasia' },
                { id: 6, name: 'Historia' },
            ],
            entitiy: 'categories/',
            API_URL: env.API_URL,
            CategoryTitle: '',
            idCategory: null,
            firstSection: {
                title: 'Mejores clasicos venididos',
                subtitle: 'Quizá clásicos?...',
                books: []
            },
            secondSection: {
                title: 'Cuentos ilustrativos',
                subtitle: 'Para los niños...',
                books: []
            },
            thirdSection: {
                title: 'Novelas',
                subtitle: 'Todo un drama...',
                books: []
            },
            quote: {
                coverImage: '',
                phrase: '',
                author: '',
            }
        }
    },
    async mounted() {
            this.idCategory = this.$route.params.id
            this.categories.forEach( category => {
            if (category.id == this.$route.params.id) {
                this.CategoryTitle = category.name
                }
            })
            await this.getBooks(this.idCategory)
            await this.getBooks(this.idCategory)
            await this.getBooks(this.idCategory)
            await this.getQuote()
    },
    updated() {
        if (this.idCategory != this.$route.params.id) {
            this.idCategory = this.$route.params.id
            console.log(this.idCategory)
            this.categories.forEach( category => {
                if (category.id == this.$route.params.id) {
                    this.CategoryTitle = category.name
                }
            })
            this.getBooks(this.idCategory)
            this.getBooks(this.idCategory)
            this.getBooks(this.idCategory)
            this.getQuote()
        }
    },
    methods: {
        getToken: () => VueCookies.get('token'),
        async getBooks(id) {
            await axios.get( this.API_URL + this.entitiy + id + "/books", {
                headers: {
                    'Authorization': `Bearer ${this.getToken()}` 
                }
            }).then( res => {
                this.firstSection.books = res.data.message
                this.secondSection.books = res.data.message
                this.thirdSection.books = res.data.message
            })
        },
        async getQuote() {
            await axios.get( this.API_URL + "cita", {
                headers: {
                    'Authorization': `Bearer ${this.getToken()}` 
                }
            }).then( res => {
                let quotes = res.data.citas
                let random = Math.floor(Math.random() * quotes.length)
                let quote = quotes[random]
                this.quote.phrase = quote.cita
                this.firstSection.books.forEach( book => {
                    if (book.id == quote.book_id) {
                        this.quote.coverImage = book.imagen
                        this.quote.author = book.autor
                    }
                })
                this.secondSection.books.forEach( book => {
                    if (book.id == quote.book_id) {
                        this.quote.coverImage = book.imagen
                        this.quote.author = book.autor
                    }
                })
                this.thirdSection.books.forEach( book => {
                    if (book.id == quote.book_id) {
                        this.quote.coverImage = book.imagen
                        this.quote.author = book.autor
                    }
                })
            })
        }
    }
}
</script>

<style scoped>
    h1 {
        text-align: center;
        color: #fff;
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 1rem;
    }
</style>