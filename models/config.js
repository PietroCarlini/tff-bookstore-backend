//SEQUELIZE Obj IMPORT
const { Sequelize } = require ('sequelize');
const userBuilder = require ('./userModel');

//ENVIRONMENT VARIABLES (.env)
//? Destructuring (const{...}) to extract value of .env (process.env) and create for each one a new variable wth the same name

const { DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD, DB_DIALECT} = process.env;

//Sequelize instance INIT
const sequelize = new Sequelize (
    {
        host: DB_HOST,  //server
        port: DB_PORT,  //server port Docker
        database: DB_DATABASE,
        username: DB_USERNAME,
        password: DB_PASSWORD,
        dialect: DB_DIALECT //SQL language (postgres)
    }
)
//DB obj to access
const db = {};
//Link between DB and Sequelize instance 
db.sequelize = sequelize;
//Link between DB and Models: db.user => userModel
db.user = userBuilder(sequelize);


module.exports = db;