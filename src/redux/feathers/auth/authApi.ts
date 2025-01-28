import { TResponseRedux, TUser } from "../../../types";
import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        registration: builder.mutation({
            query: (userInfo) => ({
                url: '/auth/register',
                method: 'POST',
                body: userInfo
            })
        }),
        login: builder.mutation({
            query: (userInfo) => ({
                url: '/auth/login',
                method: 'POST',
                body: userInfo
            }),
        }),
        updateUser: builder.mutation({
            query: (userInfo) => ({
                url: '/auth/update-profile',
                method: 'PATCH',
                body: userInfo
            }),
        }),
        getMe: builder.query({
            query: () => ({
                url: `/auth/me`,
                method: 'GET',
            }),
            transformResponse: (response: TResponseRedux<TUser>) => {
                return response.data
            }
        }),
    })
})

export const { useRegistrationMutation, useLoginMutation, useGetMeQuery, useUpdateUserMutation } = authApi