import React from 'react'
import useAxiosPublic from './useAxiosPublic'
import { useQuery } from '@tanstack/react-query'

const useAllPost = ({ category = '', sortOrder = '' } = {}) => {
    const axiosPublic = useAxiosPublic()

    const { data: allPost = [], refetch, isLoading } = useQuery({
        queryKey: ['allPost', category, sortOrder],
        queryFn: async () => {
            const params = {}
            if (category) params.category = category;
            if (sortOrder) {
                params.sortBy = 'likes';
                params.sortOrder = sortOrder;
            }
            const { data } = await axiosPublic('/post', { params })
            return data
        }
    })
    return [allPost, refetch, isLoading]
}

export default useAllPost
