
const urljoin = require('url-join')

export const state = () => ({
    authUser: null
})

export const mutations = {
    authedUser(state, data) {
        state.authUser = data
    },
    changeImage(state, imageurl) {
        if (!!state.authUser) {
            state.authUser.imageurl = imageurl
        }
    },
    changeName(state, name) {
        if (!!state.authUser) {
            state.authUser.name = name
        }
    },
    changeDescription(state, description) {
        if (!!state.authUser) {
            state.authUser.description = description
        }
    }
}

export const actions = {
    nuxtServerInit({ commit }, { req }) {
        if ( req.session && req.session.authUser ) {
            commit('authedUser', req.session.authUser)
        }
    },
    async login({ commit }, { email, password }) {
        return await this.$axios.post( urljoin(process.env.baseUrl, '/api/auth/login'), {
            email,
            password
        }, { headers: { 
            'Content-Type': 'application/json', 
            'Access-Control-Allow-Origin': '*',
        } })
        .then( (res) => {
            commit('authedUser', res.data)
        })
        .catch( (err) => {
            console.log(err);
            if (err.response.status === 401) {
                throw new Error(err.response.data.error)
            } else {
                throw new Error('Mysterious error')
            }
        })
    },
    async changeImage({ commit }, { imageurl }) {
        commit('changeImage', imageurl)
    },
    async changeName({ commit }, { name }) {
        commit('changeName', name)
    },
    async changeDescription({ commit }, { description }) {
        commit('changeDescription', description)
    },
    async logout({ commit }) {
        return this.$axios.post( urljoin(process.env.baseUrl, '/api/auth/logout'), {}, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        }).then(() => {
            commit('authedUser', null)
        })
    },
    async signup({}, { name, email, password }) {
        return this.$axios.post( urljoin(process.env.baseUrl, '/api/auth/signup'), {
            name, email, password
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        }).then( (res) => {
            return res.data
        }).catch( (err) => {
            if ( err.response.status === 400 ) {
                throw new Error(err.response.data.error)
            } else {
                throw new Error('Mysterious error')
            }
        })
    }
}
