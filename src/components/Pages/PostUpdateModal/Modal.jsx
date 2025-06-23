import React, { useEffect, useState } from 'react'
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import EditPost from './EditPost';
// import { useParams } from 'react-router-dom';

const Modal = ({ id, onSuccess, isLoading }) => {
    const axiosPublic = useAxiosPublic();

    const [postData, setPostData] = useState(null);
    // const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data } = await axiosPublic(`/post/single-post/${id}`);
                setPostData(data);
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        if (id) {
            fetchPost();
        }
    }, [axiosPublic, id]);

    // if (loading) return <div>Loading...</div>;
    if (!postData) return <div>No post found.</div>;
    return (
        <div>
            <EditPost postData={postData} onSuccess={onSuccess} isLoading={isLoading} />
        </div>
    )
}

export default Modal
