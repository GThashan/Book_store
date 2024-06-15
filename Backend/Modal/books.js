import mongoose from 'mongoose'

const books = new mongoose.Schema({
   url:{type:String,require:true},
   title:{type:String,require:true},
   author:{type:String,require:true},
   price:{type:Number,require:true},
   desc:{type:String,require:true},
   language:{type:String,require:true},
},{timestamps:true});

const bookmodel = mongoose.model("books",books);
export {bookmodel as books};