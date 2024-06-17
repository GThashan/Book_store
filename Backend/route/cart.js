import express from 'express';
import { authenticationToken } from '../Controller/Usercontroller.js';
import { user } from '../Modal/user.js';

const cartRouter = express.Router();

cartRouter.put('/add-book-to-cart', authenticationToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers; 
        if (!bookid || !id) {
            return res.json({ status: false, message: "Book ID and User ID are required" });
        }

        const userData = await user.findById(id);

        if (!userData) {
            return res.json({ status: false, message: "User not found" });
        }

        const isBookCart = userData.cart.includes(bookid);

        if (isBookCart) {
            return res.json({ status: false, message: "Book is already in cart" });
        }

        await user.findByIdAndUpdate(id, { $push: { cart: bookid } });
        return res.json({ status: true, message: "Book added to the cart" });

    } catch (error) {
        console.error("Error adding book to cart:", error);
        return res.json({ status: false, message: "Internal server error" });
    }
});

cartRouter.put('/remove-book-from-cart/:bookid', authenticationToken, async (req, res) => {
    try {
        const { id } = req.headers; 
        const { bookid} = req.headers; 
      

        const userData = await user.findById(id);

        if (!userData) {
            return res.json({ status: false, message: "User not found" });
        }

        const isBookFavorite = userData.cart.includes(bookid);

        if (isBookFavorite) {
            await user.findByIdAndUpdate(id, { $pull: { cart: bookid } });
        }

      
        return res.json({ status: true, message: "Book deleted from the cart" });

    } catch (error) {
        console.error("Error adding book to favorite:", error);
        return res.json({ status: false, message: "Internal server error" });
    }
});

cartRouter.get('/get-book-from-cart', authenticationToken, async (req, res) => {
    try {
        const {id } = req.headers; 

        const userData = await user.findById(id).populate("cart");
        const cart = userData.cart.reverse();

        return res.json({ status: true, message: "success" ,data:cart});

    } catch (error) {
       
        return res.json({ status: false, message: "Internal server error" });
    }
});





export { cartRouter  };