<script setup>
    import algoliasearch from 'algoliasearch/lite';
    import 'instantsearch.css/themes/satellite-min.css';

    const searchClient = algoliasearch('SESGO858EG', '808199794203ae1d0190b7e6ddf7be2d')
    const url = "http://localhost:1337"
</script>

<template>
    <ais-instant-search :search-client="searchClient" index-name="blog">
        <ais-search-box />
        <ais-hits>
            <template v-slot:item="{ item }">
                <img :src="url + item.thumbnail.url" class="img-fluid rounded me-3" style="max-width: 200px; max-height: 150px;">
                <h2>{{ item.id }}: {{ item.article }}</h2>
            </template>
        </ais-hits>
    </ais-instant-search>
</template>