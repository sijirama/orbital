import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
//import { ENV } from '../config/ENV'

//const baseQuery = fetchBaseQuery({ baseUrl: ENV.API })
//const baseQuery = fetchBaseQuery({ baseUrl: 'https://orbitalbackend.onrender.com' })
const baseQuery = fetchBaseQuery({ baseUrl: '', credentials: 'include' })

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User'],
    endpoints: () => ({})
})
