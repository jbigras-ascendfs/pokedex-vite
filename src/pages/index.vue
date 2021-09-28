<template>
    <div class="wrapper">
        <section class="heading">
            <h1>Pokedex</h1>
        </section>

        <div v-if="loading">Loading...</div>

        <section v-else class="pokemon-list">
            <pokemon-card v-for="pokemon in pokemons.results" :key="pokemon.name" :url="pokemon.url"></pokemon-card>
        </section>

        <div class="button-container">
            <button @click="prevPokemonPage">prev</button>
            <button @click="nextPokemonPage">next</button>
        </div>

        <div>Icons made by <a href="https://www.flaticon.com/authors/good-ware" title="Good Ware">Good Ware</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        <div>Icons made by <a href="https://www.flaticon.com/authors/becris" title="Becris">Becris</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    </div>
</template>

<script>
import PokemonCard from "/src/components/PokemonCard.vue"
import { fetchCache, clearAllFetchCacheData } from "/src/modules/cacheData"

export default {
    components: {
        'pokemon-card': PokemonCard
    },
    data() {
        return {
            loading: true,
            pokemons: null
        }
    },
    methods: {
        previousPokemonPage() {
            this.loading = true

            fetchCache(this.pokemons.previous)
            .then(data => {
                console.log(data, 'data PREV')
                this.pokemons = data
                this.loading = false
            })
        },
        nextPokemonPage() {
            this.loading = true

            fetchCache(this.pokemons.next)
            .then(data => {
                console.log(data, 'data NEXT')
                this.pokemons = data
                this.loading = false
            })
        },
    },
    created() {
        fetchCache('https://pokeapi.co/api/v2/pokemon')
        .then(data => {
            console.log(data, 'data')
            this.pokemons = data
            this.loading = false
        })
    }
}
</script>

<style lang="sass" scoped>

.wrapper 
    width: 100%
    height: 100%
    padding: 1rem
    display: flex
    flex-direction: column

    & > * 
        width: 100%

    .pokemon-list
        display: flex
        flex-wrap: wrap
        justify-content: center

</style>