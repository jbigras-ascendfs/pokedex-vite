<template>
    <div v-if="error">Error</div>
    <div v-else-if="loading">Loading</div>
    <div v-else class="pokemon-info-wrapper">

        <SpritesSection :pokemonDetails="pokemonDetails" />

        <div class="type-container">
            <div :class="type.type.name" class="type" v-for="(type, i) in pokeTypes" :key="i">{{ type.type.name }}</div>
        </div>

        <div class="name-container">
            <h2>{{ pokemonDetails.name }}</h2>
        </div>

        <div class="pokemon-description-container">
            <p>{{ description }}</p>
        </div>

        <div class="measurements-container">
            <div class="measurement weight">
                <span>Weight</span>
                <span>{{ weight }} kg</span>
            </div>
            <div class="measurement height">
                <span>Height</span>
                <span>{{ height }} m</span>
            </div>
        </div>

        <div class="abilities-container">
            <h2>Abilities</h2>
            <AbilityCard
              v-for="pokeAbility in pokemonDetails.abilities"
              :key="pokeAbility.ability.slot"
              :name="pokeAbility.ability.name"
              :url="pokeAbility.ability.url"
              :isHidden="pokeAbility.is_hidden"
            />
        </div>

    </div>
</template>

<script>
import { fetchCache } from '/src/modules/cacheData'
import SpritesSection from '../components/SpritesSections.vue'
import AbilityCard from '../components/AbilityCard.vue'
import anime from 'animejs/lib/anime.es.js';

export default {
    components: {
        SpritesSection,
        AbilityCard
    },
    data() {
        return {
            loading: true,
            error: false,
            pokemonDetails: null,
            description: null,
            weight: 0,
            height: 0
        }
    },
    created() {
        const { pokemonId } = this.$route.params
        fetchCache(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`).then(data => {
            this.pokemonDetails = data
            this.loading = false

            this.animateDimensions(this.pokemonDetails)

            console.log(this.pokemonDetails.abilities)
        }).catch(error => {
            this.error = true
        })
        fetchCache(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`).then(data => {
            this.description = data.flavor_text_entries[0].flavor_text
        }).catch(error => {
            console.log(error)
        })
    },
    computed: {
        pokeTypes() {
            return this.pokemonDetails?.types ?? []
        }
    },
    methods: {
        animateDimensions({ weight: targetWeight, height: targetHeight }) {
            const dimensions = {
                weight: 0,
                height: 0
            }
            anime({
                targets: dimensions,
                weight: targetWeight / 10,
                height: targetHeight / 10,
                round: 1,
                easing: 'easeOutQuart',
                duration: 1900,
                update: () => {
                    this.weight = dimensions.weight
                    this.height = dimensions.height
                }
            })
        }
    }
}
</script>

<style lang="sass" scoped>

.pokemon-info-wrapper
    width: 80%
    margin: 0 auto

.type-container
    display: flex

    .type
        text-transform: uppercase

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