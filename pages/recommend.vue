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
import urljoin from 'url-join'
import { greatCircleDistance } from "great-circle-distance"

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
    },
    methods: {
        popularSortPreData(spots, posts) {
            return spots
                .sort( (a, b) => a.id > b.id )
                .map( s => s.id)
                .map( i => {
                    return {
                        id: i,
                        count: posts.filter(p=>p.spot.id==i).length
                    }
                })
        },
        locationSortPreData(spots, location) {
            return spots
                .sort( (a, b) => a.id > b.id )
                .map( s => s.id)
                .map( i => this.spotLocations.filter( l => l.id == i )[0] )
                .map( l => { 
                    return {
                        latitude: l.latitude,
                        longitude: l.longitude
                    }
                })
                .map( l => greatCircleDistance({
                    lat1: `${ l.latitude }`,
                    lng1: `${ l.longitude }`,
                    lat2: `${ location.latitude }`,
                    lng2: `${ location.longitude }`,
                }) )
                .map( (d, i) => {
                    return {
                        id: i,
                        distance: d
                    }
                } )
        },
        recommendData(spots, popData, locData) {
            return spots
                .sort( (a, b) => a.id > b.id )
                .map( s => s.id )
                .map( i => {
                    // TODO: ここはあとで調整
                    let p = popData.filter( p => p.id == i )[0].count 
                    p /= popData.length
                    let l = locData.filter( l => l.id == i )[0].distance
                    l = - Math.tanh(l*3-3) // 1km人の歩ける距離は1km程度かなと思った(それ以上はマイナス要因)
                    console.log({ i, l, p, point: ( p + l ) / 2 })
                    return ( p + l ) / 2
                } )
                .map( (p, i) => {
                    return {
                        id: i,
                        point: p
                    }
                } )
        }
    },
    mounted() {
        this.$axios
        .get(urljoin(process.env.baseUrl,`/api/spots/show`))
        .then( res => res.data.data )
        .then( posts => {
            const popPreData = this.popularSortPreData(this.spots, posts)
            this.spots = this.spots.sort( (a, b) => {
                const flag = popPreData.filter( i => i.id == a.id )[0].count >
                    popPreData.filter( i => i.id == b.id )[0].count
                return flag ? -1 : 1
            })
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition((pos) => {
                    const locPreData = this.locationSortPreData(this.spots, {
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude
                    })
                    const pointData = this.recommendData(this.spots, popPreData, locPreData)
                    this.spots = this.spots.sort( (a, b) => {
                        const flag = pointData.filter( i => i.id == a.id )[0].point >
                            pointData.filter( i => i.id == b.id )[0].point
                        return flag ? -1 : 1
                    })
                })
            } 
        })
    }
}
</script>

<style lang="sass">
#header-space
    padding-bottom: 52px
#spot-list
    padding-top: 10px
    padding-bottom: 10px
    margin: 0 10vw
.image-and-map
    width: 100%
</style>