import React, { useState } from 'react'
import { Link } from 'react-router-dom'


export const RegisterPage = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
 

  const register = async (e) => {
    e.preventDefault();

    const response = await fetch('/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' }
    })

    if (response.status === 200) {
      setShowAlert('success') ;
          
      
    } else {
      setShowAlert('failed') ;
    }

    setTimeout(()=>{
      setShowAlert(false)
    },2000);
  } 

  
  return (
    <>
      <div className='posts pt-20  bg-gradient-to-b from-purple-600 to-black px-4  flex items-center flex-col  h-screen md:w-full '>

{ showAlert === 'success' ?
      (  <div className="bg-green-500 absolute left-0 w-56 bg-opacity-50 border-t border-b border-green-500 text-white px-4 py-3" role="alert">
          <p className="font-bold">Congratulations !</p>
          <p className="text-sm">Registration successful, now you can login.</p>
        </div> ) :
      showAlert === 'failed' ? ( <div className="bg-red-500 absolute left-0 w-56 bg-opacity-50 border-t border-b border-red-500 text-white px-4 py-3" role="alert">
          <p className="font-bold">Error !</p>
          <p className="text-sm">Registration failed, account already exists.</p>
        </div> ) : null  }

        <form className='login  md:w-1/3 w-1/1 flex flex-col gap-6' onSubmit={register} action="">

          <h1 className='text-4xl text-white text-center font-bold'>Register</h1>
          <input className='px-2 outline-none border  py-2' type="text" name='username' placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} />

          <input className='px-2 outline-none  border py-2' type="password" name='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />

          <button className='text-white py-2 font-semibold  bg-blue-800' >Register</button>
          <p className='text-center text-white font-bold'>Already have a account, <Link className='underline text-white' to="/login">Login</Link > here</p>
        </form>

      </div>

    </>
  )
}
