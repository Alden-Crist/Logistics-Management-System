const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

//Connection to the Local Database
const sequelize = new Sequelize('logistic_management', 'root', 'Alden@88', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});



// // Test the connection
// sequelize.authenticate()
//     .then(() => console.log('Connected to the Aiven database successfully.'))
//     .catch(err => console.error('Unable to connect to the database:', err));



// sequelize.authenticate()
//     .then(() => console.log('Database connected.'))
//     .catch(err => console.error('Unable to connect to the database:', err));




module.exports = sequelize;
