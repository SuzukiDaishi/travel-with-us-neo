<template>
    <div>
        <header>
            <travel-header />
            <div id="header-space"></div>
        </header>
        <div>
            
            <!-- is PC or Tablet -->
            <div v-if="$device.isDesktopOrTablet">
                <iframe :src="spotsNews.filter(i=>i.id==$route.params.spotid)[0][$i18n.locale].path"></iframe>
            </div>

            <!-- is Mobile -->
            <div v-else>
            </div>

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
        console.log(posts.data.data);
    },
    data() {
        return {
            spotsNews: require('@/assets/data/spotsNews.json'),
        }
    },
}
</script>

<style>
#header-space {
    padding-bottom: 52px;
}
</style>