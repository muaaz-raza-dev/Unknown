import { Axios } from "@/lib/Axios"
import Cookie from "js-cookie"




const SearchResourceApi = async (payload :{search:string,sort:"upvotes"|"createdAt",count:number}) => {
    const response = await Axios.post("/resource/search", {...payload},{headers: { "Authorization": `Bearer ${Cookie.get(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY)}` } })
    return response.data
}
export default SearchResourceApi