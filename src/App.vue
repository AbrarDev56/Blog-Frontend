<script setup>
    import { RouterView, RouterLink } from 'vue-router'
    import { useAuthStore } from "@/stores/auth"
    import { storeToRefs } from 'pinia';

    const { isAuthenticated } = storeToRefs(useAuthStore())
    
</script>

<template>
    <nav class="navbar navbar-expand navbar-light bg-light">
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
                    <li v-if="!isAuthenticated" class="nav-item">
                        <RouterLink class="nav-link active" to="/login">Login</RouterLink>
                    </li>
                    <li v-if="!isAuthenticated" class="nav-item">
                        <RouterLink class="nav-link active" to="/signup">Sign Up</RouterLink>
                    </li>
                    <li v-if="isAuthenticated" class="nav-item">
                        <RouterLink class="nav-link active" to="/profile">Profile</RouterLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <RouterView />
</template>
