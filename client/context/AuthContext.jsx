import { Children, createContext, useEffect, useState } from "react";
import axios from 'axios';
import toast from "react-hot-toast";
import{io} from 'socket.io-client'
import { useNavigate } from "react-router-dom";

const backendUrl="https://chat-app-backendserver.onrender.com;
axios.defaults.baseURL=backendUrl;

export const AuthContext= createContext();
  
axios.defaults.withCredentials=true;

export const AuthProvider=({children})=>{
    const[token,setToken]=useState(localStorage.getItem("token"));
    const[authUser,setAuthUser]=useState(null);
    const[onlineUser,setOnlineUser]=useState([]);
    const[socket,setSocket]=useState(null);
    const navigate=useNavigate();

    // check auth user
    const checkAuth=async()=>{
        try {
            const{data}=await axios.get('/api/auth/check-auth');
            if(data.success){
                setAuthUser(data.user);
                connectsocket(data.user);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
// login function
    const login=async(state,Credentials)=>{
        try {
            const {data}=await axios.post(`/api/auth/${state}`,Credentials);
            if(data.success){
                setAuthUser(data.user);
                connectsocket(data.user);
                axios.defaults.headers.common["token"]=data.token;
                setToken(data.token);
                localStorage.setItem("token",data.token);
                navigate('/')
                toast.success(data.message);
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    // logout function
    const logout=async()=>{
        localStorage.removeItem("token");
        setToken(null);
        setAuthUser(null);
        setOnlineUser([]);
        axios.defaults.headers.common["token"]=null;
        toast.success("logged out successfully");
        socket.disconnect();
    }
    // update profile function 
  const updateProfile = async (body) => {
    try {
        const { data } = await axios.put("/api/auth/update-profile", body);

        if (data.success) {
            setAuthUser(data.user);
            toast.success("Profile updated");
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        toast.error(error.response?.data?.message || error.message);
    }
}


        // connect socket function
        const connectsocket=(userData)=>{
            if(!userData ||socket?.connected) return;
            const newSocket=io(backendUrl,{
                query:{
                    userId:userData._id,
                }
            });
            newSocket.connect();
            setSocket(newSocket);

            newSocket.on("getOnlineUser",(userId)=>{
                setOnlineUser(userId);
            })
        }


    useEffect(()=>{
        if(token){
            axios.defaults.headers.common["token"]=token;
        }
        checkAuth();
    },[token]);

    const value={
        axios,authUser,onlineUser,socket,login,logout,updateProfile
    }
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
