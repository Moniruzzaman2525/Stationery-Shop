import { ReactNode } from "react";


export type TUserPath = {
    name: string;
    path?: string;
    element?: ReactNode;
    children?: TUserPath[]
}

export type TSlideBarItem = {
    key: string;
    label: ReactNode,
    children?: TSlideBarItem[]
} | undefined

export type TRoute = {
    path: string;
    element: ReactNode
}

