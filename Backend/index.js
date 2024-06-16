import express from 'express'
import dotenv from 'dotenv'
import {conn} from './Connection/Conn.js'
import {routes} from './route/user.js'
dotenv.config();

const app = express();
app.use(express.json());
app.use('/api',routes);
conn();
app.listen(process.env.PORT,(req,res)=>{
    console.log(`server is runnning in port ${process.env.PORT}`);
})