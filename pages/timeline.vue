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
                    li(v-for="post in posts", style={'margin-bottom': '1rem'})
                        .box
                            article.media
                                .media-left
                                    figure.image.is-64x64
                                        img(:src="post.user.imageurl")
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
                                            | {{ post.description }}
                    infinite-loading(spinner="spiral", @infinite="infiniteHandler")

</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';

export default {
    data() {
        return {
            posts: [
                {
                    id: 1,
                    user: {
                        id: 1,
                        name: 'admin',
                        imageurl: 'https://i.imgur.com/0U0MMRT.jpg', 
                    },
                    imageurl: 'https://i.imgur.com/JOoDeYg.jpg',
                    description: '本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文',
                    spot: {
                        id: 1,
                        img_url: "https://i.imgur.com/c7glCUA.jpg",
                        locales: {
                            en: {
                                name: "Higashi chaya",
                                discription: "Kenrokuen is one of the best gardens in Japan"
                            },
                            ja: {
                                name: "東茶屋街",
                                discription: "金沢の東側にある古くからある歓楽街です"
                            }
                        }
                    },
                    createAt: '2019-12-8',
                },
            ]
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