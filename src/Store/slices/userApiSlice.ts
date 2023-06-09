import { ENV } from '../../config/ENV'
import { apiSlice } from '../api'

const USER_URL = ENV.API + '/api/user'
const URL = `${ENV.API}`

export const UserApiSLice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        checkHealth: builder.query({
            query: (route = 'healthcheck') => ({
                url: `${URL}/${route}`
            })
        }),
        login: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}authenticate`,
                method: 'POST',
                body: data
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/register`,
                method: 'POST',
                body: data
            })
        })
    })
})

export const { useCheckHealthQuery, useLoginMutation, useRegisterMutation } = UserApiSLice
