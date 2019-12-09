<template lang="pug">
.wrapper
    section.hero
        .hero-head(style={'z-index': 10})
            b-navbar.is-fixed-top(:mobile-burger="false", style={'background': 'white'})
                template#navbar-rigth(slot="brand")
                    b-navbar-item(tag="router-link" :to="localePath('index')")
                        h1.title TravelWithUs
                    b-navbar-item(tag="div")
                        .buttons
                            button.button.has-text-centerd(style={'border-radius': '50%', 
                                                                　'border-color': 'black',
                                                                　'border-width': '2px'},
                                                           @click="postButtonClick()")
                                i#plusIcon.fa.fa-plus
        .hero-body
            .section
                transition
                    .box(v-if="isPosting")
                        | hello
                ul
                    li(v-for="post in posts", style={'margin-bottom': '1rem'})
                        .box
                            article.media
                                .media-left
                                    figure.image.is-64x64
                                        img(:src="post.user.imgurl || 'https://bulma.io/images/placeholders/128x128.png'")
                                .media-content
                                    .content
                                        p
                                            strong {{ post.user.name }} &nbsp;
                                            small {{ post.createAt }}
                                            br 
                                            | {{ post.spot.locales[$i18n.locale].name }}
                                        client-only
                                            figure(v-lazy-container="{ selector: 'img' }") 
                                                img(:data-src="post.imageurl", 
                                                    data-loading="/images/preloader.gif")
                                        p 
                                            | {{ post.text }}
                    infinite-loading(spinner="spiral", @infinite="infiniteHandler")

</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import anime from 'animejs'

export default {
    data() {
        return {
            isLoading: false,
            isPosting: false,
            posts: []
        }
    },
    fetch ({ app, store, redirect }) {
        if (!store.state.auth.authUser) {
            return redirect('/login?redirect='+app.localePath('timeline'))
        }
    },
    components: {
        InfiniteLoading
    }, 
    methods: {
        infiniteHandler($state) {
            if (this.isLoading) return
            this.isLoading = true
            this.$axios
            .get(`http://localhost:3000/api/spots/show`) 
            .then( res => {
                this.posts.push(...res.data.data.sort((a,b)=>a.createAt>b.createAt?-1:1))
                $state.loaded()
                this.isLoading = false
            })
        },
        postButtonClick() {
            this.isPosting = !this.isPosting
            if (this.isPosting) {
                anime({
                    targets: '#plusIcon',
                    rotate:  45
                })
            } else {
                anime({
                    targets: '#plusIcon',
                    rotate: 0
                })
            }
        }
    }
}
</script>

<style lang="sass">
.v-enter-active
    transition: opacity 0.5s
.v-leave-active
    transition: opacity 0.2s
.v-enter, .v-leave-to
    opacity: 0
</style>