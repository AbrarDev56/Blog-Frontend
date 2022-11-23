<script setup>
    import { RouterLink } from 'vue-router'
    import { onMounted, ref } from 'vue'
    import axios from 'axios'

    const blogs = ref([])
    const url = "http://localhost:1337"
    onMounted(() => {
        axios.get('blogs?populate=*')
            .then(response => {
                blogs.value = (response.data.data)
                console.log(response.data.data)
            })
            .catch(error => {
                console.log(error)
            })
    })
</script>

<template>
    <div v-for="blog in blogs" v-bind:key="blog.id" class="mx-3">
        <div class="card mb-3 mt-3 mx-auto" style="max-width: 1000px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img :src="url + blog.attributes.thumbnail.data.attributes.url" class="img-fluid">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">{{ blog.attributes.title }}</h5>
                        <div v-html="blog.attributes.article" class="card-text text-truncate" style="height: 75px"></div>
                        <RouterLink :to="`${blog.id}`" class="stretched-link"></RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>