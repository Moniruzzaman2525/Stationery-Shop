import {  TOrder, TResponseRedux, TUser } from "../../../types";
import { baseApi } from "../../api/baseApi";

const adminApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllOrder: builder.query({
            query: () => ({
                url: `/admin/view-all-order`,
                method: 'GET',
            }),
            transformResponse: (response: TResponseRedux<TOrder[]>) => {
                console.log(response)
                return {
                    data: response.data,
                    meta: response.meta
                }
            }
        }),
        
        getAllUser: builder.query({
            query: () => ({
                url: `/admin/all-user`,
                method: 'GET',
            }),
            transformResponse: (response: TResponseRedux<TUser[]>) => {
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
        updateProduct: builder.mutation({
            query: (data) => {
                const productId = data.id; 

                return {
                    url: `/admin/product/${productId}/update`,
                    method: 'PATCH',
                    body: data,
                };
            },
        }),
        
        confirmUserOrder: builder.mutation({
            query: (userId) => ({
                url: `/admin/order/${userId}/confirm`,
                method: 'PATCH',
            }),
        }),
        deleteProduct: builder.mutation({
            query: (userId) => ({
                url: `/products/${userId}`,
                method: 'DELETE',
            }),
        }),

    })
})

export const { useGetAllOrderQuery, useGetAllUserQuery, useBlockUserMutation, useConfirmUserOrderMutation, useUpdateProductMutation, useDeleteProductMutation } = adminApi