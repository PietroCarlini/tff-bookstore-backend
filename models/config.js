//SEQUELIZE Obj IMPORT
const { Sequelize } = require ('sequelize');
const userBuilder = require ('./userModel');
const clientBuilder = require('./clientModel');
const bookshopBuilder = require('./bookshopModel');
const bookStockedBuilder = require('./bookStockedModel');
const tagBuilder = require('./tagModel');
const bookStockedTagBuilder = require('./mmBookStockedTagModel');
const orderBuilder = require('./orderModel');
const orderItemBuilder = require('./orderItemModel');
const wishlistBuilder = require('./wishlistModel');
const bookTrackingBuilder = require('./bookTrackingModel')

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
db.User = userBuilder(sequelize);
db.Client = clientBuilder(sequelize);
db.Bookshop = bookshopBuilder(sequelize);
db.BookStocked = bookStockedBuilder(sequelize);
db.Tag = tagBuilder(sequelize);
db.MM_BookStocked_Tag = bookStockedTagBuilder(sequelize);
db.Order = orderBuilder(sequelize);
db.OrderItem = orderItemBuilder(sequelize);
db.Wishlist = wishlistBuilder(sequelize);
db.BookTracking = bookTrackingBuilder(sequelize);

//------ Relations btwn Tables --------
//* Rel 1to1 - NB: Table containg FK = belongsTO
db.User.hasOne(db.Client, {foreignKey : { unique: true, allowNull: false } });
db.Client.belongsTo(db.User);

db.User.hasOne(db.Bookshop, {foreignKey : { unique: true, allowNull: false } });
db.Bookshop.belongsTo(db.User);

//* Rel 1toMany - NB: FK NOT UNIQUE (Multi bookStocked in a Bookshop with the same ID) - Table containg FK = belongsTO
db.Bookshop.hasMany(db.BookStocked, {foreignKey : { allowNull: false } });
db.BookStocked.belongsTo(db.Bookshop);

db.Bookshop.hasMany(db.Tag, { foreignKey : { allowNull : false } });
db.Tag.belongsTo(db.Bookshop);

db.Bookshop.hasMany(db.Order, { foreignKey : { allowNull : false } });
db.Order.belongsTo(db.Bookshop);

db.Client.hasMany(db.Order, { foreignKey : { allowNull : false } });
db.Order.belongsTo(db.Client);

db.Order.hasMany(db.OrderItem, { foreignKey : { allowNull : false } });
db.OrderItem.belongsTo(db.Order);

db.BookStocked.hasMany(db.OrderItem, { foreignKey : { allowNull : true } });
db.OrderItem.belongsTo(db.BookStocked);

db.Client.hasMany(db.Wishlist, { foreignKey : { allowNull: false } });
db.Wishlist.belongsTo(db.Client);

db.Client.hasMany(db.BookTracking, { foreignKey : { allowNull: false } });
db.BookTracking.belongsTo(db.Client);

//* Rel ManyToMany - NB: both tables pass through MM_
db.BookStocked.belongsToMany(db.Tag, { through: db.MM_BookStocked_Tag} );
db.Tag.belongsToMany(db.BookStocked, { through: db.MM_BookStocked_Tag} );




module.exports = db;