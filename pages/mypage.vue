<i18n src="@/assets/locales/mypage.json"></i18n>

<template lang="pug">
.wrapper
    header#header-space
        travel-header.has-background-danger
    .section
        .columns
            .column.is-2.is-10-mobile.is-centered
                client-only
                    div(v-lazy-container="{ selector: 'img' }")
                        figure.header-icon.user-profile-image.has-text-centered
                            img.img-wrapper(:data-src="image", 
                                            data-loading="/images/preloader.gif")
            .column.is-4-tablet.is-10-mobile
                p.title {{ name }}
                p.subtitle {{ $t('EMAIL_NAME') }}: {{ email }}
                p {{ description }}
    .tabs.is-centered.is-boxed
        ul
            li(:class="{ 'is-active': !!$nuxt.$route.path.match(/recommendspots/) }")
                nuxt-link(:to="localePath('mypage-recommendspots')")
                    span {{ $t('RECOMMEND_SPOTS') }}
            li(:class="{ 'is-active': !!$nuxt.$route.path.match(/mypost/) }")
                nuxt-link(:to="localePath('mypage-mypost')")
                    span {{ $t('MY_POST') }}
            li(:class="{ 'is-active': !!$nuxt.$route.path.match(/settings/) }")
                nuxt-link(:to="localePath('mypage-settings')")
                    span {{ $t('SETTINGS') }}
    div
        nuxt-child
</template>


<script>
import TravelHeader from '~/components/TravelHeader.vue'

export default {
    head() {
        return {
            title: 'Mypage'
        }
    },
    data() {
        return {
            name: this.$store.state.auth.authUser.name,
            image: this.$store.state.auth.authUser.imageurl || 'http://placehold.it/300x225',
            email: this.$store.state.auth.authUser.email,
            description: this.$store.state.auth.authUser.description,
        }
    },
    components: {
        TravelHeader,
    },
    fetch ({ app, store, redirect }) {
        if (!store.state.auth.authUser) {
            return redirect('/login?redirect='+app.localePath('mypage-recommendspots'))
        }
    },
}
</script>

<style lang="sass">
#header-space
    padding-bottom: 10px
img.img-wrapper
    width: 100%;
</style>