import axios from 'axios'

const state = {
    product: [],
    time: []
}

const getters = {
    allProducts: (state) => state.product
}

const actions = {
    async fetchTodos ({ commit }) {
        const response = await axios.get('http://localhost:3030/api/v1/auth/producList', {
            headers: {
                Authorization: localStorage.getItem('token')
            }
    })
    commit('setTodos', response.data.data)
    }
}

const mutations = {
    setTodos: (state, product) => { state.product = product }
}

export default {
    state,
    mutations,
    getters,
    actions
}
