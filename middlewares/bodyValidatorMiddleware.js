//MIDDLEWARE to check BODY with ZOD
//? It takes a validator and applies it to the request body, intercepting it before it reaches the controller.
//? => This middw receives "schema" as a parameter, based on which it must check the body 
//! NB: to use ONLY on route wth POST, PUT, and PATCH

const bodyValidator = (schema) => {

    return (req, res, next) => {
        //body validation due to schema
        const result = schema.safeParse(req.body);
        //* "result" contains a 'success' property with a Boolean value and a 'data' property containing the data passed by the validator   
        const {success, data, error} = result; 
        if(success){
            //body ok
            req.data = data; //!Data passed in req.data is stored --> the data must be retrieved here in the controller
            next();
        }
        //body NOT ok
        else{
            //ending request
            const { fieldErrors, formErrors } = error.flatten();
            console.log(fieldErrors);
            console.log(formErrors);

            res.status(400).json({status: 400, message: 'Inserted datas are invalides', error: fieldErrors})
        }
    }
};

module.exports = bodyValidator;