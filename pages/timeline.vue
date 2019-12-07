<template lang="pug">
.wrapper
    section.hero
        .hero-head
            b-navbar(:mobile-burger="false")
                template#navbar-rigth(slot="brand")
                    b-navbar-item(tag="router-link" :to="localePath('index')")
                        h1.title TravelWithUs
                    b-navbar-item(tag="div")
                        .buttons
                            button.button.has-text-centerd(style={'border-radius': '50%', 
                                                                　'border-color': 'black',
                                                                　'border-width': '2px'})
                                i.fa.fa-plus
// TODO: ここから
                
                
</template>

<script>
export default {
    fetch ({ app, store, redirect }) {
        if (!store.state.auth.authUser) {
            return redirect('/login?redirect='+app.localePath('timeline'))
        }
    }
}
</script>
