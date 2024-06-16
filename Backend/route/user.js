import express from 'express'
import { register, signin, authenticationToken } from '../Controller/Usercontroller.js';
import { user } from '../Modal/user.js';

const routes = express.Router();

routes.post('/signUp',register);
routes.post('/login', signin);
routes.get('/userinfo', authenticationToken, async (req, res) => {
    try {
        const { id } = req.headers;
        if (!id) {
            return res.json({ status: false, message: 'User ID is required' });
        }
        const data = await user.findById(id).select("-password");
        if (!data) {
            return res.json({ status: false, message: 'User not found' });
        }
        return res.json({ status: true, data });
    } catch (error) {
        console.error('Error fetching user information:', error);
        return res.json({ status: false, message: "Can't get information" });
    }
});
routes.put('/updte-address',authenticationToken,async(req,res)=>{
    try {
        const { id } = req.headers;
        const {address} = req.body;
        await user.findByIdAndUpdate(id,{address});
        return res.json({status:false,message:"update address"});

        
    } catch (error) {
        console.error("can't update address:", error);
        return res.json({ status: false, message: "can't update address" });
    }
})

export  {routes};