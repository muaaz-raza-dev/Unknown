import GetUserProfileInformationApi from '@/api/user-profile/get-user-profile-information.api'
import { useParams } from 'next/navigation'
import { useQuery } from 'react-query'

export default function useGetUserProfileInfomartion({hitApi}:{hitApi?:boolean}) {
    const userid= useParams().user as string
  return (
    useQuery({
        queryKey: ['user-profile',userid],
        queryFn: () => GetUserProfileInformationApi(userid),
        enabled: !!userid||hitApi,
        refetchOnWindowFocus: false,
        refetchInterval: 60 * 60 * 1000, // 1 hour
    })
  )
}