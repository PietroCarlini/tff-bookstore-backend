//! Building SERVER: 1) Importing Express
const express = require('express');

//Extracting and using ENV variable
const {PORT} = process.env;

//!Building SERVER: 2) Creating the server with express
const app = express();

//----DB CONFIG----
const db = require('./models/config');

//?using config file to try to connect to server
db.sequelize.authenticate()
    .then(() => {
        console.log('✅ DB CONNECTION - Success');
        
    })
    .catch((err) => {
        console.log('❌ DB CONNECTION - Fail');
        console.log(err);
    });

//----DB SYNCH---- //! Commented after use

// db.sequelize.sync()
//     .catch(err => console.log(err)) //? vanilla (First use) + add new tables

// db.sequelize.sync({ alter: true })
//     .catch(err => console.log(err)) //? to modify exisiting tables

//db.sequelize.sync({force : true}) //? ⚠️ to delete and redo DB

//---- JSON ----
app.use(express.json());

//---- ROUTES ----
const router = require('./routes')
app.use('/api', router);

//Healtcheck 
app.get('/api/health', (req,res) => res.json({status: 'ok'}))

//!Building SERVER: 3) Launching SERVER
app.listen(PORT, () => {
    console.log(`🚀 Express API launched on port ${PORT}`);
    console.log(`http://localhost:${PORT}/`);
});

