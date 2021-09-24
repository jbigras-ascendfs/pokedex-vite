<template>
    <h3>abilities</h3>
    <div v-for="ability in abilities" :key="ability.ability.slot" class="ability">{{ ability.ability.name }}</div>
</template>

<script>
export default {
    props: {
        abilities: Array
    },
}
</script>

<style>

</style>