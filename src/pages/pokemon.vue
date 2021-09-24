<template>
    <h1>Pokemon Information</h1>
    <div v-if="error">Error</div>
    <div v-else-if="loading">Loading</div>
    <div v-else>
        <div class="image-container">
            <img :src="pokemonDetails.sprites.front_shiny" alt="">
        </div>
        <div class="image-container">
            <img :src="pokemonDetails.sprites.back_shiny" alt="">
        </div>
        <div class="name-container">
            <h2>{{ pokemonDetails.name }}</h2>
        </div>
        <div class="type-container">
            <div class="type" v-for="(type, i) in pokeTypes" :key="i">{{ type.type.name }}</div>
        </div>
        <div class="measurements-container">
            <div>Height: {{ pokemonDetails.height / 10 }}m</div>
            <div>Weight: {{ pokemonDetails.weight / 10 }}kg</div>
        </div>
    </div>
</template>

<script>
import { fetchCache } from '/src/modules/cacheData'

export default {
    data() {
        return {
            loading: true,
            error: false,
            pokemonDetails: null
        }
    },
    created() {
        const { pokemonId } = this.$route.params
        fetchCache(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`).then(data => {
            this.pokemonDetails = data
            this.loading = false
        }).catch(error => {
            this.error = true
        })
    },
    computed: {
        pokeTypes() {
            return this.pokemonDetails?.types ?? []
        }
    }
}
</script>

<style>

</style>