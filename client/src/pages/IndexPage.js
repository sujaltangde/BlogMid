import React, { useEffect, useState } from 'react';
import { Post } from '../components/Post';

export const IndexPage = () => {
  const [posts, setPosts] = useState([]);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {

      try {
        setLoading(true);
        const response = await fetch('/post');
        const data = await response.json();
        setPosts(data);
        setLoading(false)
      } catch (error) {
        console.error('Errors fetching posts:', error);
        setLoading(false)

      }
    };

    fetchPosts();
  }, []);

  return (
    <>

      <div className="posts gap-5 pt-7 pb-10 justify-center  min-h-screen bg-gradient-to-b from-purple-600 to-black md:gap-3 p1-4 w-1/1 w-full grid grid-cols-1 md:grid-cols-1 ">



        <div className="writer text-center px-4 w-full text-xl  pb-3 text-white font-bold    ">
          <p className='animate-none underline '>Ignite Your Ideas, Elevate Your Voice: Unleash Your Blogging Potential!</p>
        </div>



        {Loading && <div className='justify-center items-start flex' > <img src="/images/loader.svg" alt="" /> </div>}
        <div className='grid grid-cols-1 px-4 gap-3' >
          {posts.length > 0 &&
            posts.map((post) => <Post key={post._id} {...post} />)}
        </div>

      </div>


    </>
  );
};
