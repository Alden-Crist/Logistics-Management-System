const express = require('express');
const { sequelize } = require('./models'); // Import sequelize from the models/index.js file


const PORT = process.env.PORT || 5000;


const app = require("./app");

// Sync database and start the server
sequelize.sync()
    .then(() => {
        console.log('Database connected successfully.');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
});
