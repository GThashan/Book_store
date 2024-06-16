import bcrypt from 'bcrypt';
import { user } from "../Modal/user.js"
import jwt from 'jsonwebtoken'

export const register = async(req,res)=>{
    try {
        const {username, email, password,address}=req.body;

        if(username.length<4){
            return res.json({status:false,message:"Username is very short"});
        }
        if(password.length<5){
            return res.json({status:false,message:"password is very short"});
        }

        const exiteuser = await user.findOne({username});
        if(exiteuser){
            return res.json({status:false,message:"username already exited"}); 
        }
        const exitemail = await user.findOne({email});
        if(exitemail){
            return res.json({status:false,message:"email already exited"}); 
        }
     
         const hashedPassword = await bcrypt.hash(password, 10);

        const newuser = new user({
            username,
            email,
            password:hashedPassword,
            address
        });
        await newuser.save();
        return res.json({status:true,message:"Register successful"});
        
    } catch (error) {
        console.error("Internal server error:", error); // Log the full error
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
}

export const signin = async(req,res)=>{
    try {
        const {username,password}=req.body;
        const exiteinguser = await user.findOne({username});
        if(!exiteinguser){
            return res.json({status:false,message:"user not found"});
        }

        await bcrypt.compare(password,exiteinguser.password,(err,data)=>{
            if(data){
                const authclaim = [
                    {name:exiteinguser.username},
                    {role:exiteinguser.role}
                ];
                const token = jwt.sign({authclaim},"jsonwebtoken123",{
                    expiresIn:"30d",
                });
                return res.json({id:exiteinguser._id,token,role:exiteinguser.role});
            } else{
                return res.json({status:false,message:"login failed"});
            }
        })
        
    } catch (error) {
        return res.json({status:false,message:"internal server error"});
    }
}

export const authenticationToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.json({ status: false, message: 'Authentication token required' });
    }

    jwt.verify(token, 'jsonwebtoken123', (err, user) => {
        if (err) {
            return res.json({ status: false, message: 'Token expired' });
        }
        req.user = user;
        next();
    });
};


