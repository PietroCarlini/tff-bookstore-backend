const jwt = require('jsonwebtoken');

const { JWT_AUDIENCE, JWT_ISSUER, JWT_SECRET} = process.env;

const jwtUtils = {
    generate: (user) => {
        //!NB A promise need to be created (not default from JWT)
        return new Promise ((resolve, reject) => {
            //* 1) Create payload => obj that contains infos we want to stock in the Token ⚠️ NEVER SENSIBLE INFOS (pw, ecc..)
            const payload = {
                id: user.id,
                role: user.role
            }
            //* 2) Setting options
            const options = {
                algorithm: 'HS512', //most used
                expiresIn: '3d', //Token expiration date: 3 days
                audience: JWT_AUDIENCE, //infos about to whom the token is define
                issuer: JWT_ISSUER //infos about who has created the token 
            }
            //* 3) Token Creation
            //-payload //-secret [NEVER EVER on Git]: sign/pw to create token //-options
            //the very last paramter is a callback that is activated at the end of creation
            jwt.sign(payload, JWT_SECRET, options, (error, token) => {
                if(error) {
                    reject(error);
                }
                else {
                    resolve(token)
                }
            })
        })
    },
}

module.exports = jwtUtils;