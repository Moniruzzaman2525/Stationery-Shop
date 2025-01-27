import { TRoute, TUserPath } from "../types"

export const routeGenerator = (items: TUserPath[]) => {
    const routes = items.reduce((acc: TRoute[], item) => {    
        if (item.path && item.element) {
            console.log(item)
            acc.push({
                path: item.path,
                element: item.element
            })
        }
    
        if (item.children) {
            item.children.forEach((child) => {
                acc.push({
                    path: child.path!,
                    element: child.element
                })
            })
        }
        return acc
    },[])
console.log(routes)
    return routes
}