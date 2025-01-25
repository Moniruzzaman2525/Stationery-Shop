import { BaseQueryApi, BaseQueryFn, createApi, DefinitionType, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logOut, setUser } from "../feathers/auth/authSlice";
import { toast } from "sonner";


const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/v1',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token
        if (token) {
            headers.set('authorization', `${token}`)
        }
        return headers
    }
})

const baseQueryRefreshToken: BaseQueryFn<FetchArgs, BaseQueryApi, DefinitionType> = async (args, api, extraOption): Promise<any> => {

    let result = await baseQuery(args, api, extraOption)

    if (result?.error?.status === 404) {
        const errorMessage = (result.error.data as { message: string })?.message;
        if (errorMessage) {
            toast.error(errorMessage);
        }
    }

    if (result?.error?.status === 401) {
        const res = await fetch('http://localhost:5000/api/v1/auth/refresh-token', {
            method: 'POST',
            credentials: 'include'
        })
        const data = await res.json()
        if (data?.data?.accessToken) {
            const user = (api.getState() as RootState).auth.user
            api.dispatch(setUser({
                user,
                token: data.data.accessToken
            }))
            result = await baseQuery(args, api, extraOption)
        } else {
            api.dispatch(logOut())
        }

    }
    return result

}

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQueryRefreshToken,
    endpoints: () => ({})
})

