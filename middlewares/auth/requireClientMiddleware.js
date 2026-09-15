//Middleware to verify the logged-in user is a Client, and attach it to req.client for controllers to use

const authService = require('../../services/authService');
const { Request, Response } = require('express');

//*No need of params, the chack is 'client/not a client'.
//To use wuth Authentification() on client's route.
const requireClient = () => {
    /**
     * @param {Request} req
     * @param {Response} res
     */

    return async (req, res, next) => {
        const userId = req.user.id;

        try {
            const user = await authService.getById(userId);

            if (!user || !user.client) {
                return res.status(403).json({ status: 403, message: "You do not have permission to access this resource" });
            }
            else {
                //Attaching the client to req, so controllers don't need to re-fetch it
                req.client = user.client;
                next()
            }
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ status: 500, message: 'Server error has occurred' })
        }
    }
}

module.exports = requireClient;