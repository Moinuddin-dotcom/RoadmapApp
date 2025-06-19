import React from 'react'
import useAxiosPublic from './useAxiosPublic'
import { useQuery } from '@tanstack/react-query'

const useAllPost = () => {
    const axiosPublic = useAxiosPublic()

    const { data: allPost = [], refetch } = useQuery({
        queryKey: ['allPost'],
        queryFn: async () => {
            const { data } = await axiosPublic('/post')
            return data
        }
    })
    return [allPost, refetch]
}

export default useAllPost
