import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PostFrom from './PostFrom';

const CreatePost = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className='text-center'>
            {/* <Link to={'/createPostPage'}>
                <button className='bg-black/90 text-white px-10 py-2 rounded-lg cursor-pointer '>Create Post</button>
            </Link> */}
            <div className="p-6">
                {/* Button to open Modal */}
                <button
                    onClick={() => setIsOpen(true)}
                    className="px-12 py-2 bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg cursor-pointer"
                >
                    Create Post
                </button>

                {/* Modal */}
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg w-[90%] max-w-2xl shadow-lg relative">
                            <PostFrom />
                            {/* Close button */}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-2 bg-red-500 text-white rounded-md"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CreatePost
