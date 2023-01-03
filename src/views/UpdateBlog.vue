<script setup>
    import { useRoute } from 'vue-router';
    import { onMounted, ref } from 'vue'
    import axios from 'axios'
    import { useAuthStore } from "@/stores/auth"

    const authStore = useAuthStore();

    const id = ref('')
    const title = ref('')
    const article = ref('')
    const author = ref('')
    const thumbnail = ref('')
    const url = "http://localhost:1337"
    const route = useRoute();
    onMounted(() => {
        const blog_post = route.params.blog_post
        axios.get(`blogs/${blog_post}?populate=*`)
            .then(response => {
                id.value = response.data.data.id
                title.value = response.data.data.attributes.title
                article.value = response.data.data.attributes.article
                author.value = response.data.data.attributes.author.data.attributes.username
                thumbnail.value = response.data.data.attributes.thumbnail.data.attributes.url
                console.log(response.data.data)
                document.title = 'Blog | ' + title.value
            })
            .catch(error => {
                console.log(error)
            })
    })

    const selectfile = ref('')
    const image_id = ref('')

    function onFileUpload(event) {
        selectfile.value = event.target.files[0];
    }

    // function updateBlog(blog_id) {
    //     axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.token}`;
    //     var formData = new FormData();
    //     formData.append("files", selectfile.value);
    //     axios.post('upload/', formData)
    //     .then(response => {
    //         image_id.value = response.data[0].id
    //         console.log(image_id.value)


    //         axios.put(`blogs/${blog_id}`, {
    //             data: {
    //                 title: title.value,
    //                 article: article.value,
    //                 thumbnail: {
    //                     id: image_id.value
    //                 }
    //             }
    //         })
    //         .then(response => {
    //             title.value = ''
    //             article.value = ''
    //             blogs.value.push(response.data.data)
    //             console.log(response)
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })
    //         window.alert("Blog Updated");
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     })
    // }

    function updateBlog(blog_id) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.token}`;
        axios.put(`blogs/${blog_id}`, {
            data: {
                title: title.value,
                article: article.value
            }
        })
            .then(response => {
                window.alert("Blog Updated");
                console.log(response.data.data)
            })
            .catch(error => {
                console.log(error)
            })
    }
    function deleteBlog(blog_id) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.token}`;
        axios.delete(`blogs/${blog_id}?populate=*`)
            .then(response => {
                console.log(response.data.data)
                console.log(response.data.data.attributes.thumbnail.data.id)
                const upload_id = response.data.data.attributes.thumbnail.data.id
                axios.delete(`upload/files/${upload_id}`)
                    .then(response => {
                        location.replace('/create_blog')
                        console.log(response)
                    })
                    .catch(error => {
                        console.log(error)
                    })
            })
            .catch(error => {
                console.log(error)
            })
    }
</script>

<template>
    <div class="mx-auto mx-3 mt-3 border rounded p-4" style="max-width: 1000px;">
        <h2 class="text-center">Update {{ title }}</h2>

        <form v-on:submit.prevent="updateBlog(id)">
            <div class="form-floating mb-3">
                <input v-model.lazy="title" type="text" class="form-control" id="floatingInput">
                <label for="floatingInput">Title</label>
            </div>
            <div class="mb-3">
                <label for="formFile" class="form-label">Thumbnail</label>
                <input @change="onFileUpload" class="form-control" type="file" id="formFile">
            </div>
            <div class="form-floating">
                <textarea v-model.lazy="article" class="form-control" id="floatingTextarea2" style="height: 300px"></textarea>
                <label for="floatingTextarea2">Article</label>
            </div>
            <button class="btn btn-outline-primary mt-2">Update</button>
        </form>
    </div>

    <div class="d-flex justify-content-end">
        <button class="btn btn-outline-danger mt-2 me-3" data-bs-toggle="modal" data-bs-target="#exampleModal">Delete</button>
    </div>

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Blog Deletion </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Are you sure you want to delete?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                    <button @click="deleteBlog(id)" type="button" class="btn btn-danger">Yes</button>
                </div>
            </div>
        </div>
    </div>

    <div class="home mx-auto px-3" style="max-width: 1000px;">
        <h1 class="mt-2 text-center">{{ title }}</h1>
        <img :src="url + thumbnail" class="d-block img-fluid mb-2 mx-auto">
        <div class="mb-3">
            <b class="mt-2 text-capitalize">by {{ author }}</b>
        </div>
        <div v-html="article"></div>
    </div>
</template>