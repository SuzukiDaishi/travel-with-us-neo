<template>
  <div>
    <nuxt/>
  </div>
</template>

<script>
export default {
  head () {
    const i18nSeo = this.$nuxtI18nSeo()
    return {
      htmlAttrs: {
        // My HtmlAttrs
        ...i18nSeo.htmlAttrs
      },
      meta: [
        // My Metas
        ...i18nSeo.meta
      ],
      link: [
        // My Links
        ...i18nSeo.link
     ]
    }
  }
}
</script>

<style>
</style>

