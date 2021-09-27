<template>
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
</template>

<script>

export default {
    props: {
        pokemonDetails: Object
    },
    data() {
        return {
            showBack: false,
            showShiny: false,
        }
    },
    methods: {
        toggleSpriteDirection() {
            this.showBack = !this.showBack
        },
        toggleShinySprite() {
            this.showShiny = !this.showShiny
        },
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

</style>