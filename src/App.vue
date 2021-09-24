<template>
    <default-layout></default-layout>
</template>

<script>
import DefaultLayout from '/src/layouts/DefaultLayout.vue'

export default {
    components: {
        'default-layout': DefaultLayout
    },
}
</script>

<style lang="sass">

* 
    box-sizing: border-box

body 
    margin: 0
    padding: 0

a
  text-decoration: none
  color: #000

</style>