import { TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

const adminApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllOrder: builder.query({
            query: () => ({
                url: `/orders/view-all-order`,
                method: 'GET',
            }),
            transformResponse: (response: TResponseRedux<any>) => {
                return response.data
            }
        }),
        
        getAllUser: builder.query({
            query: () => ({
                url: `/auth/all-user`,
                method: 'GET',
            }),
            transformResponse: (response: TResponseRedux<any>) => {
                return response.data
            }
        }),
        

    })
})

export const { useGetAllOrderQuery } = adminApi