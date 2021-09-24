<template>
    <div class="wrapper">
        <section class="heading">
            <h1>Pokedex</h1>
        </section>

        <div v-if="loading">Loading...</div>

        <section v-else class="pokemon-list">
            <pokemon-card v-for="pokemon in pokemons.results" :key="pokemon.name" :url="pokemon.url"></pokemon-card>
        </section>
    </div>
</template>

<script>
import PokemonCard from "/src/components/PokemonCard.vue"
import { fetchCache } from "/src/modules/cacheData"

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
    created() {
        fetchCache('https://pokeapi.co/api/v2/pokemon')
        .then(data => {
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