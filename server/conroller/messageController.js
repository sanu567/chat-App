import cloudinary from "../lib/cloudinary.js";
import message from "../models/Message.js";
import User from "../models/User.js";
import{io,userSocketMap} from "../server.js";


// get all user except the logged in user
export const getUserForSidebar= async(req,rep)=>{
    try {
        const UserId=req.user._id;
        const filteredUser=await User.find({_id:{$ne:UserId}}).select("-password");

        // count number of unseen messages
        const unseenMessages={}
        const promises=filteredUser.map(async(user)=>{
            const Message= await message.find({senderId:user._id,receiverId:UserId,seen:false});
            if(Message.length>0){
                unseenMessages[user._id]=Message.length;
            }
        })
        await Promise.all(promises);
        rep.json({success:true,users:filteredUser,unseenMessages})
    } catch (error) {
        console.log(error.message);
        rep.json({success:false,message:error.message});
    }
}

// Get all message for selected user
export const getMessage=async(req,rep)=>{
    try {
        const{id:selectedUserId}=req.params;
        const MyId=req.user._id;

        const messages=await message.find({
            $or:[
                {senderId:MyId,receiverId:selectedUserId},
                {receiverId:selectedUserId,receiverId:MyId},
            ]
        })
        await message.updateMany({senderId:selectedUserId,receiverId:MyId},{seen:true});
        rep.json({success:true,messages})

    } catch (error) {
         console.log(error.message);
        rep.json({success:false,message:error.message});
    }
}

// api to mark message as seen using message id
export const markMessageSeen=async(req,rep)=>{
    try {
        const {id}=req.params;
        await message.findByIdAndUpdate(id,{seen:true});
        rep.json({success:true});
    } catch (error) {
         console.log(error.message);
        rep.json({success:false,message:error.message});
    }
}

// send message to selected user
export const sendMessage=async(req,rep)=>{
    try {
       const {text,image}=req.body;
       const receiverId=req.params.id;
       const senderId=req.user._id;
       
       let imageURL;
       if(image){
            const uploadResponse=await cloudinary.uploader.upload(image);
            imageURL=uploadResponse.secure_url;
       }
       const newMessage=await message.create({
        senderId,
        receiverId,
        text,
        image:imageURL
       })

    //    emit the new message to the receiver socket
       const receiverSocketId=userSocketMap[receiverId];
       if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage);
       }
       
       rep.json({success:true,newMessage});

    } catch (error) {
        console.log(error.message);
        rep.json({success:false,message:error.message});
    }
}
