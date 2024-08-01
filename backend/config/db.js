const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('logistic_management', 'root', 'Alden@88', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

sequelize.authenticate()
    .then(() => console.log('Database connected.'))
    .catch(err => console.error('Unable to connect to the database:', err));

module.exports = sequelize;
