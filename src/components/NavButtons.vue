<template>
    <div class="nav-buttons">
        <button @click="handlePreviousClick" class="previous">Previous</button>
        <button @click="handleNextClick" class="next">Next</button>
    </div>
</template>

<script>
export default {
    methods: {
        handlePreviousClick() {
            this.$emit('handlePreviousClick')
        },
        handleNextClick() {
            this.$emit('handleNextClick')
        }
    }
}
</script>

<style lang="sass" scoped>

.nav-buttons
    position: fixed
    bottom: 0
    width: calc(100% - var(--leftbar-width))
    right: 0
    height: 50px
    display: flex
    justify-content: center
    align-items: center
    background-image: radial-gradient( rgba(255,255,255,0) 1px, white 1px )
    background-size: 4px 4px
    backdrop-filter: brightness(100%) blur(3px)

    button
        background-color: #000
        border: none
        border-radius: 0.2rem
        color: #fff
        padding: 0.5rem 1rem
        margin: 0.5rem 
        min-width: 40%
        
</style>