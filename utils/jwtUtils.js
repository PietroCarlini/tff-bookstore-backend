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

    decode: (token) => {
        return new Promise ( (resolve, reject) => {
            //* 1) Verify token content
            if(!token){
                reject(new Error('Missing token to authentification'));
            }
            //* 2) Setting options
            const options = {
                audience: JWT_AUDIENCE,
                issuer: JWT_ISSUER 
            }
            //* 3) Decoding token using 'verify' method that has params:- token - secret - options - callback to see if we were able to decode
            jwt.verify(token, JWT_SECRET, options, (error, payload) => {
                if (error) {
                    reject(error)
                }
                else{
                    resolve(payload) //decoding succesfull, it sends back payload from token***
                }
            })
        })
    }
    
}

module.exports = jwtUtils;

// *** this means:
// jwt.verify() checks the token's validity (signature, expiration, audience/issuer)
// AND returns the payload stored at creation (id, role, iat, exp) if valid.
// This lets the backend know WHO is making the request without querying the DB (stateless auth) —
// the payload gets saved in req.user by the middleware, for controllers to use later