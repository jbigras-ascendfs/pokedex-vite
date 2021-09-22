import { createStore } from "vuex";

export default createStore({
    state: () => ({
        pokemonCount: 0,
        pokemonPerPage: 20,
        pokedexPage: 1
    }),
    getters : {},
    mutations : {
        SET_POKEMON_COUNT(state, payload) {
            state.pokemonCount = payload
        }
    },
    actions : {
        async getPokemonCount({ commit }) {
            try {       
                const results = await fetch('https://pokeapi.co/api/v2/pokemon');
                const data = await results.json();
      
                commit('SET_POKEMON_COUNT', data.count);
            } catch (err) {
                console.warn(err);
                commit('SET_POKEMON_COUNT', 151);
            }
          },
    },
});
