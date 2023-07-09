import React from 'react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

export const Post = ({ _id, title, summary, cover, content, createdAt, author }) => {
  return (
    <>

  
      <div className='post  md:px-9 md:py-2 p-3  rounded bg-gray-800 text-white   md:mx-56 items-center gap-2 grid md:grid-cols-2 grid-cols-1 ' >

        <div className='w-full' >
          <Link className='w-full' to={`/post/${_id}`} >
            <img src={'/' + cover} alt="" className='  md:w-full md:h-52 ' />
          </Link>
        </div>

        <div className='md:px-2 pb-2'>
          <Link className='w-full' to={`/post/${_id}`} >
            <h2 className='md:py-3 text-xl  font-bold ' >{title}</h2>
          </Link>

          <div className="info md:pb-2 font-semibold flex flex-row gap-3">
            <a className='auther' href="/">{author.username}</a>
            <time>{format(new Date(createdAt), 'dd-MM-yyyy  HH:mm a')}</time>
          </div>
          <p className='font-semibold' >{summary}</p>
        </div>

      </div>

    </>
  )
}
