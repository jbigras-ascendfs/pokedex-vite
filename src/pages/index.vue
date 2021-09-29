<template>
    <div class="wrapper">
        <section class="heading">
            <h1>Pokedex</h1>
        </section>

        <div v-if="loading">Loading...</div>

        <section v-else class="pokemon-list">
            <PokemonCard v-for="pokemon in pokemons.results" :key="pokemon.name" :url="pokemon.url"/>
        </section>

        <NavButtons
            @handlePreviousClick="previousPokemonPage"
            @handleNextClick="nextPokemonPage"
        />

        <!-- sparkle -->
        <div>Icons made by <a href="https://www.flaticon.com/authors/good-ware" title="Good Ware">Good Ware</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        <!-- rotate -->
        <div>Icons made by <a href="https://www.flaticon.com/authors/becris" title="Becris">Becris</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        <!-- pokeball -->
        <div>Icons made by <a href="https://www.flaticon.com/authors/roundicons-freebies" title="Roundicons Freebies">Roundicons Freebies</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    </div>
</template>

<script>
import PokemonCard from "/src/components/PokemonCard.vue"
import NavButtons from "/src/components/NavButtons.vue"
import { fetchCache } from "/src/modules/cacheData"

export default {
    components: {
        PokemonCard,
        NavButtons
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
                this.pokemons = data
                this.loading = false
            })
        },
        nextPokemonPage() {
            this.loading = true

            fetchCache(this.pokemons.next)
            .then(data => {
                this.pokemons = data
                this.loading = false
            })
        },
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

    & > *:not(.nav-buttons)
        width: 100%

    .pokemon-list
        display: flex
        flex-wrap: wrap
        justify-content: center

</style>