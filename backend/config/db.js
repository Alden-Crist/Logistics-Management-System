const { Sequelize } = require('sequelize');
const fs = require('fs');
path = require('path');



//Connection to the Local Database
// const sequelize = new Sequelize('logistic_management', 'root','Alden@88', {
//     host: 'localhost',
//     dialect: 'mysql',
//     logging: false,
// });


const certificatePath = path.resolve(__dirname, './server-ca.crt');
// // Connection to the remote MySQL database

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
        ssl: {
            ca: fs.readFileSync(certificatePath, 'utf8'), // Adjust the file name/path
            rejectUnauthorized: true
        },
    },
});


// Test the connection
sequelize.authenticate()
    .then(() => console.log('Connected to the Aiven database successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));





// sequelize.authenticate()
//     .then(() => console.log('Database connected.'))
//     .catch(err => console.error('Unable to connect to the database:', err));




module.exports = sequelize;
