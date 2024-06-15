import express from 'express'
import dotenv from 'dotenv'
import {conn} from './Connection/Conn.js'
dotenv.config();

const app = express();
app.use(express());
conn();
app.listen(process.env.PORT,(req,res)=>{
    console.log(`server is runnning in port ${process.env.PORT}`);
})