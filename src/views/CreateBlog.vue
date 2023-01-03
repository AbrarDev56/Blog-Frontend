<script setup>
    import { onMounted, ref } from 'vue'
    import axios from 'axios'
    import { RouterLink } from 'vue-router'
    import { useAuthStore } from "@/stores/auth"

    const authStore = useAuthStore();

    const url = "http://localhost:1337"
    const blogs = ref([])
    onMounted(() => {
        axios.get('users/me', {
            headers: {
                'Authorization': `Bearer ${authStore.token}`
            }
        })
            .then(response => {
                profile_id.value = response.data.id
            })
            .catch(error => {
                console.log(error)
            })

        axios.get('usergetposts?populate=*', {
            headers: {
                Authorization: `Bearer ${authStore.token}`
            }
        })
            .then(response => {
                blogs.value = (response.data)
                console.log(response.data)

            })
            .catch(error => {
                console.log(error)
            })
    })

    const title = ref('')
    const article = ref('')
    const profile_id = ref('')
    const selectfile = ref('')
    const image_id = ref('')

    function onFileUpload(event) {
        selectfile.value = event.target.files[0];
    }

    function addBlog() {
        var formData = new FormData();
        formData.append("files", selectfile.value);
        axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.token}`;
        axios.post('upload/', formData)
            .then(response => {
                image_id.value = response.data[0].id
                console.log(image_id.value)

                axios.post('blogs?populate=*', {
                    data: {
                        title: title.value,
                        article: article.value,
                        author: {
                            id: profile_id.value
                        },
                        thumbnail: {
                            id: image_id.value
                        }
                    }
                })
                    .then(response => {
                        title.value = ''
                        article.value = ''
                        location.reload()
                        // blogs.value.push(response.data)
                        console.log(response.data.data)
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
        <form v-on:submit.prevent="addBlog" enctype="multipart/form-data">
            <div class="form-floating mb-3">
                <input v-model="title" type="text" class="form-control" id="floatingInput">
                <label for="floatingInput">Title</label>
            </div>
            <div class="mb-3">
                <label for="formFile" class="form-label">Thumbnail</label>
                <input @change="onFileUpload" class="form-control" type="file" id="formFile">
            </div>
            <div class="form-floating">
                <textarea v-model="article" class="form-control" id="floatingTextarea2" style="height: 200px"></textarea>
                <label for="floatingTextarea2">Article</label>
            </div>
            <button class="btn btn-outline-primary mt-2">Submit</button>
        </form>
    </div>

    <div v-for="blog in blogs" v-bind:key="blog.id" class="mx-3">
        <div class="card mb-3 mt-3 mx-auto" style="max-width: 1000px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img :src="url + blog.thumbnail.url" class="img-fluid rounded-start">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h1 class="card-title">{{ blog.title }}</h1>
                        <p class="card-text"><small class="text-muted">{{ blog.updatedAt }}</small></p>
                    </div>
                    <div class="card-body">
                        <div>
                            <button class="btn btn-outline-primary float-end me-3 mb-3">
                                <RouterLink :to="`/update_blog/${blog.id}`" class="text-decoration-none">Update</RouterLink>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>