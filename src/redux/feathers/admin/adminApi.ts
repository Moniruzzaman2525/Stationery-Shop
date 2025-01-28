import { TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

const adminApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllOrder: builder.query({
            query: () => ({
                url: `/admin/view-all-order`,
                method: 'GET',
            }),
            transformResponse: (response: TResponseRedux<any>) => {
                return response.data
            }
        }),
        
        getAllUser: builder.query({
            query: () => ({
                url: `/admin/all-user`,
                method: 'GET',
            }),
            transformResponse: (response: TResponseRedux<any>) => {
                return response.data
            }
        }),
        blockUser: builder.mutation({
            query: (data) => {
                const userId = data.id; 
                const status = {
                    status: data.status
                }

                return {
                    url: `/admin/users/${userId}/block`,
                    method: 'PATCH',
                    body: status,
                };
            },
        }),
        
        confirmUserOrder: builder.mutation({
            query: (userId) => ({
                url: `/admin/order/${userId}/confirm`,
                method: 'PATCH',
            }),
        }),

    })
})

export const { useGetAllOrderQuery, useGetAllUserQuery, useBlockUserMutation, useConfirmUserOrderMutation } = adminApi