import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ENV } from '../config/ENV'

const baseQuery = fetchBaseQuery({ baseUrl: ENV.API })

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User'],
    endpoints: () => ({})
})
