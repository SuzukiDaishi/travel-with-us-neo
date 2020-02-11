<i18n src="@/assets/locales/recommend.json"></i18n>

<template lang="pug">
    .wrapper
        header#header-space
            travel-header.has-background-white
        main#spot-list
            .box(v-for="spot in spots" :key="spot.id")
                article.media
                    .media-content
                        .content
                            p
                                strong {{ spot.locales[$i18n.locale].name }}
                                br
                                | {{ spot.locales[$i18n.locale].discription }}
                            .image-and-map.columns.has-text-centered
                                figure.column.is-half
                                    img(:src="spot.img_url", alt="")
                                .column.is-two-fifths
                                    google-map(:gmapIframe="spotLocations.filter( s => s.id === spot.id )[0].map")        
                            span
                                nuxt-link(to="/").button {{ $t('RECOMMEND_DETAILS') }}
</template>

<script>
import TravelHeader from '~/components/TravelHeader.vue'
import GoogleMap from '~/components/GoogleMap.vue'

export default {
    head() {
        return {
            title: 'Recomend',
        }
    },
    components: {
        TravelHeader,
        GoogleMap,
    },
    data() {
        return {
            spots: require('@/assets/data/spots.json'),
            spotLocations: require('@/assets/data/spotsLocations.json'),
        }
    }
}
</script>

<style lang="sass">
#header-space
    padding-bottom: 52px
#spot-list
    padding-top: 10px
    margin: 0 10vw
.image-and-map
    width: 100%
</style>