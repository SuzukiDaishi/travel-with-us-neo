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
import InfiniteLoading from 'vue-infinite-loading';

export default {
    data() {
        return {
            isLoading: false,
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
            this.$axios
            .get(`http://localhost:3000/api/spots/show`) 
            .then( res => this.posts = res.data.data.sort((a,b)=>a.createAt>b.createAt?-1:1) )
        },
        loadNewPosts() {
            if ( window.scrollY + window.innerHeight >= document.body.clientHeight && !this.isLoading ) {
                this.isLoading = true
                this.$axios
                .get(`http://localhost:3000/api/spots/show`) 
                .then( res => {
                    console.log(res.data.data);
                    this.posts = this.posts.concat(res.data.data.sort((a,b)=>a.createAt>b.createAt?-1:1)) 
                    this.isLoading = false
                })
            }
        }
    },
    mounted() {
        window.addEventListener('scroll', this.loadNewPosts)
    }
}
</script>