import React from 'react'
import { useParams } from 'react-router-dom'
import useAxiosPublic from './useAxiosPublic'
import { useQuery } from '@tanstack/react-query'

const useSinglePostById = () => {
    const { id } = useParams()
    const axiosPublic = useAxiosPublic()
    const { data: singlePostData, isLoading, refetch } = useQuery({
        queryKey: ['singlePost', id],
        queryFn: async () => {
            const { data } = await axiosPublic(`/post/single-post/${id}`)
            return data
        }
    })
    return [singlePostData, isLoading, refetch]
}

export default useSinglePostById
