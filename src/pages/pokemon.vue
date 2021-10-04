<template>
    <div v-if="error">Error</div>
    <div v-else-if="loading">Loading</div>
    <div v-else :class="pokeTypes[0].type.name" class="pokemon-info-wrapper bg-color">

        <div class="pokemon-content" ref="pokeContent">
            <SpritesSection :pokemonDetails="pokemonDetails" />

            <div class="type-container">
                <div :class="type.type.name" class="bg-color type" v-for="(type, i) in pokeTypes" :key="i">{{ type.type.name }}</div>
            </div>

            <div class="number-container">
                <span>#{{ paddedPokeId }}</span>
            </div>

            <div class="name-container">
                <h2>{{ pokemonDetails.name }}</h2>
            </div>

            <div class="description-container">
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

                <div class="abilities-flex-container">
                    <AbilityCard
                        v-for="pokeAbility in pokeAbilities"
                        :key="pokeAbility.ability.slot"
                        :name="pokeAbility.ability.name"
                        :url="pokeAbility.ability.url"
                        :isHidden="pokeAbility.is_hidden"
                    />
                </div>
            </div>

            <div class="evolution-container">
                <img v-for="(sprite, i) in evolutionSprites" :key="i" :src="sprite.url">
            </div>
        </div>

        <NavButtons
            @handlePreviousClick="previousPokemon"
            @handleNextClick="nextPokemon"
        />

    </div>
</template>

<!-- <script setup>
import SpritesSection from '../components/SpritesSection.vue'
import AbilityCard from '../components/AbilityCard.vue'
import NavButtons from '../components/NavButtons.vue'
import anime from 'animejs/lib/anime.es.js';
import { useQuery } from 'vue-query';
import { useRoute } from 'vue-router';

const pokemonId = useRoute().params.pokemonId

const pokemon = useQuery(reactive(['pokemon', {pokemonId}]), async () => {
    const response = await fetch(props.url)
    const data = await response.json()
    return data
})

const pokemonSpecies = useQuery(['pokemonSpecies', pokemonId], async () => {
    const response = await fetch(props.url)
    const data = await response.json()
    return data
})

</script> -->

<script>
import { fetchCache } from '/src/modules/cacheData'
import SpritesSection from '../components/SpritesSection.vue'
import AbilityCard from '../components/AbilityCard.vue'
import NavButtons from '../components/NavButtons.vue'
import anime from 'animejs/lib/anime.es.js';

export default {
    components: {
        SpritesSection,
        AbilityCard,
        NavButtons
    },
    data() {
        return {
            loading: true,
            error: false,
            pokemonDetails: null,
            description: null,
            weight: 0,
            height: 0,
            evolutionChainUrl: null,
            evolutionChain: null,
            evolutionSprites: []
        }
    },
    created() {
        this.$watch(
            () => this.evolutionChainUrl,
            (newUrl, _) => {
                fetchCache(newUrl).then(data => {
                    this.evolutionChain = data
                    this.evolutionSprites = []

                    let initialValue = data.chain
                    let allPokeInChain = []

                    let findEvolvesTo = (currentEvolvesTo) => {
                        allPokeInChain.push(currentEvolvesTo.species)

                        if (currentEvolvesTo.evolves_to.length > 0) {
                            currentEvolvesTo.evolves_to.forEach((_, i) => {
                                findEvolvesTo(currentEvolvesTo.evolves_to[i])
                            })
                        }
                    }

                    findEvolvesTo(initialValue)

                    allPokeInChain.forEach((pokemon, i) => {
                        const splitUrl = pokemon.url.split('/')
                        const id = splitUrl[splitUrl.length - 2]

                        fetchCache(`https://pokeapi.co/api/v2/pokemon/${id}/`).then(data => {
                            this.evolutionSprites.push({ url: data.sprites.front_default, index: i })
                        })
                    })

                }).catch(error => {
                    console.log(error)
                })
            }
        )

        this.$watch(
            () => this.$route.params.pokemonId,
            async (pokemonId, _) => {
                const pokeContent = this.$refs?.pokeContent

                if (pokeContent) {
                    anime({
                        targets: pokeContent.children,
                        translateX: -50,
                        opacity: 0,
                        duration: 400,
                        delay: anime.stagger(50),
                        complete: async () => {
                            await fetchPokemonData(this)
                            anime({
                                targets: pokeContent.children,
                                translateX: 0,
                                opacity: 1,
                                duration: 400,
                                delay: anime.stagger(50),
                            })
                        }
                    })
                } else {
                    await fetchPokemonData(this)
                }
    
                async function fetchPokemonData(self) {
                    const allData = await Promise.all([
                        fetchCache(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`),
                        fetchCache(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`)
                    ])

                    const data = allData[0]
                    self.pokemonDetails = data
                    self.loading = false

                    self.animateDimensions(self.pokemonDetails)

                    const data2 = allData[1]
                    const enFlavorTextEntry = [...data2.flavor_text_entries].find(entry => entry.language.name === 'en')
                    
                    self.description = enFlavorTextEntry.flavor_text
                    self.evolutionChainUrl = data2.evolution_chain.url
                }
            },

            {
                immediate: true
            }
        )   
    },
    computed: {
        pokeTypes() {
            return this.pokemonDetails?.types ?? []
        },
        paddedPokeId() {
            return this.pokemonDetails.id.toString().padStart(3, '0')
        },
        pokeAbilities() {
            return this.pokemonDetails?.abilities.slice(0, 2) ?? []
        },
        orderedEvolutionSprites() {
            return this.evolutionSprites.sort((a, b) => {
                return a.index - b.index
            })
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
        },
        nextPokemon() {
            const { pokemonId } = this.$route.params
            const nextId = parseInt(pokemonId) + 1
            this.$router.push({ path: `/pokemon/${nextId}` })
        },
        previousPokemon() {
            const { pokemonId } = this.$route.params
            const previousId = parseInt(pokemonId) - 1
            this.$router.push({ path: `/pokemon/${previousId}` })
        }
    }
}
</script>

<style lang="sass" scoped>

.pokemon-info-wrapper
    width: 100%
    padding: 0 1rem 
    position: relative
    transition: background-color 0.4s linear

    &:before
        width: 100%
        height: calc(100% - 100px)
        position: absolute
        bottom: 0
        left: 0
        z-index: 0
        border-top-right-radius: 10000rem
        content: ''
        background-color: #fff

    .pokemon-content
        position: relative
        z-index: 1
        padding-bottom: 50px

.type-container
    display: flex
    margin-bottom: 12px

    .type
        border-radius: 5px
        text-transform: uppercase
        font-size: 0.75rem 
        padding: 5px 12px

        &:first-of-type
            margin-right: 5px

.number-container

    span
        background-color: #000
        border-radius: 5px
        color: #fff
        font-size: 0.6rem
        padding: 3px 8px

.name-container
    margin-bottom: 12px

    h2
        text-transform: uppercase
        font-size: 1.4rem
        font-weight: 900

.description-container
    margin-bottom: 12px

    p 
        font-size: 0.9rem

.measurements-container
    display: flex
    justify-content: space-between
    margin-bottom: 20px

    .measurement
        width: calc(50% - 10px)
        display: flex
        justify-content: space-between
        border-top: 1px solid #000
        border-bottom: 1px solid #000
        padding: 3px 0
        font-weight: bold
        font-size: 0.85rem

        &:first-of-type
            margin-right: 20px

.abilities-container
    h2
        text-transform: uppercase
        font-size: 1rem
        font-weight: 900
        margin-bottom: 12px

    .abilities-flex-container
        display: flex

.evolution-container
    width: 100%
    display: flex
    flex-wrap: wrap
    justify-content: center
    align-items: center

    img
        height: 5rem
        max-width: 100%
        display: block
        object-fit: contain
        object-position: center

</style>