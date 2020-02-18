<i18n src="@/assets/locales/index.json"></i18n>

<template lang="pug">
  .wrapper
    .hero.is-fullheight
      .hero-head
        travel-header.has-background-white
      .hero-body.has-text-centered.background-image
        .container
          h1.title.title--hero.has-text-white 
            | {{ $t('CATCH_COPY') }}
          h2.subtitle.subtitle--hero.has-text-white 
            a(href="http://sodeproject.com/").has-text-white {{ $t('PROJECT_NAME') }}
    .section
      .h1.title {{ $t('FEATURE_SPOTS_TITLE') }}
      .columns.is-multiline(v-if="$device.isDesktopOrTablet")
        .column.is-one-quarter-desktop.is-half-tablet(v-for="spot in spots")
          .card
            nuxt-link(:to="localePath(`/article/${spot.id}`)")
              .card-image
                client-only
                  div(v-lazy-container="{ selector: 'img' }")
                    figure.image.is-4by3
                      img(:data-src="spot.img_url", 
                          data-loading="/images/preloader.gif", 
                          alt="Placeholder image")
              .card-content
                .media
                  .media-left
                    .media-content
                      p.title.is-4
                        | {{ spot.locales[$i18n.locale].name }}
                .content {{ spot.locales[$i18n.locale].discription }}
      .columns.is-multiline(v-else)
        .column.is-half-tablet.is-fullwidth-mobile(v-for="spot in spots")
          .card
            .card-content
              .media
                .media-left
                  client-only
                    div(v-lazy-container="{ selector: 'img' }")
                      figure.image.is-card-image-mobile 
                        img(:data-src="spot.img_url", 
                            data-loading="/images/preloader.gif", 
                            alt="Placeholder image")
                .media-content
                  .content
                    p
                      strong {{ spot.locales[$i18n.locale].name }}
                    button.button.is-light.is-small(@click="goArticle(spot.id)")
                      | {{ $t('MORE_INFO') }}
                    b-modal(:active.sync="isModal")
                      .card(v-if="modalState!==null")
                        .card-image
                          figure.image.is-4by3
                            img.img-topspace(:src="modalState.img_url")
                        .card-content
                          .media
                            .media-left
                              .media-content
                                p.title.is-4
                                  | {{ modalState.locales[$i18n.locale].name }}
                          .content
                            | {{ modalState.locales[$i18n.locale].discription }}
    .section
      h1.title {{ $t('RECOMMEND_SPOTS_TITLE') }}
      .columns
        .column
          #map
            google-map(:gmapIframe="mapIframe")
        .column
          p.title.is-4 {{ $t('21BI_NAME') }}
          p {{ $t('21BI_DESCRIPTION') }}
    travel-footer
</template>

<script>
import TravelHeader from '~/components/TravelHeader.vue'
import TravelFooter from '~/components/TravelFooter.vue'
import GoogleMap from '~/components/GoogleMap.vue'

export default {
  head() {
    return {
      title: 'Home',
    }
  },
  components: {
    TravelHeader,
    TravelFooter,
    GoogleMap,
  },
  data() {
    return {
      title: 'Home',
      spots: require('@/assets/data/spots.json'),
      modalState: null,
      isModal: false,
      mapIframe: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3204.7191869506255!2d136.65596131522156!3d36.560883288833956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5ff83380db53b801%3A0x512a01db8b6568c1!2z6YeR5rKiMjHkuJbntIDnvo7ooZPppKg!5e0!3m2!1sja!2sjp!4v1573828123878!5m2!1sja!2sjp" width="600" height="450" frameborder="0" style="border:0;" allowfullscreen="">'
    }
  },
  methods: {
    modalShow(index) {
      this.modalState = this.spots.filter( spot => spot.id===index )[0]
      this.isModal = true
    },
    goArticle(spotid) {
      this.$router.push( this.localePath(`/article/${spotid}`) )
    }
  }
}
</script>

<style lang="sass">
.background-image
  background-image: url('~assets/images/eki_yoru.jpg') 
  background-size: cover
  background-position: center
.title--hero
  font-size: 6vw
  text-shadow: black 3px 2px
.subtitle--hero
  font-size: 4vw
  text-shadow: black 2px 1px
.is-card-image-mobile 
  width: 96px
  height: auto
.img-topspace
  padding-top: 3vh
#map
  width: 100%
  height: 600px
.content
  color: black
  &:hover
    color: black
</style>

