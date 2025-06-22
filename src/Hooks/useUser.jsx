import React from 'react'
import useAxiosPublic from './useAxiosPublic'
import useAuth from './useAuth'
import { useQuery } from '@tanstack/react-query'

const useUser = () => {
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth()

    const { data: userData = [], isLoading } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
            const { data } = await axiosPublic(`/users/singleUser/${user?.email}`)
            console.log(data)
            return data
        }
    })
    return [userData, isLoading]
}

export default useUser
