<i18n src="@/assets/locales/anonymoustimeline.json"></i18n>

<template lang="pug">
.wrapper
    section.hero#page-top
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
                        form(@submit.prevent="posting")
                            h1.title.is-4 {{ $t('POST_TITLE') }}
                            b-field
                                .select
                                    select.select.is-fullwidth(v-model="inputSpot")
                                        option(value='', disabled, selected, style='display:none;') {{ $t('SELECT_SPOT') }}
                                        option(v-for="spot in spots", :value="spot.id") {{ spot.locales[$i18n.locale].name }}
                            b-field.file
                                b-upload(v-model="inputFile", accept="image/*")
                                    a.button.is-primary
                                        b-icon(icon="upload")
                                        span {{ $t('SELECT_IMAGE') }}
                                span.file-name
                                    | {{ inputFile===null ? $t('IMAGE_NOTHING'):inputFile.name }}
                            b-field
                                img(:src="postImage")
                            b-field
                                b-input(type="textarea", maxlength="140", :placeholder="$t('INPUT_TEXT')", v-model="inputText")
                            b-field
                                .buttons
                                    button.button.is-fullwidth(type="submit") {{ isSending ? $t('SENDING'):$t('SEND') }}

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
                    infinite-loading(spinner="spiral", @infinite="infiniteHandler", :distance="1")

</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import VImageInput from 'vuetify-image-input'
import anime from 'animejs'

const urljoin = require('url-join')

export default {
    data() {
        return {
            isLoading: false,
            isPosting: false,
            isSending: false,
            inputFile: null,
            inputText: '',
            inputSpot: '',
            spots: require('@/assets/data/spots.json')
                   .concat([require('@/assets/data/spotsOther.json')]),
            posts: []
        }
    },
    components: {
        InfiniteLoading,
        VImageInput
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
            .catch( err => {
                $state.complete()
            } )
        },
        postButtonClick() {
            this.isPosting = !this.isPosting
            if (this.isPosting) {
                this.$scrollTo('#page-top')
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
        },
        posting() {
            if (this.inputFile == null) return 
            if (this.inputSpot == '') return 
            if (this.isSending) return
            this.isSending = true
            let formData = new FormData()
            formData.append('image',this.inputFile )
            formData.append('text', this.inputText )
            formData.append('spot', this.inputSpot )
            this.$axios.post(urljoin(process.env.baseUrl, '/api/spots/upload/anonymous'),
                formData, 
                { 
                    headers: { 
                        'Content-Type': 'multipart/form-data', 
                        'Access-Control-Allow-Origin': '*',
                    }
                }
            )
            .then( res => {
                console.log(res.data);
                this.posts.unshift(res.data.postInfo)
                this.inputFile = null
                this.inputText = ''
                this.inputSpot = ''
            }) 
            .catch( err => {
                console.log(err)
            })
            .finally( _ => {
                this.isPosting = false
                anime({
                    targets: '#plusIcon',
                    rotate: 0
                })
                this.isSending = false
            })
        }
    },
    computed: {
        postImage() {
            return this.inputFile ? window.URL.createObjectURL(this.inputFile) : ''
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