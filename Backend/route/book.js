import express from 'express'
import { authenticationToken } from '../Controller/Usercontroller.js';
import { user } from '../Modal/user.js';
import {books} from '../Modal/books.js'

const bookroutes = express.Router();

bookroutes.post("/add-book", authenticationToken,async(req,res)=>{
    try {
        const { id } = req.headers;
        const exiteadmin = await user.findById(id);
        if(exiteadmin.role !== "Admin"){
            return res.json({status:false,message:"You are not the admin"});
        }

        const newbook = new books({
            url:req.body.url,
            title:req.body.title,
            author:req.body.author,
            price:req.body.price,
            desc:req.body.desc,
            language:req.body.language,
        })

        await newbook.save();
        return res.json({status:true,message:"Book saved sucessful"});
    } catch (error) {
        console.error("can't store book:", error);
        return res.json({ status: false, message: "can't store book" });
    }
});

bookroutes.put("/update-book",authenticationToken,async(req,res)=>{
    try {
        const {bookid} = req.headers;
    await books.findByIdAndUpdate(bookid,{
        url:req.body.url,
        title:req.body.title,
        author:req.body.author,
        price:req.body.price,
        desc:req.body.desc,
        language:req.body.language,
    });
    return res.json({status:true,message:"Update successful"})
    } catch (error) {
        console.error("can't update book:", error);
        return res.json({ status: false, message: "can't update book" });
    }
    

});

bookroutes.delete("/delete-book",authenticationToken,async(req,res)=>{
    try {
        const {bookid} = req.headers;
        await books.findByIdAndDelete(bookid)
        return res.json({status:true,message:"Delete successful"})
    } catch (error) {
        console.error("can't update book:", error);
        return res.json({ status: false, message: "can't delete book" });
    }
    

});

bookroutes.get('/get-all-books',async(req,res)=>{
    try {
        const Books = await books.find().sort({createdAt:-1});
        return res.json({status:true,data:Books});
    } catch (error) {
        console.error("can't find books:", error);
        return res.json({ status: false, message: "can't find books" });
    }
})
bookroutes.get('/get-recent-books',async(req,res)=>{
    try {
        const Books = await books.find().sort({createdAt:-1}).limit(4);
        return res.json({status:true,data:Books});
    } catch (error) {
        console.error("can't find books:", error);
        return res.json({ status: false, message: "can't find books" });
    }
})
bookroutes.get('/get-book-by-id/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const Books = await books.findById(id);
        return res.json({status:true,data:Books});
    } catch (error) {
        console.error("can't find book:", error);
        return res.json({ status: false, message: "can't find book" });
    }
})




export {bookroutes};