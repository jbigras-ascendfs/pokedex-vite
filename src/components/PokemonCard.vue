<template>
    <div class="pokemon-card">
        <div v-if="isError" class="error-container">Error</div>
        <div v-else-if="isLoading" class="loading-container">Loading</div>
        <router-link :to="`/pokemon/${pokemonInfo.id}`" v-else >
            <div class="content-container">
                <div class="image-container">
                    <img :src="pokemonInfo.sprites.other['official-artwork'].front_default" alt="">
                </div>
                <div class="title-container">
                    <h2>{{ pokemonInfo.name }}</h2>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script setup>
import { useQuery } from 'vue-query'

const props = defineProps({
    url: String
})

const splitUrl = props.url.split('/')
const pokemonId = splitUrl[splitUrl.length - 2]

const { data: pokemonInfo, isLoading, isError } = useQuery(['pokemon', pokemonId], async () => {
    const response = await fetch(props.url)
    const data = await response.json()
    return data
})

</script>

<style lang="sass" scoped>

.pokemon-card 
    display: block
    width: 30%
    padding: 0.2rem
    height: 80px
    margin: 0.2rem

    .content-container
        width: 100%
        height: 100%
        display: flex
        flex-direction: column
        position: relative

        &:after
            position: absolute
            content: ''
            display: block
            width: 1rem
            height: 1rem
            background-color: #ddd
            top: 0
            left: 0
            clip-path: polygon(0% 0%, 100% 0%, 0% 100%)
            z-index: -1

        .image-container
            width: 100%
            height: 70%

            img
                width: 100%
                height: 100%
                object-fit: contain
                object-position: center
                display: block
        
        .title-container
            height: 30%
            width: 100%
            display: flex
            justify-content: center
            align-items: center

            h2 
                margin: 0
                display: block
                font-family: Arial
                font-size: 0.8rem
                text-transform: capitalize
</style>