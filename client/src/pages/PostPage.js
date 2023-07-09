import { format } from 'date-fns';
import React, { useEffect, useState, useContext } from 'react'
import { useParams, Link } from 'react-router-dom';
import { UserContext } from '../UserContext'


export const PostPage = () => {

    const [postInfo, setPostInfo] = useState(null)
    const { id } = useParams();
    const { userInfo } = useContext(UserContext)
    useEffect(() => {
        fetch(`/post/${id}`)
            .then(response => {
                response.json().then(postInfo => {
                    setPostInfo(postInfo);
                })
            })
    })

    if (!postInfo) return '';
    return (
        <> 
           <div className=' min-h-screen flex justify-center pt-10 pb-20 py-3 rounded items-center bg-gradient-to-b from-purple-600 to-black w-1/1'>
                <div className='flex flex-col min-h-screen  justify-start py-4 text-white bg-gray-800 md:w-2/3 w-1/1 items-center' >
                    

                    <h1 className='text-center md:text-4xl text-3xl py-2 pb-4 px-2 font-bold' >{postInfo.title}</h1>


                    <div className='image py-3 ' >
                        <img src={`/${postInfo.cover}`} className='px-5' alt="" />

                    </div>

                    <div className='font-semibold md:px-10 px-5 py-3' dangerouslySetInnerHTML={{ __html: postInfo.content }} />

                    <p className='font-semibold text-lg'>Author : {postInfo.author.username}</p>

                    <time className='font-semibold pt-7 pb-4' >{format(new Date(postInfo.createdAt), 'dd-MM-yyyy | HH:mm a')}</time>
                    {userInfo.id === postInfo.author._id && (
                        <div className='py-3'>
                            <Link to={`/edit/${postInfo._id}`} className='edit px-3 py-2 bg-blue-800 font-semibold text-white ' >Edit this Post</Link>
                        </div>
                    )}
                </div>
            </div>
            




        </>
    )
}
