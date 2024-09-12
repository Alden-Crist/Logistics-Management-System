const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

//Connection to the Local Database
const sequelize = new Sequelize('logistic_management', 'root', 'Alden@88', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

// const certificatePath = path.resolve(__dirname, './server-ca.crt');
// // Connection to the remote MySQL database
// const sequelize = new Sequelize('logistic_management', 'alden', 'AVNS_BDwNExTVJDd2WWNPjuC', {
//     host: 'mysql-08-alden.c.aivencloud.com',
//     port: 18700,
//     dialect: 'mysql',
//     logging: false,
//     dialectOptions: {
//         ssl: {
//             ca: fs.readFileSync(certificatePath, 'utf8'), // Ensure the path and file name are correct
//             rejectUnauthorized: true
//         },
//     },
// });

// // Test the connection
// sequelize.authenticate()
//     .then(() => console.log('Connected to the Aiven database successfully.'))
//     .catch(err => console.error('Unable to connect to the database:', err));



// sequelize.authenticate()
//     .then(() => console.log('Database connected.'))
//     .catch(err => console.error('Unable to connect to the database:', err));




module.exports = sequelize;
