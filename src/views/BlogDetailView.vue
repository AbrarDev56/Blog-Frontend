<script setup>
    import { useRoute } from 'vue-router';
    import { onMounted, ref } from 'vue'
    import axios from 'axios'

    const title = ref()
    const article = ref()
    const author = ref()
    const thumbnail = ref()
    const url = "http://localhost:1337"
    const route = useRoute();
    onMounted(() => {
        const blog_detail = route.params.blog_detail
        axios.get(`blogs/${blog_detail}?populate=*`)
            .then(response => {
                title.value = response.data.data.attributes.title
                article.value = response.data.data.attributes.article
                author.value = response.data.data.attributes.author.data.attributes.username
                thumbnail.value = response.data.data.attributes.thumbnail.data.attributes.url
                console.log(response.data.data)
                console.log(thumbnail.value)
                document.title = 'Blog | ' + title.value
            })
            .catch(error => {
                console.log(error)
            })
    })
</script>

<template>
    <div class="home mx-auto px-3 mb-5" style="max-width: 1000px;">
        <h1 class="mt-2 text-center">{{ title }}</h1>
        <img :src="url + thumbnail" class="img-fluid mb-2">
        <b class="mt-2 text-capitalize">by {{ author }}</b>
        <div v-html="article"></div>
    </div>
</template>