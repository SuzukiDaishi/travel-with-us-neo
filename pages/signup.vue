<template lang="pug">
section
    transition(name="error")
        b-message#error-alaert.is-danger(title="Error!!", :active.sync="isError", aria-close-label="Close message")
            | {{ error }}
    .hero.is-fullheight
        .hero-body
            .container.has-text-centered
                .column.is-4.is-offset-4
                    h3.title.has-text-black Sign up
                    hr.hr
                    p.subtitle.has-text-black You should register.
                    .box
                        form(@submit.prevent="signup")
                            .field
                                .control
                                    input.input.is-large(type="text", placeholder="Enter your name", 
                                                         autofocus="", v-model="newName", 
                                                         @keydown.self.prevent.enter="nextFocus('#email')")
                            .field
                                .control
                                    input#email.input.is-large(type="email", placeholder="Enter email", 
                                                         autofocus="", v-model="newEmail",
                                                         @keydown.self.prevent.enter="nextFocus('#password1')")
                            .field
                                .control
                                    input#password1.input.is-large(type="password", placeholder="Enter new Password",
                                                                   v-model="newPassword", 
                                                                   @keydown.self.prevent.enter="nextFocus('#password2')")
                            .field
                                .control
                                    input#password2.input.is-large(type="password", placeholder="Once again Password", 
                                                                   v-model="integrityPassword",
                                                                   @keydown.self.prevent.enter="")
                            .field 
                                .buttons.control
                                    a.button.is-primary.is-light.is-fullwidth(href="/terms", target="_blank") 
                                        | Check terms of service
                            .field
                                b-checkbox(v-model="isAgree") I agree to the terms of service
                            button.button.is-block.is-info.is-large.is-fullwidth(type="submit") Sign up&nbsp;
                                i.fa.fa-sign-in(aria-hidden="true")
                    p.has-text-grey
                        nuxt-link(:to="localePath('index')") Back 
                        | &nbsp;|&nbsp;
                        nuxt-link(:to="localePath('login')") Login
                        | &nbsp;|&nbsp;
                        nuxt-link(:to="localePath('index')") Forget Password
</template>

<script>
export default {
    head() {
        return {
            title: 'signup',
        }
    },
    data() {
        return {
            newName: '',
            newEmail: '',
            newPassword: '',
            integrityPassword: '',
            isAgree: false,
            error: null,
            isError: false,
        }
    },
    methods: {
        async signup() {
            if ( this.newEmail.length === 0 ) { return this.errorAlert('No email entered') }
            if ( this.newPassword.length === 0 ) { return this.errorAlert('No password entered') }
            if ( this.integrityPassword.length === 0 ) { return this.errorAlert('No password2 entered') }
            if ( this.newPassword != this.integrityPassword ) { return this.errorAlert('Passwords do not match') }
            if ( !this.isAgree ) { return this.errorAlert('Please accept the terms') }
            try {
                await this.$store.dispatch('auth/signup', {
                    name: this.newName, 
                    email: this.newEmail, 
                    password:  this.newPassword,
                })
                this.$router.push('/')
            } catch (e) {
                this.error = e.message
                this.isError = true
            }
        },
        errorAlert(message) {
            this.error = message
            this.isError = true
        },
        nextFocus(nextElementID) {
            if (event.keyCode !== 13) return 
            event.target.blur()
            this.$el.querySelector(nextElementID).focus()
        }
    }
}
</script>

<style lang="sass" scoped>
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