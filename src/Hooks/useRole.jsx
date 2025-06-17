
import { useQuery } from '@tanstack/react-query'
import useAxiosPublic from './useAxiosPublic'
import useAuth from './useAuth'

const useRole = () => {
    const axiosPublic = useAxiosPublic()

    const { user } = useAuth()
    const { data: role = [], isLoading } = useQuery({
        queryKey: ['role', user?.email],
        // enabled: !!user?.email,
        queryFn: async () => {
            const { data } = await axiosPublic(`/users/role/${user?.email}`)
            return data.role
        }
    })
    return [role, isLoading]
}

export default useRole
