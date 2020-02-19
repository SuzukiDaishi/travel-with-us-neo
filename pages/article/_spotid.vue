<template>
    <div>
        <header>
            <travel-header />
            <div id="header-space"></div>
        </header>
        <div>
            
            <!-- is PC -->
            <section class="container top-space" v-if="$device.isDesktop">
                <div class="columns">
                    <div class="column is-9 height-box">
                        <iframe :src="spotsNews.filter(i=>i.id==$route.params.spotid)[0][$i18n.locale].path"></iframe>
                    </div>
                    <div class="column is-3" >
                        <div class="container box-wrapper height-box box-scroll">
                            <div class="box box-small" v-for="(post, index) in spotPosts($route.params.spotid)" :key="index">
                                <article class="media">
                                    <div class="media-content">
                                        <div class="content">
                                            <p>
                                                <strong> {{ post.user.name }} </strong> 
                                                <br>
                                                <img :src="post.imageurl">
                                                <br>
                                                {{ post.text }}
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- is Mobile or Tablet -->
            <section v-else>
                卍できてないよ卍
            </section>

        </div>
    </div>
</template>

<script>
import TravelHeader from '~/components/TravelHeader.vue'
import urljoin from 'url-join'

export default {
    components: {
        TravelHeader
    },
    async mounted() {
        let posts = await this.$axios.get(urljoin(process.env.baseUrl,`/api/spots/show`))
        this.posts = posts.data.data
    },
    data() {
        return {
            spotsNews: require('@/assets/data/spotsNews.json'),
            posts: []
        }
    },
    methods: {
        spotPosts(spotid) {
            return this.posts.filter(p=>p.spot.id==spotid)
        }
    }
}
</script>

<style>
#header-space {
    padding-bottom: 52px;
}
iframe {
    width: 100%;
    height: 100%;
}
.top-space {
    margin-top: 20px;
}
.height-box {
    height: calc(100vh - 92px );
}
.box-scroll {
    overflow-y: scroll;
}
.box-small {
    width: 90%;
}
.box-wrapper {
    padding: 2px 5px;
}
</style>