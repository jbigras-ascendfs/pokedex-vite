<template>
    <div class="wrapper">
        <header class="left-bar">
            <nav></nav>
        </header>
        <main class="content">
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
export default {
    data() {
        return {
            color: "#FF00",
        }
    }
}
</script>

<style lang="sass">
:root
    --leftbar-width: 50px
</style>

<style lang="sass" scoped>

.wrapper
    width: 100%
    height: 100vh
    display: flex

.left-bar
    width: var(--leftbar-width)
    background: #000
    color: #fff
    height: 100%

.content
    width: calc(100% - var(--leftbar-width))
    height: 100%
    overflow-y: scroll
    overflow-x: hidden

</style>