import express from 'express';
import { authenticationToken } from '../Controller/Usercontroller.js';
import { user } from '../Modal/user.js';
import {order} from '../Modal/order.js'


const orderRouter = express.Router();

orderRouter.post("/place-order",authenticationToken,async(req,res)=>{
    try {
        const {id}=req.headers;
        const {order}=req.body;

        for(const orderdata of order){
            const newOrder = new order({user:id, book:orderdata._id});
            const orderdataFromDb= await newOrder.save();

            await user.findByIdAndUpdate(id,{
                $push:{order:orderdataFromDb._id},
            });

            await user.findByIdAndUpdate(id,{
                $pull:{order:orderdataFromDb._id}
            });
            return res.json({status:true,message:"order place successfuly"});
        }
    } catch (error) {
        return res.json({status:false,message:"internal server error"});
    }
});


orderRouter.get("/get-order-history",authenticationToken,async(req,res)=>{
    try {
        const {id}=req.headers;
        const userData = await user.findById(id).populate({
            path:"order",
            populate:{path:"book"},
        
        });
        const orderdata = userData.order.reverse();
            return res.json({status:true,data:orderdata});
       
    } catch (error) {
        return res.json({status:false,message:"internal server error"});
    }
});


orderRouter.get("/get-all-orders",authenticationToken,async(req,res)=>{
    try {
    const userData = await order.find()
    .populate({
        path:"book",
    })
    .populate({
        path:"user",
    })
    .sort({createdAt:-1})
    return res.json({status:false,data:userData});   

       
    } catch (error) {
        return res.json({status:false,message:"internal server error"});
    }
});


orderRouter.put("/update-status/:id",authenticationToken,async(req,res)=>{
    try {
    const {id} = req.params;

    await order.findByIdAndUpdate(id,{status:req.body.status});
    return res.json({status:true,message:"status update"});
       
    } catch (error) {
        return res.json({status:false,message:"internal server error"});
    }
});




export { orderRouter };