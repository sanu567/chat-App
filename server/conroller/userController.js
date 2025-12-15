
import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs"

// sign up or login new user
export const signup= async (req,rep)=>{
    const {name,email,password,bio}= req.body;

    try {
        if(!name || !email|| !password||!bio){
            return rep.json({success:false,message:"missing details"})
        }
        const user = await User.findOne({email});
        if(user){
            return rep.json({success:false, message:"Already account"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashpassword=await bcrypt.hash(password,salt);

        const newUser = await User.create({name,email,password :hashpassword,bio});

        const token = generateToken(newUser._id);
       return rep.json({success:true,user:newUser,token,message:"Account is creates successfully"});
    } catch (error) {
        console.log(error.message);
        rep.json({success:false,message:error.message});
    }
}

export const login= async (req,rep)=>{
    const{email,password}=req.body;
    try {
        if(!email || !password){
            return rep.json({success:false,message:"enter email or password"});
        }
        const user= await User.findOne({email});
        if(!user){
            return rep.json({success:false,message:"Invaild user"});
        }
        const IsMatch= await bcrypt.compare(password,user.password);
        if(!IsMatch){
            return rep.json({success:false,message:"Incorrect password"});
        }
        const token=generateToken(user._id);
        return rep.json({success:true,user,token,message:"login successFully"});

    } catch (error) {
       console.log(error.message);
       return rep.json({success:false,message:error.message}); 
    }
}
// check authenticated
export const checkAuth=(req,rep)=>{
    rep.json({success:true,user:req.user});
}
 export const updateProfile = async (req, res) => {
  try {
    console.log("req.body:", req.body);
    console.log("req.user:", req.user);

    const { profilePic, bio, name } = req.body;
    const userId = req.user._id;

    let updateFields = { bio, name };

    if (profilePic) {
      console.log("Uploading profilePic to Cloudinary...");
      const upload = await cloudinary.uploader.upload(profilePic, {
        folder: "chatApp/user",
        transformation: [{ width: 400, height: 400, crop: "fill" }],
      });
      console.log("Cloudinary upload result:", upload);
      updateFields.profilePic = upload.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateFields,
      { new: true }
    );

    console.log("Updated user:", updatedUser);

    return res.json({
      success: true,
      user: updatedUser,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

