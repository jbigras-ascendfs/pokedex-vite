<template>
    <div v-if="loading">Loading</div>

    <div v-else class="ability-wrapper">
        <h3>{{ name }}</h3>
    </div>
</template>

<script>
import { fetchCache } from '/src/modules/cacheData'

export default {
    props: {
        name: String,
        url: String
    },
    data() {
        return {
            loading: false
        }
    },
    created() {

    }
}
</script>

<style>

</style>