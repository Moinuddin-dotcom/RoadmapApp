import React, { useEffect, useState } from 'react'
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import EditPost from './EditPost';
// import { useParams } from 'react-router-dom';

const Modal = ({ id, onSuccess }) => {
    // const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    console.log('Modal ID:', id);

    const [postData, setPostData] = useState(null);
    // const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data } = await axiosPublic(`/post/single-post/${id}`);
                console.log('Fetched Post Data:', data);
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
            <EditPost postData={postData} onSuccess={onSuccess} />
        </div>
    )
}

export default Modal
