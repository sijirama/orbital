import { ENV } from '../../config/ENV'
import { apiSlice } from '../api'

const USER_URL = ENV.API + '/api/user/'
const THE_URL = `${ENV.API}`

export const UserApiSLice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        checkHealth: builder.query({
            query: (route = 'healthcheck') => ({
                url: `${THE_URL}/${route}`
            })
        }),
        login: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}authenticate`,
                method: 'POST',
                body: data,
                credentials: 'include'
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}register`,
                method: 'POST',
                body: data
            })
        }),
        forgotPassword: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}forgotPassword`,
                method: 'POST',
                body: data
            })
        }),
        resetPassword: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}resetPassword/${data.token}`,
                method: 'POST',
                body: data
            })
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}updateUser`,
                method: 'PATCH',
                body: data
            })
        }),
        updatePassword: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}updateUserPassword`,
                method: 'PATCH',
                body: data
            })
        }),
        getUser: builder.mutation({
            query: () => ({
                url: `${USER_URL}getUser`,
                method: 'GET'
            })
        })
    })
})

export const {
    useCheckHealthQuery,
    useLoginMutation,
    useRegisterMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useUpdateUserMutation,
    useGetUserMutation,
    useUpdatePasswordMutation
} = UserApiSLice
