import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        callback: builder.mutation({
            query: (userInfo) => ({
                url: '/orders/callback',
                method: 'POST',
                body: userInfo
            })
        }),
       
    })
})

export const { useCallbackMutation } = productApi