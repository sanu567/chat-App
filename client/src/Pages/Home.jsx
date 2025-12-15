import React, { useContext, useState } from 'react'
import SideBar from '../Component/SideBar'
import ChatContainer from '../Component/ChatContainer'
import RightSide from '../Component/RightSide'
import { ChatContext } from '../../context/ChatContext'

const Home = () => {

  const{selectedUser}= useContext(ChatContext);

  return (
   <div className="border w-full h-screen sm:px-[5%] md:px-[10%] lg:px-[15%] sm:py-[5%]">
  <div
    className={`
      backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-full grid grid-cols-1 relative
      ${selectedUser 
        ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]' 
        : 'md:grid-cols-2'
      }
    `}
  >
    {/* Sidebar (always visible on desktop, toggle on mobile) */}
    <SideBar/>

    {/* Chat container (main content) */}
    <ChatContainer  />

    {/* Right side panel (visible only when user selected) */}
    {selectedUser && (
      <RightSide  />
    )}
  </div>
</div>

  )
}

export default Home
