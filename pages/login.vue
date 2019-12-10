<i18n src="@/assets/locales/login.json"></i18n>

<template lang="pug">
section
    transition(name="error")
        b-message#error-alaert.is-danger(title="Error!!", :active.sync="isError", aria-close-label="Close message")
            | {{ error }}
    .hero.is-fullheight
        .hero-body
            .container.has-text-centered
                .column.is-4.is-offset-4
                    h3.title.has-text-black {{ $t('LOGIN_TITLE') }}
                    hr.login-hr
                    p.subtitle.has-text-black {{ $t('LOGIN_DESCRIPTION') }}
                    .box
                        form(@submit.prevent="login")
                            .field
                                .control
                                    input#email.input.is-large(type="email", :placeholder="$t('LOGIN_MILE')", autofocus, 
                                                               v-model="email", @keydown.self.prevent.enter="nextFocus",
                                                               autocomplete="email")
                            .field
                                .control
                                    input#password.input.is-large(type="password", :placeholder="$t('LOGIN_PASSWORD')", 
                                                                  v-model="password", autocomplete="password")
                            button.button.is-block.is-info.is-large.is-fullwidth(type="submit") {{ $t('LOGIN_BUTTON') }}&nbsp;
                                i.fa.fa-sign-in(aria-hidden="true")
                    p.has-text-grey
                        nuxt-link(:to="localePath('index')") {{ $t('BACK') }} 
                        | &nbsp;|&nbsp;
                        nuxt-link(:to="localePath('signup')") {{ $t('SIGNUP') }} 
                        | &nbsp;|&nbsp;
                        nuxt-link(:to="localePath('index')") {{ $t('FORGET_PASSWORD') }}
</template>

<script>
export default {
    name: 'pages-login',
    head() {
        return {
            title: 'Login',
        }
    },
    data() {
        return {
            error: null,
            email: '',
            password: '',
            isError: false,
            redirect: '/',
        }
    },
    mounted() {
        this.redirect = this.$route.query.redirect || this.localePath('index')
    },
    methods: {
        async login() {
            try {
                await this.$store.dispatch('auth/login', {
                    email: this.email,
                    password: this.password
                })
                this.$router.push(this.redirect)
            } catch(e) {
                this.error = e.message
                this.isError = true
            }
        },
        nextFocus(event) {
            if (event.keyCode !== 13) return 
            let elm = this.$el
            elm.querySelector('#email').blur()
            elm.querySelector('#password').focus()
        }
    }
}
</script>

<style lang="sass">
#error-alaert
    position: fixed
    left: 10vw
    top: 10px
    width: 80vw
    z-index: 10
    box-shadow: 2px 2px 2px rgba(0,0,0,0.4)
.error-enter-active, .error-leave-active
    transition: opacity .5s
.error-enter, .error-leave-to
    opacity: 0
</style>