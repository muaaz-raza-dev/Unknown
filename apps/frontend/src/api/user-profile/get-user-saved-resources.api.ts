import { Axios } from "@/lib/Axios"
import { IResourceSearched } from "@/types/Isearched"
import Cookie from "../../../node_modules/@types/js-cookie"


const GetUserSavedResourcesApi = async (payload: { sort: "upvotes" | "createdAt", count: number ,userid:string}) => {
    const response = await Axios.post<{ payload: { resources: IResourceSearched[], total: number } }>("/resource/user/resources/saved", { ...payload }, { headers: { "Authorization": `Bearer ${Cookie.get(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY)}` } })
    return response.data
}
export default GetUserSavedResourcesApi