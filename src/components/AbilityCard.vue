<template>
    <div v-if="loading">Loading</div>

    <div v-else class="ability-wrapper" :class="{ hidden: isHidden }" >
        <h3 class="name">{{ name }}</h3>
        <p class="description">{{ abilityDescription }}</p>
    </div>
</template>

<script>
import { fetchCache } from '/src/modules/cacheData'

export default {
    props: {
        name: String,
        url: String,
        isHidden: { type: Boolean, default: false }
    },
    data() {
        return {
            loading: true,
            error: false,
            abilityDescription: null
        }
    },
    created() {
        fetchCache(this.url).then(data => {
            const enEffectEntries = [...data.effect_entries].find(entry => entry.language.name === 'en')

            this.abilityDescription = enEffectEntries.effect
            this.loading = false
        }).catch(error => {
            this.error = true
        })
    }
}
</script>

<style lang="sass" scoped>

.ability-wrapper
    background: linear-gradient(to bottom, #fcfcfc, #ddd)
    border-radius: 10px
    padding: 12px
    width: calc(50% - 5px)

    &:first-of-type
        margin-right: 10px

    &.hidden
        background-color: yellow
        background: linear-gradient(to bottom, #fcfcfc, #ffd859)
        position: relative

        &:before
            content: '!'
            border: 3px solid #000
            display: flex 
            justify-content: center
            align-items: center
            position: absolute
            top: -6px
            left: -6px
            height: 10px
            width: 10px
            padding: 3px
            border-radius: 50%
            font-weight: bold

    .name
        text-transform: capitalize
        font-size: 0.85rem
        font-weight: 900
        margin-bottom: 8px

    .description
        font-size: 0.72rem

</style>