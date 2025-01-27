import { TResponseRedux } from "../../../types";
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
        getUserOrder: builder.query({
            query: () => ({
                url: `/orders`,
                method: 'GET',
            }),
            transformResponse: (response: TResponseRedux<any>) => {
                return response.data
            }
        }),
        

    })
})

export const { useCallbackMutation, useGetUserOrderQuery } = productApi