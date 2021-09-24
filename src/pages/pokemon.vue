<template>
    <!-- <h1>Pokemon Information</h1> -->
    <div v-if="error">Error</div>
    <div v-else-if="loading">Loading</div>
    <div v-else class="pokemon-info-wrapper">

        <div class="sprites-wrapper">
            <transition name="pokemon-shiny-toggle" mode="out-in">
                <div v-if="!showShiny" class="sprite-container default-sprite">
                    <transition name="pokemon-turn" mode="out-in">
                        <div v-if="!showBack" class="image-container front default">
                            <img :src="pokemonDetails.sprites.front_default" :alt="pokemonDetails.name">
                        </div>
                        <div v-else class="image-container back default">
                            <img :src="pokemonDetails.sprites.back_default" :alt="pokemonDetails.name">
                        </div>
                    </transition>
                </div>
                <div v-else class="sprite-container shiny-sprite">
                    <transition name="pokemon-turn" mode="out-in">
                        <div v-if="!showBack" class="image-container front shiny">
                            <img :src="pokemonDetails.sprites.front_shiny" :alt="pokemonDetails.name">
                        </div>
                        <div v-else class="image-container back shiny">
                            <img :src="pokemonDetails.sprites.back_shiny" :alt="pokemonDetails.name">
                        </div>
                    </transition>
                </div>
            </transition>

            <div class="sprite-controls">
                <button @click="toggleSpriteDirection">Turn</button>
                <button @click="toggleShinySprite">Shiny</button>
            </div>
        </div>

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
                <span>{{ pokemonDetails.weight / 10 }} kg</span>
            </div>
            <div class="measurement height">
                <span>Height</span>
                <span>{{ pokemonDetails.height / 10 }} m</span>
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
import AbilityCard from '../components/AbilityCard.vue'

export default {
    components: {
        AbilityCard
    },
    data() {
        return {
            loading: true,
            error: false,
            pokemonDetails: null,
            showBack: false,
            showShiny: false,
            description: null
        }
    },
    created() {
        const { pokemonId } = this.$route.params
        fetchCache(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`).then(data => {
            this.pokemonDetails = data
            this.loading = false

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
        toggleSpriteDirection() {
            this.showBack = !this.showBack
        },
        toggleShinySprite() {
            this.showShiny = !this.showShiny
        }
    }
}
</script>

<style lang="sass">

    .pokemon-turn-enter-active,
    .pokemon-turn-leave-active
        transition: all 0.5s
        position: relative

    .pokemon-turn-enter-from
        transform: translateX(50px)
        opacity: 0

    .pokemon-turn-leave-to
        transform: translateX(-50px)
        opacity: 0

    .pokemon-shiny-toggle-enter-active,
    .pokemon-shiny-toggle-leave-active
        transition: all 0.5s
        position: relative

    .pokemon-shiny-toggle-enter-from
        transform: translateY(25px)
        opacity: 0

    .pokemon-shiny-toggle-leave-to
        transform: translateY(-25px)
        opacity: 0

</style>

<style lang="sass" scoped>

.pokemon-info-wrapper
    width: 80%
    margin: 0 auto

.sprites-wrapper
    display: flex

    .sprite-container
        width: 80%

        img
            width: 100%

    .sprite-controls
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center

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