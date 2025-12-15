import React, { useContext, useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import { IoMdMenu } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import { IoPersonSharp } from "react-icons/io5";

import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';



const SideBar = () => {
  const { getUser, users, selectedUser, setSelecetedUser, unseenMessages, setUnseenMessages } = useContext(ChatContext);


  const { logout, onlineUser } = useContext(AuthContext);
  const [input, setInput] = useState(false);

  const navigate = useNavigate();
  const filterUser = input ? users.filter((user) => user.name.toLowerCase().includes(input.toLowerCase())) : users;

  useEffect(() => {
    getUser();
  }, [onlineUser])

  return (
    <div className={`bg-[#8185B2]/10 h-full p-5 rounded-r-xl overflow-y-scroll text-white
    ${selectedUser ? "max-md:hidden" : ""}`}>
      <div className='pb-5'>
        <div className='flex justify-between items-center'>
          <img src={logo} alt="logo" className='max-w-28' />

          <div className='relative py-2 group'>
            <div className='max-h-5 cursor-pointer'> <IoMdMenu />
            </div>

            <div className='absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#282142] border border-gray-600
               text-gray-600 hidden group-hover:block'>
              <p onClick={() => navigate('/profile')} className='cursor-pointer text-sm'>Edit profile</p>
              <hr className='my-2 border-t border-gray-500' />
              <p onClick={() => logout()} className='cursor-pointer text-sm'>Logout</p>
            </div>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-[#282142] rounded-full py-3 px-4 mt-5'>
          <CiSearch />
          <input onChange={(e) => setInput(e.target.value)} type="text" className='bg-transparent border-none outline-none text-white text-xs *
          placeholder-[#c8c8c8] flex-1'  placeholder='search user' />
        </div>

      </div>

      <div className='flex flex-col'>
        {filterUser?.map((user, index) => (
          <div onClick={() => {setSelecetedUser(user);setUnseenMessages(prev=>({...prev,[user._id]:0}))}}
            key={index} className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer max-sm:text-sm ${selectedUser?._id === user._id
              && 'bg-[#282142]/50'}`}>
                
            {user?.user_image ? (
              <img
                src={user.user_image}
                alt=""
                className="w-[35px] aspect-[1/1] rounded-full object-cover"
              />
            ) : (
              <IoPersonSharp className="w-[35px] h-[35px] p-1 rounded-full bg-gray-500 text-white" />
            )}

            <div className='flex flex-col leading-5'>
              <p>{user.name}</p>
              {
                onlineUser.includes(user._id) ?
                  <span className='text-green-400 text-sm'>online</span>
                  : <span className='text-neutral-400 text-sm'>offline</span>
              }
            </div>
            {unseenMessages[user._id] > 0 && <p className='absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/50'>
              {unseenMessages[user._id]}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SideBar
