<i18n src="@/assets/locales/header.json"></i18n>

<template lang="pug">
.travel-header-rapper
    b-navbar
        template(slot="brand")
            b-navbar-item(tag="nuxt-link", :to="localePath('index')")
                img(src="~assets/images/logo.png")
        template(slot="start")
            b-navbar-item(tag="nuxt-link", :to="localePath('index')") {{ $t('home') }}
            b-navbar-item(tag="nuxt-link", :to="localePath('timeline')") {{ $t('timeline') }}
            b-navbar-item(tag="nuxt-link", :to="localePath('mypage-recommendspots')", v-if="isLogin()") {{ $t('mypage') }}
            b-navbar-item
                b-field
                    b-select(placeholder="Country", icon="globe", icon-pack="fa", v-model="lang", @input="changeLang()")
                        option(:value="locale" v-for="locale in $i18n.availableLocales") {{ codeToLanguageName(locale) }}
        template(slot="end")
            b-navbar-item(tag="div")
                .buttons(v-if="!$store.state.auth.authUser")
                    nuxt-link.button.is-primary(:to="localePath('signup')")
                        strong {{ $t('signup') }}
                    nuxt-link.button.is-light(:to="localePath('login')")
                        | {{ $t('login') }}
                .buttons(v-else)
                    button.button.is-light(@click="logout")
                        | {{ $t('logout') }}
</template>

<script>
export default {
    data() {
        return {
            lang: 'en'
        }
    },
    methods: {
        async logout() {
            await this.$store.dispatch('auth/logout')
            this.$router.push(this.localePath('index'))
        },
        isLogin() {
            return !!this.$store.state.auth.authUser
        },
        codeToLanguageName(code) {
            switch (code) {
                case 'en':
                    return 'English'
                case 'ja':
                    return '日本語'
                default:
                    return 'Unknown language'
            }
        },
        changeLang() {
            this.$i18n.locale = this.lang
            this.$router.push( this.switchLocalePath(this.lang) )
        }
    },
    mounted() {
        this.lang = this.$i18n.locale
    }
}
</script>

<style lang="sass" scoped>
.travel-header-rapper
  position: fixed
  right: 0
  left: 0
  z-index: 10
</style>