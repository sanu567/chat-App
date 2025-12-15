import React, { useContext, useEffect, useRef,useState } from 'react'
import logo from '../assets/logo.png';
import { FiSend } from "react-icons/fi";
import { IoPersonSharp } from "react-icons/io5";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { formatMessageTime } from '../Lib/Utilis';
import { IoMdArrowBack } from "react-icons/io";
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';


const ChatContainer = () => {

 const { messages, selectedUser,setSelecetedUser, sendMessages, getMessages } = useContext(ChatContext);
  const{authUser,onlineUser}=useContext(AuthContext)

  const scrollEnd=useRef();

  const [input,setInput]=useState('');

  // handle sending messages
  const handleSendMessage=async (e) => {
    e.preventDefault();
    if(input.trim()==="")return null;
    await sendMessages({text:input.trim()});
    setInput("")
  }

  // handel sending an image
  const handleSendImages=async (e) => {
    const file=e.target.files[0];
    if(!file || !file.type.startsWith("image/")){
      toast.error("selecte an image file")
    }
    const reader=new FileReader();
    reader.onloadend=async () => {
      await sendMessages({image:reader.result})
      e.target.value=""
    }
    reader.readAsDataURL(file);
  }

  useEffect(()=>{
    if(selectedUser){
      getMessages(selectedUser._id)
    }
  },[selectedUser])

  useEffect(()=>{
    if(scrollEnd.current && messages){
      scrollEnd.current.scrollIntoView({behavior:"smooth"})
    }
  },[messages])

  return  selectedUser?(
    <div className='h-full overflow-scroll relative backdrop-blur-lg'>
      {/* header */}
      <div className='flex items-center gap-3 py-3 mx-4 border-b border-stone-500'>
        {selectedUser.profilePic ? (
  <img
    src={selectedUser.profilePic}
    alt=""
    className="w-8 rounded-full"
  />
) : (
  <IoPersonSharp className="w-8 h-8 text-white bg-gray-500 rounded-full" />
)}

        <p className='flex text-lg text-white flex-1 items-center gap-2 '>{selectedUser?.name}
          {onlineUser.includes(selectedUser._id)&&
          <span className='w-2 h-2 rounded-full bg-green-500'></span>}
        </p>
        <div onClick={()=>setSelecetedUser(null)} className='md:hidden max-w-7'><IoMdArrowBack className='w-5 cursor-pointer'/></div>
        <div className='max-md:hidden max-w-5 text-white text-2xl'>< IoIosHelpCircleOutline /></div>
      </div>
      {/* chat area */}
      <div className='flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6'>
        {messages.map((msg, index) => (
  <div
    key={index}
    className={`flex items-end gap-2 mt-3 ${
    msg.senderId === authUser._id ? "justify-end" : "justify-start"
  }`}
  >
    {/* ✅ Show text and/or image correctly */}
   {msg.image && (
  <img
    src={msg.image}
    alt="message"
    className="max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8"
  />
)}

    {msg.text && (
      <p
        className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500/30 text-white ${
  msg.senderId === authUser._id
    ? "rounded-br-none"   // your bubble (right)
    : "rounded-bl-none"   // their bubble (left)
}`}
      >
        {msg.text}
      </p>
    )}

    {/* ✅ Avatar and timestamp */}
    <div className="text-center text-sm ">
      {msg.senderId === authUser._id ?  (
  authUser?.profilePic ? (
    <img
      src={authUser.profilePic}
      alt="me"
      className="w-7 h-7 rounded-full object-cover"
    />
  ) : (
    <IoPersonSharp className="w-7 h-7 text-white rounded-full bg-violet-400 p-1" />
  )
)  : (
       
          selectedUser?.profilePic ? (
      <img
        src={selectedUser.profilePic}
        className="w-7 h-7 rounded-full object-cover"
        alt="user"
      />
    ) : (
      <IoPersonSharp className="w-7 h-7 text-white bg-gray-500 rounded-full p-1 " />
    )
      )}
      <p className="text-gray-500">{formatMessageTime( msg.createdAt)}</p>
    </div>
  </div>
))}
  <div ref={scrollEnd}></div>
      </div>

      {/* bottom area */}
        <div className='w-full flex items-center gap-3 p-3 border-t border-stone-500 bg-black/30'>
        <div className='flex-1 flex items-center bg-gray-100/20 px-3 rounded-full'>
          <input
          onChange={(e)=>setInput(e.target.value)} value={input} onKeyDown={(e)=>e.key==="Enter"?handleSendMessage(e):null}
            type="text"
            placeholder='Send a message'
            className='flex-1 p-3 text-sm bg-transparent outline-none border-none text-white placeholder-gray-400'
          />
          <input onChange={handleSendImages} type="file" id='image' accept='image/png, image/jpeg' hidden />
          <label htmlFor="image" className='cursor-pointer text-xl'>📎</label>
        </div>
        <FiSend onClick={handleSendMessage} className='w-7 h-7 cursor-pointer text-white' />
      </div>

    </div> 
  ):(
    <div className='hidden md:flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 '>
      <img src={logo} alt=""  className='w-16 h-16 object-contain'/>
      <p className='text-lg font-medium text-white'>Chat anytime, anywhere</p>
    </div>
  )
}

export default ChatContainer
