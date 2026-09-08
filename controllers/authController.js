const argon2 = require("argon2");
const authService = require('../services/authService');
const jwtUtils = require("../utils/jwtUtils");

const authController = {
    register: async (req, res) => {
        try {
            //Cutting off confirmedPassword (from validator)
            const { confirmPassword, ...userToAdd } = req.data;

            //!hashing PW
            const passwordToHash = await argon2.hash(userToAdd.password);
            userToAdd.password = passwordToHash;

            if (await authService.authEmailCheck(userToAdd.email)) {
                res.status(409).json({ message: 'CONFLICT: chosen email already exist' })
            }
            else {
                const userAdded = await authService.register(userToAdd);
                //NB: userAdded = {user,client}
                const { user, client } = userAdded;
                //! DESTRUCTURING to hide password
                const { password, ...userNoPW } = user.toJSON();

                res.location(`/auth/` + user.id);
                res.status(201).json({ userNoPW, client })
            }
        }
        catch (err) {
            res.status(500).json({ status: 500, message: 'A server error has occured' })
            console.log(err);

        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.data;
            const userFound = await authService.getByEmail(email) //check btwn user if can be found
            if (!userFound) {
                return res.status(400).json({ status: 400, message: 'Data inserted not found' })
            }
            //if FOUND => pw ok?
            //!ARGON check passwords and return BOOL:
            if (!await argon2.verify(userFound.password, password)) {
                return res.status(400).json({ status: 400, message: 'Data inserted not found' })
            }
            else {
                //if email and pw ok => token generated
                const token = await jwtUtils.generate(userFound);

                res.status(200).json({
                    token: token,
                    user: {
                        id: userFound.id,
                        firstname: userFound.client.firstname,
                        role: userFound.role
                    }
                })
            }
        }
        catch (err) {
            res.status(500).json({ status: 500, message: 'A server error has occured' })
            console.log(err);
            
        }
    }

}


module.exports = authController;