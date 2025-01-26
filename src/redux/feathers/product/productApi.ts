import { TQueryParam, TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: (args) => {
                const params = new URLSearchParams()
                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string)
                    });

                }
                return {
                    url: '/products',
                    method: 'GET',
                    params: params
                }
            },
            transformResponse: (response: TResponseRedux<any[]>) => {
                return {
                    data: response.data,
                    meta: response.meta
                }
            }
        }),
        createProduct: builder.mutation({
            query: (userInfo) => ({
                url: '/products',
                method: 'POST',
                body: userInfo
            })
        }),
    })
})

export const { useCreateProductMutation, useGetAllProductsQuery } = productApi