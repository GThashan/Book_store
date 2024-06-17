import express from 'express';
import { authenticationToken } from '../Controller/Usercontroller.js';
import { user } from '../Modal/user.js';

const favoriteRouter = express.Router();

favoriteRouter.put('/add-book-to-favorite', authenticationToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers; 
        if (!bookid || !id) {
            return res.json({ status: false, message: "Book ID and User ID are required" });
        }

        const userData = await user.findById(id);

        if (!userData) {
            return res.json({ status: false, message: "User not found" });
        }

        const isBookFavorite = userData.faviourte.includes(bookid);

        if (isBookFavorite) {
            return res.json({ status: false, message: "Book is already in favorite" });
        }

        await user.findByIdAndUpdate(id, { $push: { faviourte: bookid } });
        return res.json({ status: true, message: "Book added to the favorite" });

    } catch (error) {
        console.error("Error adding book to favorite:", error);
        return res.json({ status: false, message: "Internal server error" });
    }
});


favoriteRouter.put('/remove-book-from-favorite', authenticationToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers; 
        if (!bookid || !id) {
            return res.json({ status: false, message: "Book ID and User ID are required" });
        }

        const userData = await user.findById(id);

        if (!userData) {
            return res.json({ status: false, message: "User not found" });
        }

        const isBookFavorite = userData.faviourte.includes(bookid);

        if (isBookFavorite) {
            await user.findByIdAndUpdate(id, { $pull: { faviourte: bookid } });
        }

      
        return res.json({ status: true, message: "Book deleted from the favorite" });

    } catch (error) {
        console.error("Error adding book to favorite:", error);
        return res.json({ status: false, message: "Internal server error" });
    }
});

favoriteRouter.get('/get-book-from-favorite', authenticationToken, async (req, res) => {
    try {
        const {id } = req.headers; 

        const userData = await user.findById(id).populate("faviourte");
        const faviroutebooks = userData.faviourte;

        return res.json({ status: true, message: "success" ,data:faviroutebooks});

    } catch (error) {
       
        return res.json({ status: false, message: "Internal server error" });
    }
});

export { favoriteRouter  };
