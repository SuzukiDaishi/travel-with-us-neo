<template lang="pug">
#map
</template>

<script>
export default {
    props: {
        gmapIframe: String
    },
    mounted() {
        this.$el.innerHTML = this.gmapIframe
        let map = this.$el.children[0]
        map.removeAttribute('width')
        map.removeAttribute('height')
        map.style.width = '100%'
        map.style.height = '100%'
    }
}
</script>

<style lang="sass" scoped>
#map
    width: 100%
    height: 100%
</style>