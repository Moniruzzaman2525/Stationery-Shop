import { TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

const blogApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllBlog: builder.query({
            query: () => ({
                url: `/blogs`,
                method: 'GET',
            }),
            transformResponse: (response: TResponseRedux<any>) => {
                return {
                    data: response.data,
                    meta: response
                }
            }
        }),
        getSingleBlog: builder.query({
            query: (id) => ({
                url: `/blogs/${id}`,
                method: 'GET',
            }),
            transformResponse: (response: TResponseRedux<any>) => {
                return response.data
            }
        }),
    })
})

export const { useGetAllBlogQuery, useGetSingleBlogQuery } = blogApi