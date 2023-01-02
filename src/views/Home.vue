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
    <div v-for="blog in blogs" v-bind:key="blog.id" class="my-3 mx-auto" style="max-width: 750px;">
        <div class="d-flex border rounded mx-3">
            <div class="flex-shrink-0">
                <RouterLink :to="`${blog.id}`">
                    <img :src="url + blog.attributes.thumbnail.data.attributes.url" class="img-fluid rounded-start" style="max-width: 200px; max-height: 150px;">
                </RouterLink>
            </div>
            <div class="flex-grow-1 ms-3">
                <h1 class="card-title mt-2">
                    <RouterLink :to="`${blog.id}`" class="link-dark text-decoration-none">{{ blog.attributes.title }}</RouterLink>
                </h1>
                <p class="card-title">by {{ blog.attributes.author.data.attributes.username }}</p>
                <p class="card-text"><small class="text-muted">{{ blog.attributes.updatedAt }}</small></p>
                <!-- <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> -->
            </div>
        </div>
    </div>

</template>