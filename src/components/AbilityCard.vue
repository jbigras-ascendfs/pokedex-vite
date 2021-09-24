<template>
    <div v-if="loading">Loading</div>

    <div v-else class="ability-wrapper">
        <h3>{{ name }}</h3>
        <p>{{ abilityDescription }}</p>
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

<style>

</style>