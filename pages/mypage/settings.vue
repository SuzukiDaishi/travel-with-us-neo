<i18n src="@/assets/locales/mypageSetting.json"></i18n>

<template lang="pug">
section.section
    form.container(@submit.prevent)
        label.label {{ $t('CHANGE_NAME') }}
        .field
            .control
                input.input(type="text", :placeholder="$t('CHANGE_NAME_PLACEHOLDER')", v-model="nameData")
        .field
            .control
                button.button.is-fullwidth(type="submit", @click="updateName()")
                    | {{ changeNamebutton }}

    form.container(@submit.prevent)
        label.label {{ $t('CHANGE_IMAGE') }}
        .field
            .file.is-midiam.has-name.is-fullwidth
                label.file-label
                    input.file-input(type="file", ref="file", name="image", accept="image/*", @change="setImage") 
                    span.file-cta
                        span.file-icon
                            i.fa.fa-upload
                        span.file-Label
                            | {{ $t('CHANGE_IMAGE_SELECT') }}
                    span.file-name
                        | {{ imgName }}
        .field
            .control
                button.button.is-fullwidth(type="submit", @click="uploadImage()")
                    | {{ changeImagebutton }}

    form.container(@submit.prevent)
        label.label {{ $t('CHANGE_DESCRIPTION') }}
        .field
            textarea.textarea.has-fixed-size(:placeholder="$t('CHANGE_DESCRIPTION_PLACEHOLDER')", 
                                             v-model="descriptionData", maxlength="300")
        .field
            .control
                button.button.is-fullwidth(type="submit", @click="updateDescription()")
                    | {{ changeDescriptionbutton }}
</template>

<script>
const urljoin = require('url-join')

export default {
    data() {
        return {
            imgName: '',
            imgData: null,
            changeImagebutton: this.$t('CHANGE_IMAGE_BUTTON'),
            nameData: '',
            changeNamebutton: this.$t('CHANGE_NAME_BUTTON'),
            descriptionData: '',
            changeDescriptionbutton: this.$t('CHANGE_DESCRIPTION_BUTTON')
        }
    },
    methods: {
        setImage() {
            const files = this.$refs.file
            const fileImg = files.files[0]
            if (fileImg.type.startsWith("image/")) {
                this.imgData = fileImg
                this.imgName = fileImg.name
            }
        },
        uploadImage() {
            if (this.imgData==null) return
            this.changeImagebutton = this.$t('CHANGE_IMAGE_LOADING')
            let formData = new FormData()
            formData.append('image',this.imgData )
            this.$axios.post(urljoin(process.env.baseUrl, '/api/user/change/image'), 
                formData, { 
                    headers: { 
                        'Content-Type': 'multipart/form-data', 
                        'Access-Control-Allow-Origin': '*',
                    }
                }
            )
            .then( res => {
                this.$refs.file.value = ''
                this.imgData = ''
                this.imgName = ''
                this.$parent.image = res.data.imageLink
                this.$store.dispatch('auth/changeImage', { imageurl: res.data.imageLink })
                this.changeImagebutton = this.$t('CHANGE_IMAGE_ERROR')
            })
            .finally( _ => {
                this.changeImagebutton = this.$t('CHANGE_IMAGE_BUTTON')
            })
        },
        updateName() {
            if (!this.nameData) return
            this.changeNamebutton = this.$t('CHANGE_IMAGE_LOADING')
            this.$axios.post(urljoin(process.env.baseUrl, '/api/user/change/name'), {
                name: this.nameData
            })
            .then( res => {
                this.nameData = ''
                this.$parent.name = res.data.name
                this.$store.dispatch('auth/changeName', { name: res.data.name })
            })
            .finally( _ => {
                this.changeNamebutton = this.$t('CHANGE_NAME_BUTTON')
            })
        },
        updateDescription() {
            if (!this.changeDescriptionbutton) return 
            this.changeDescriptionbutton = this.$t('CHANGE_DESCRIPTION_LOADING')
            this.$axios.post(urljoin(process.env.baseUrl, '/api/user/change/description'), {
                description: this.descriptionData
            })
            .then( res => {
                this.descriptionData = ''
                this.$parent.description = res.data.description
                this.$store.dispatch('auth/changeDescription', { description: res.data.description })
            })
            .finally( _ => {
                this.changeDescriptionbutton = this.$t('CHANGE_DESCRIPTION_BUTTON')
            })
        }
    }
}
</script>