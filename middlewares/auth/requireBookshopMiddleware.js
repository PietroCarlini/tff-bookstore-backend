//Middleware to verify the logged-in user is a Bookshop, and attach it to req.bookshop for controllers to use

const authService = require('../../services/authService');
const { Request, Response } = require('express');

//*No need of params, the chack is 'bookshop/not a bookshop'.
//To use wuth Authentification() on bookshop's route.
const requireBookshop = () => {
    /**
     * @param {Request} req
     * @param {Response} res
     */

    return async (req, res, next) => {
        const userId = req.user.id;

        try {
            const user = await authService.getById(userId);

            if (!user || !user.bookshop) {
                return res.status(403).json({ status: 403, message: "You do not have permission to access this resource" });
            }
            else {
                //Attaching the bookshop to req, so controllers don't need to re-fetch it
                req.bookshop = user.bookshop;
                next()
            }
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ status: 500, message: 'Server error has occurred' })
        }
    }
}

module.exports= requireBookshop;