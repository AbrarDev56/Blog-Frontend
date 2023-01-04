<script setup>
    import { RouterView, RouterLink, useRouter } from 'vue-router'
    import { useAuthStore } from "@/stores/auth"
    import { storeToRefs } from 'pinia';

    import { onMounted, ref } from 'vue'
    // import { useRouter } from 'vue-router'
    // import { useAuthStore } from "@/stores/auth"
    import axios from 'axios'

    const authStore = useAuthStore();
    const { removeToken } = authStore

    const router = useRouter()
    const profile = ref('')
    onMounted(() => {
        axios.get('users/me', {
            headers: {
                'Authorization': `Bearer ${authStore.token}`
            }
        })
            .then(response => {
                profile.value = (response.data)
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    })

    function Logout() {
        removeToken()
        router.push('/login')
    }

    const { isAuthenticated } = storeToRefs(useAuthStore())

</script>

<template>
    <nav class="navbar navbar-expand-sm navbar-light bg-light">
        <div class="container-fluid">
            <RouterLink class="navbar-brand" to="/">Blog</RouterLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <RouterLink class="nav-link active" aria-current="page" to="/">Home</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link active" aria-current="page" to="/search">Search</RouterLink>
                    </li>
                    <li v-if="!isAuthenticated" class="nav-item">
                        <RouterLink class="nav-link active" to="/login">Login</RouterLink>
                    </li>
                    <li v-if="!isAuthenticated" class="nav-item">
                        <RouterLink class="nav-link active" to="/signup">Sign Up</RouterLink>
                    </li>
                    <li v-if="isAuthenticated" class="nav-item">
                        <RouterLink class="nav-link active" to="/create_blog">Create Blogs</RouterLink>
                    </li>
                    <li v-if="isAuthenticated" class="nav-item dropdown">
                        <a class="nav-link active dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {{ profile.username }}
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li><a @click="Logout()" class="dropdown-item text-danger fw-semibold" type="button">Logout</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <RouterView />
</template>
