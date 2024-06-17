import mongoose, { Types } from 'mongoose'

const order = new mongoose.Schema({
    user:{type:mongoose.Types.ObjectId, ref:"user"},
    book:{type:mongoose.Types.ObjectId, ref:"books"},
    status:{type:String,default:"Order placed",enum:["Order placed","Out for delivery","delived","Cancel"]},
},{timestamps:true});

const ordermodel = mongoose.model("order",order);
export {ordermodel as order};