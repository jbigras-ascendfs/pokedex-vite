export default [
    {
        name: 'Home',
        path: '/',
        component: () => import('/src/pages/index.vue'),
    },
    {
        name: 'About',
        path: '/about',
        component: () => import('/src/pages/about.vue'),
    },
    {
        name: 'Pokemon',
        path: '/pokemon/:pokemonId',
        component: () => import('/src/pages/pokemon.vue'),
    }
]