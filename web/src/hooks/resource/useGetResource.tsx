
import GetResourceApi from '@/api/resource/get-resource.api'
import { useParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { useQuery } from 'react-query'

export default function useGetResource() {
  const params=  useParams()
  const id = params.id as string;
    
  return (
    useQuery({
        queryKey:["resource",id],queryFn:()=>GetResourceApi(id),
        enabled:id!="",
        refetchOnWindowFocus:false,
        retry:3,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onError({response:{data:{message}},status}){
            toast.error(message||"An error occured")
        }
    })
  )
}