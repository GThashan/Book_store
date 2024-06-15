import mongoose, { Types } from 'mongoose'

const order = new mongoose.Schema({
    user:{Types:mongoose.Types.ObjectId, ref:"user"},
    book:{Types:mongoose.Types.ObjectId, ref:"books"},
    status:{Types:String,default:"Order placed",enum:["Order placed","Out for delivery","delived","Cancel"]},
},{timestamps:true});

const ordermodel = mongoose.model("order",order);
export {ordermodel as order};