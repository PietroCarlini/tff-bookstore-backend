//Middleware to verify whether the User's role matches the one required to access a specific route (category/user)

const authService = require('../../services/authService');

const { Request, Response } = require('express');
const jwtUtils = require('../../utils/jwtUtils');

const roleAuth = (allowedRoles) => {
    /**
     * @param {Request} req
     * @param {Response} res
     */

    return async (req, res, next) => {
        // Retrieving the ID of the logged-in user
        const userId = req.user.id;

        // NB: rather than extract the role from the token, it's safer to retrieve the user's role from the database [const userRole = req.user.role] => it may have changed in the meantime. 
        try {
            const user = await authService.getById(userId);
            // If user cannot be found ( ex. deleted from the database)
            if (!user) {
                res.status(403).json({ status: 403, message: "You do not have permission to access this resource" })
            }
            else {
                //If user is found, check whether their role is one of the authorized ones
                if (allowedRoles.includes(user.role)) {
                    next();
                }
                else {
                    res.status(403).json({ status: 403, message: "You do not have permission to access this resource" })
                }
            }
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ status: 500, message: 'Server error has occurred' })
        }
    }
}

module.exports = roleAuth;