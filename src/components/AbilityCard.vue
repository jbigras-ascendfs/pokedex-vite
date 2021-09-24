<template>
    <div v-if="loading">Loading</div>

    <div v-else class="ability-wrapper">
        <h3>{{ name }}</h3>
        <p>{{ abilityDescription.effect_entries[1].effect }}</p>
    </div>
</template>

<script>
import { fetchCache } from '/src/modules/cacheData'

export default {
    props: {
        name: String,
        url: String
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
            this.abilityDescription = data
            this.loading = false

            console.log(this.abilityDescription)
        }).catch(error => {
            this.error = true
        })
    }
}
</script>

<style>

</style>