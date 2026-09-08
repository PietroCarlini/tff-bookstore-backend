const { Request, Response } = require('express');
const jwtUtils = require('../../utils/jwtUtils');

const authentification = () => {
    /**
     * @param {Request} req
     * @param {Response} res
     */
    return async (req, res, next) => {
        //!1) Retrive token from req
        const authorization = req.headers.authorization;
        //!2) Verify presence of token
        //TODO Verify if authorization empty
        if (!authorization) {
            //ending req: err 401
            return res.status(401).json({ status: 401, message: 'You need to be logged in to access' })
        }
        else {
            //TODO Authorization ok = verify content (Content form : 'Barer ourToken', ourToken needs to be extract)
            const token = authorization.split(' ')[1]; //string.SPLIT(character): splits string every time it finds the selected character (in this case, a space between “Bearer” and “token”) and divides it into array elements ====> in this case, ‘Bearer’ in case 0 and “ourToken” in case 1
            //TODO Verify presence token
            if (!token) {
                return res.status(401).json({ status: 401, message: 'You need to be logged in to access' })
            }
            //!3) If a token it's present, it need to be validate
            else {
                try {
                    const payload = await jwtUtils.decode(token)
                    req.user = payload //The payload info is stored in req object so that neither middleware or controller have to decode the token again

                    next();
                }
                catch (err) {
                    res.status(401).json({ status: 401, message: 'You need to be logged in to access' })
                }
            }
        }
    }
}

module.exports = authentification;