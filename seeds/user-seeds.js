const sequelize = require('../config/connection');
const { User, Post } = require('../models');


const userData = [
    {
        username: "Fernando",
        email: "fernando.t10@outlook.com",
        password: "password123"
    },

    {
        username: "Michael",
        email: "michael@gmail.com",
        password: "password123"
    },

    {
        username: "Fabricio",
        email: "fabricio@gmail.com",
        password: "password123"
    }

];


const seedUsers = () => User.bulkCreate(userData, { individualHooks: true });


module.exports = seedUsers;