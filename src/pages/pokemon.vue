<template>
    <h1>Pokemon Information</h1>
    <div v-if="error">Error</div>
    <div v-else-if="loading">Loading</div>
    <div v-else class="info-wrapper">

        <div class="sprites-wrapper">
            <div v-if="!showBack && !showShiny" class="image-container front default">
                <img :src="pokemonDetails.sprites.front_default" :alt="pokemonDetails.name">
            </div>
            <div v-else-if="showBack && !showShiny" class="image-container back default">
                <img :src="pokemonDetails.sprites.back_default" :alt="pokemonDetails.name">
            </div>
            <div v-else-if="!showBack && showShiny" class="image-container front shiny">
                <img :src="pokemonDetails.sprites.front_shiny" :alt="pokemonDetails.name">
            </div>
            <div v-else class="image-container back shiny">
                <img :src="pokemonDetails.sprites.back_shiny" :alt="pokemonDetails.name">
            </div>

            <div class="sprites-buttons">
                <button @click="toggleSpriteDirection">Turn</button>
                <button @click="toggleShinySprite">Shiny</button>
            </div>
        </div>

        <div class="type-container">
            <div class="type" v-for="(type, i) in pokeTypes" :key="i">{{ type.type.name }}</div>
        </div>

        <div class="name-container">
            <h2>{{ pokemonDetails.name }}</h2>
        </div>

        <div class="measurements-container">
            <div class="measurement weight">
                <span>Weight</span>
                <span>{{ pokemonDetails.weight / 10 }} kg</span>
            </div>
            <div class="measurement height">
                <span>Height</span>
                <span>{{ pokemonDetails.height / 10 }} m</span>
            </div>
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
            pokemonDetails: null,
            showBack: false,
            showShiny: false
        }
    },
    created() {
        const { pokemonId } = this.$route.params
        fetchCache(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`).then(data => {
            this.pokemonDetails = data
            this.loading = false

            console.log(this.pokemonDetails)
        }).catch(error => {
            this.error = true
        })
    },
    computed: {
        pokeTypes() {
            return this.pokemonDetails?.types ?? []
        }
    },
    methods: {
        toggleSpriteDirection() {
            this.showBack = !this.showBack
        },
        toggleShinySprite() {
            this.showShiny = !this.showShiny
        }
    }
}
</script>

<style lang="sass" scoped>

.info-wrapper
    width: 80%
    margin: 0 auto

.measurements-container
    display: flex
    justify-content: space-between

    .measurement
        width: calc(50% - 10px)
        display: flex
        justify-content: space-between
        border-top: 1px solid #000
        border-bottom: 1px solid #000
        padding: 3px 0
        font-weight: bold

        &:first-of-type
            margin-right: 20px


</style>