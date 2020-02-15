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
                                nuxt-link(:to="localePath('index')").button {{ $t('RECOMMEND_DETAILS') }}
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
        postsPoint(posts) {
            const postIds = posts
                .map( p => p.spot.id )
                .filter( i => i!==-1 )
            return this.spots
                .map( s => s.id )
                .map( i => { 
                    return {
                        id: i,
                        point: postIds.filter( p => p === i ).length / postIds.length
                    }
                })
        },
        async locationsPoint() {
            const getLocations = async () => {
                if ( ! ( "geolocation" in navigator ) ) { throw Error('CAN NOT USE GEOLOCATION') }
                return new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject, {}) )
                    .then( e => e.coords ) 
                    .then( e => {
                        return {
                            latitude: e.latitude,
                            longitude: e.longitude
                        }
                    })
            }
            const myPlace = await getLocations()
            return this.spotLocations
                .map( s => {
                    return {
                        id: s.id,
                        latitude: s.latitude,
                        longitude: s.longitude
                    }
                })
                .map( l => {
                    return {
                        id: l.id,
                        distance: greatCircleDistance({
                            lat1: `${l.latitude}`,
                            lng1: `${l.longitude}`,
                            lat2: `${myPlace.latitude}`,
                            lng2: `${myPlace.longitude}`,
                        })
                    }
                })
                .map( l => {
                    return {
                        id: l.id,
                        point: - Math.tanh( 3 * l.distance - 3 ) / 3 + 0.5
                    }
                } )
        },
        spotsSorted(spotsPoint) {
            this.spots = this.spots
                .sort( (a, b) => {
                    const aPoint = spotsPoint.filter( i => i.id == a.id )[0].point
                    const bPoint = spotsPoint.filter( i => i.id == b.id )[0].point
                    return aPoint < bPoint ? 1 : -1
                })
        }
    },
    async mounted() {
        try {
            let postPoints = await this.$axios.get(urljoin(process.env.baseUrl,`/api/spots/show`))
            postPoints = postPoints.data.data
            postPoints = this.postsPoint(postPoints)
            let locationPoints = await this.locationsPoint()
            let point = this.spots.map( i => i.id )
                .map(i => {
                    return {
                        id: i,
                        point: (postPoints.filter(p=>p.id===i)[0].point+locationPoints.filter(p=>p.id===i)[0].point)/2
                    }
                })
            this.spotsSorted(point)
            console.log(postPoints, locationPoints, point)
        } catch(e) {
            console.log('error', e)
        }
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