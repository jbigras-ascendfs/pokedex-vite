<template>
    <div class="wrapper">
        <section class="heading">
            <h1>Pokedex</h1>
        </section>
        <section class="pokemon-list">
            <pokemon-card name="Bulbasaur"></pokemon-card>
        </section>
    </div>
</template>

<script setup>
import PokemonCard from '/src/components/PokemonCard.vue'
import { defineComponent } from 'vue';
import { useStore } from 'vuex';

const components = defineComponent({
    'pokemon-card': PokemonCard
});

// Set Count
await useStore().dispatch('getPokemonCount');
console.log("Hello");

// const allPokemonPromise = generatePokemonPromises();

// const allPokemonData = await Promise.all(allPokemonPromise);

// console.log(allPokemonPromise);

/*

function generatePokemonPromises(pokemonPerPage, previousPage) {

    const _promises = [];

    for (let i = 1; i < pokemonPerPage + 1; i++) {
        const currentPokemon = previousPage * pokemonPerPage + i;
        const currentFetch = async () => {
            const pokemonResponse = await fetch(`https://pokeapi.co/pokemon/${currentPokemon}`);
            const pokemonData = await pokemonResponse.json();
            return pokemonData;
        };
        _promises.push(currentFetch);
    }

    return _promises;

}

*/

</script>

<style lang="sass" scoped>

.wrapper 
    width: 100%
    height: 100%
    padding: 1rem
    display: flex
    flex-direction: column

    & > * 
        width: 100%

    .pokemon-list
        display: flex

</style>