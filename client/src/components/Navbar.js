import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { FaBars } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';



export const Navbar = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);

  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    fetch('/profile', {
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((userInfo) => {
        setUserInfo(userInfo);
      });
  }, [setUserInfo]);


  const logout = () => {
    fetch('/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  };

  const username = userInfo?.username;


  return (
    <>
      <nav className=' ' >
        <div className="flex w-full  py-2 text-xl justify-between md:px-11 px-5 text-white bg-gray-800">
          <div className='flex justify-start items-center gap-3'>
            <span><img src='/images/logo.png' className='h-9' alt="" /> </span>
            <Link to="/" className="font-bold  text-2xl">
              BlogMid
            </Link>
          </div>


          <div className='' >

            {toggle ?
              <FaBars onClick={() => { setToggle(false) }} className='cursor-pointer md:hidden flex mt-1' size={25} /> :
              <RxCross2 onClick={() => { setToggle(true) }} className='cursor-pointer md:hidden flex mt-1 font-bold' size={25} />
            }
            <nav className={` md:hidden ${toggle ? 'hidden' : 'flex'} absolute right-0 px-3  py-4 mt-3 bg-gray-800 z-0`} >

              {username ? (
                <div className="flex md:flex-row text-center flex-col md:gap-9 gap-4">
                  <Link to="/create" className="font-bold cursor-pointer md:text-xl text-lg">
                    New Post
                  </Link>
                  <button onClick={logout} className="font-bold md:text-xl cursor-pointer text-lg">
                    Logout
                  </button>
                </div>
              )
                :
                (
                  <div className="flex md:flex-row text-center flex-col md:gap-9 gap-4">
                    <Link to="/login" className="font-bold md:text-xl text-lg">
                      Login
                    </Link>
                    <Link to="/register" className="font-bold md:text-xl text-lg">
                      Register
                    </Link>
                  </div>
                )}
            </nav>




            <nav className=' md:flex hidden ' >

              {username ? (
                <div className="flex md:flex-row text-center flex-col md:gap-9 gap-1">
                  <Link to="/create" className="font-bold md:text-xl text-lg">
                    New Post
                  </Link>
                  <button onClick={logout} className="font-bold md:text-xl text-lg">
                    Logout
                  </button>
                </div>
              )
                :
                (
                  <div className="flex md:flex-row text-center flex-col md:gap-9 gap-1">
                    <Link to="/login" className="font-bold md:text-xl text-lg">
                      Login
                    </Link>
                    <Link to="/register" className="font-bold md:text-xl text-lg">
                      Register
                    </Link>

                  </div>
                )}
            </nav>

          </div>
        </div>
      </nav>








    </>
  );
};
