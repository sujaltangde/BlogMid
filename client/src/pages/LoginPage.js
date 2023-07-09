import React, { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const {setUserInfo} = useContext(UserContext) ;

  const login = async (e) => {
    e.preventDefault();
    const response = await fetch('/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    if (response.ok) {
        response.json().then(userInfo => {
            setUserInfo(userInfo);
            setRedirect(true) ;
        })
        setShowAlert('success') ;
      setRedirect(true);
    } else {
      setShowAlert('failed') ;
    }

    

    setTimeout(()=>{
      setShowAlert(false)
    },2000);
  };

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <>
      <div className="posts px-4  bg-gradient-to-b from-purple-600 to-black pt-20 flex items-center flex-col  h-screen  md:w-full">


      { showAlert === 'success' ?
      (  <div className="bg-green-500 absolute left-0 w-56 bg-opacity-50 border-t border-b border-green-500 text-white px-4 py-3" role="alert">
          <p className="font-bold">Congratulations !</p>
          <p className="text-sm">Login successful.</p>
        </div> ) :
      showAlert === 'failed' ? ( <div className="bg-red-500 absolute left-0 w-56 bg-opacity-50 border-t border-b border-red-500 text-white px-4 py-3" role="alert">
          <p className="font-bold">Error !</p>
          <p className="text-sm">Login failed, wrong credentials.</p>
        </div> ) : null  }


        <form onSubmit={login} className="login md:w-1/3 w-1/1 flex flex-col gap-6" action="">
          <h1 className=" text-white text-4xl text-center font-bold">Login</h1>
          <input
            onChange={(e) => setUsername(e.target.value)}
            className="px-2 outline-none border  py-2"
            type="text"
            name="username"
            placeholder="username"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="px-2 outline-none  border  py-2"
            type="password"
            name="password"
            placeholder="password"
          />

          <button className="text-white py-2 font-semibold  bg-blue-800">Login</button>

          <p className="text-center text-white font-bold">
            Don't have an account, <Link className="underline text-white" to="/register">Register</Link> here
          </p>
        </form>
      </div>
    </>
  );
};
