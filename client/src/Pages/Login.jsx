import React, { useContext, useState } from 'react'
import logo from '../assets/logo.png'
import { IoMdArrowBack } from "react-icons/io";
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const [currstate, setCurrstate] = useState("sign up");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [issubmitted, setIssubmitted] = useState(false);

  const {login}=useContext(AuthContext);

  const onSubmitHandler=(e)=>{
    e.preventDefault();
    if(currstate==='sign up' && !issubmitted){
      setIssubmitted(true)
      return;
    }
    const payload = currstate === 'sign up'
        ? { name: fullname, email, password, bio }
        : { email, password };

    login(currstate === "sign up" ? "signup" : "login", payload);
  }

  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8
     sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
      {/* left  side*/}
      <img src={logo} alt="" className='w-[min(30vw,250px)]' />

      {/* right side */}
      <form onSubmit={onSubmitHandler} className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col
       gap-6 rounded-lg shadow-lg'>
        <h2 className='font-medium text-2xl flex justify-between items-center gap-1'>
          {currstate}
          {issubmitted && <IoMdArrowBack className='w-5 cursor-pointer' onClick={()=>{setIssubmitted(false)}} />}
          
        </h2>

        {currstate === "sign up" && !issubmitted &&
          (
            <input type="text" placeholder='Full name' onChange={(e) => setFullname(e.target.value)}
              value={fullname}
              className='p-2 border border-gray-500 rounded-md focus:outline-none bg-transparent'
              required />
          )}

        {!issubmitted && (
          <>
            <input type="email" placeholder='Email Addres' onChange={(e) => setEmail(e.target.value)}
              value={email}
              className='p-2  border border-gray-500 rounded-md focus:outline-none bg-transparent
            focus:ring-2 focus:ring-indigo-500'
              required />

               <input type="password" placeholder='Enter password' onChange={(e) => setPassword(e.target.value)}
              value={password}
              className='p-2  border border-gray-500 rounded-md focus:outline-none bg-transparent 
            focus:ring-2 focus:ring-indigo-500'
              required />
          </>
        )}

        {
          currstate ==="sign up" && issubmitted &&(
            <textarea rows={4} 
            onChange={(e)=>setBio(e.target.value)}
            value={bio}
            className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 bg-transparent 
            focus:ring-indigo-500' placeholder='proived a short bio' required>

            </textarea>
          )}

          <button type='submit'
           className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white
           rounded-md cursor-pointer'>
            {
              currstate ==="sign up"? "Create Account" : "Login Now"
            }
          </button>

            <div className='flex items-center gap-2 text-sm text-gray-500'>
              <input type="checkbox" />
              <p>Agree to the terms of use & privacy policy</p>
              </div>

              <div className='flex flex-col gap-2'>
                  {currstate ==="sign up"? (
                    <p className='text-sm text-gray-600'>Already have an account?
                     <span className='font-medium text-violet-500 cursor-pointer '
                     onClick={()=>{setCurrstate("login"),setIssubmitted(false)}}>Login here</span>
                     </p>
                  ):(
                    <p className='text-sm text-gray-500'>Create an account 
                    <span className='font-medium text-violet-500 cursor-pointer' onClick={()=>{setCurrstate("sign up")}}>Register here</span>
                    </p>
                  )}
              </div>

      </form>
    </div>
  )
}

export default Login
