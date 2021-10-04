<template>
    <div class="wrapper">
        <section class="heading">
            <h1>Pokedex</h1>
        </section>

        <div v-if="isLoading">Loading...</div>

        <section v-else class="pokemon-list">
            <PokemonCard v-for="pokemon in pokemons.results" :key="pokemon.name" :url="pokemon.url"/>
        </section>

        <div class="pagination-container">
            <div  @click="page=1" v-if="page > 1">1</div>
            <div @click="page=page">{{ page }}</div>
            <div @click="page=secondPage" v-if="page < totalNumberOfPages">{{ secondPage }}</div>
            <div @click="page=thirdPage" v-if="page < totalNumberOfPages && secondPage < totalNumberOfPages">{{ thirdPage }}</div>
            <div @click="page=totalNumberOfPages" v-if="page < totalNumberOfPages && secondPage < totalNumberOfPages && thirdPage < totalNumberOfPages">75</div>
        </div>

        <NavButtons
            v-if="pokemons"
            :next-is-visible="Boolean(pokemons.next)"
            :previous-is-visible="Boolean(pokemons.previous)"
            @handlePreviousClick="page -= 1"
            @handleNextClick="page += 1"
        />
</div>
</template>

<script setup>
import PokemonCard from "/src/components/PokemonCard.vue"
import NavButtons from "/src/components/NavButtons.vue"
import { computed, ref, reactive } from '@vue/reactivity'
import { useQuery } from 'vue-query'

const page = ref(1)
const totalPokemon = 898
const pokemonPerPage = 12
const totalNumberOfPages = Math.ceil(totalPokemon / pokemonPerPage)
const secondPage = computed(() => page.value + 1)
const thirdPage = computed(() => page.value + 2)

const { data: pokemons, isLoading, isError } = useQuery(reactive(['pokedex', { page }]), async () => {
    const currentOffset = (page.value - 1) * pokemonPerPage
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${pokemonPerPage}&offset=${currentOffset}`)
    const data = await response.json()
    return data
},
{
    keepPreviousData: true
})

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

    .pagination-container
        display: flex
        justify-content: center
        align-items: center
        margin-top: 60px
        width: 100%

        div
            border: 1px solid red
            height: 3rem
            width: 3rem
            display: flex
            justify-content: center
            align-items: center
            margin: 4px


</style>