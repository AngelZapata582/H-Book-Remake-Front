<template>
    <Search-bar />
    <BookSlider 
        :title="firstSection.title" 
        :subtitle="firstSection.subtitle" 
        :books="firstSection.books" />
    <BookSlider 
        :title="secondSection.title" 
        :subtitle="secondSection.subtitle" 
        :books="secondSection.books" />
    <BookSlider 
        :title="thirdSection.title" 
        :subtitle="thirdSection.subtitle" 
        :books="thirdSection.books" />
    <Quotes :coverImage="quote.coverImage" :phrase="quote.phrase" :author="quote.author" />
</template>

<script>
import BookSlider from '../../BookSlider/BookSlider.vue';
import Quotes from '../../Quotes/Quotes.vue';
import SearchBar from '../../SearchBar/SearchBar.vue';
import VueCookies from 'vue-cookies';
import axios from 'axios';
import env from '../../../../env';
export default {
    name: 'Home',
    components: {
        BookSlider,
        Quotes,
        SearchBar
    },
    data() {
        return {
            API_URL: env.API_URL,
            entitiy: 'categories/',
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
                title: 'Para los enamorados',
                subtitle: 'Una amor que te consume...',
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
        await this.getBooks(1)
        await this.getBooks(2)
        await this.getBooks(3)
        await this.getQuote()
    },
    methods: {
        getToken: () => VueCookies.get('token'),
        async getBooks(id) {
            await axios.get( this.API_URL + this.entitiy + id + "/books", {
                headers: {
                    'Authorization': `Bearer ${this.getToken()}` 
                }
            }).then( res => {
                if (id == 1) {
                    this.firstSection.books = res.data.message
                }
                if (id == 2) {
                    this.secondSection.books = res.data.message
                }
                if (id == 3) {
                    this.thirdSection.books = res.data.message
                }
            })
        },
        async getQuote() {
            await axios.get( this.API_URL + "cita/random", {
                headers: {
                    'Authorization': `Bearer ${this.getToken()}` 
                }
            }).then( res => {
                console.log(res)
                let quotes = res.data.citas[0]
                this.quote.phrase = quotes.cita
                this.quote.coverImage = quotes.imagen
                this.quote.author = quotes.autor
                // this.firstSection.books.forEach( book => {
                //     if (book.id == quote.book_id) {
                //         this.quote.coverImage = book.imagen
                //         this.quote.author = book.autor
                //     }
                // })
                // this.secondSection.books.forEach( book => {
                //     if (book.id == quote.book_id) {
                //         this.quote.coverImage = book.imagen
                //         this.quote.author = book.autor
                //     }
                // })
                // this.thirdSection.books.forEach( book => {
                //     if (book.id == quote.book_id) {
                //         this.quote.coverImage = book.imagen
                //         this.quote.author = book.autor
                //     }
                // })
            })
        }
    }
}
</script>
