import mongoose from 'mongoose'

const Userschema = new mongoose.Schema({
    username:{type:String,require:true,unique:true},
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true},
    address:{type:String,require:true},
    avatar:{type:String,default:"https://cdn.iconscout.com/icon/free/png-512/free-avatar-370-456322.png?f=webp&w=512"},
    role:{type:String,default:"User",enum:["User","Admin"]},
    faviourte:{type:mongoose.Types.ObjectId,ref:"books"},
    cart:{type:mongoose.Types.ObjectId,ref:"books"},
    order:{type:mongoose.Types.ObjectId,ref:"order"},
},{timestamps:true});


const Usermodel = mongoose.model("user",Userschema);
export {Usermodel as user};