import React, { useContext, useState,useEffect  } from 'react'
import imageData from '../assets/imageData.js'
import { IoPersonSharp } from "react-icons/io5";
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext';


const RightSide = () => {
  const{selectedUser,messages}=useContext(ChatContext)
  const{logout,onlineUser}=useContext(AuthContext);
  const[msgImage,setMsgImage]=useState([]);

  //get all the image from the chat
  useEffect(()=>{
    setMsgImage(
      messages.filter(msg=>msg.image).map(msg=>msg.image)
    )
  },[messages]) 

  return selectedUser && (
    <div className={`bg-[#8185B2]/10 text-white w-full relative overflow-y-scroll ${selectedUser? "max-md:hidden":""}`}>
      {/* In this container user profile and name */}
      <div className='pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto'>
        {selectedUser?.profilePic ? (
  <img
    src={selectedUser.profilePic}
    alt="profile"
    className="w-20 aspect-square rounded-full object-cover"
  />
) : (
  <IoPersonSharp className="w-20 h-20 rounded-full bg-gray-500 p-3" />
)}

        <h1 className='px-10 text-xl font-medium mx-auto flex items-center gap-3'>
         {onlineUser.includes(selectedUser._id)&&<p className='w-2 h-2 rounded-full bg-green-400'></p>} 
          {selectedUser.name}</h1>
      </div>
      <hr className='border-[#ffffff50] my-4'/>
        <div className='px-5 text-xs'>
          <p>Media</p>
          <div className='mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-4 opacity-80'>
            {
              msgImage.map((url,index)=>(
                <div key={index} onClick={()=>window.open(url)} 
                className='cursor-pointer rounded'>
                  <img src={url} alt="" className='h-full rounded-md' />
                </div>
              ))
            }
          </div>
        </div>

        {/* logout button */}
        <button onClick={()=>logout()} className='absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r
         from-purple-400 to-violet-600 text-white border-none text-sm font-light py-2 px-20 
         rounded-full cursor-pointer'>Logout</button>

    </div>
  )
}

export default RightSide
