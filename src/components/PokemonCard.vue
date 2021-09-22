<template>
    <div class="pokemon-card">
        {{ name }}
    </div>
</template>

<script setup>

const props = defineProps({
    name: String,
})

</script>

<style lang="sass" scoped>
.pokemon-card 
    display: block
    width: 30%
    background-color: red
    padding: 0.2rem
    height: 80px

</style>