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
                                                                　'border-width': '2px'})
                                i.fa.fa-plus
        .hero-body
            .section
                ul
                    li(v-for="_ in 10", style={'margin-bottom': '1rem'})
                        .box
                            article.media
                                .media-left
                                    figure.image.is-64x64
                                        img(src="https://bulma.io/images/placeholders/128x128.png")
                                .media-content
                                    .content
                                        p
                                            strong name &ensp; 
                                            small time
                                        client-only
                                            figure(v-lazy-container="{ selector: 'img' }") 
                                                img(:data-src="'https://i.imgur.com/JOoDeYg.jpg'", 
                                                    data-loading="/images/preloader.gif")
                                        p 
                                            | 本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文
                                            | 本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文
                                            | 本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文
                infinite-loading(spinner="spiral", @infinite="infiniteHandler")

</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';

export default {
    data() {
        return {

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

        }
    }
}
</script>