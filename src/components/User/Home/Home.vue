<template>
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
import VueCookies from 'vue-cookies';
import axios from 'axios';
import env from '../../../../env';
export default {
    name: 'Home',
    components: {
        BookSlider,
        Quotes
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
        let res = await this.getBooks(1);
        console.log(res)
    },
    methods: {
        getToken: () => VueCookies.get('token'),
        async getBooks(id) {
            await axios.get( this.API_URL + this.entitiy + id + "/books", {
                headers: {
                    'Authorization': `Bearer ${this.getToken()}` 
                }
            }).then( res => res)
        }
    }
}
</script>

<style>

</style>