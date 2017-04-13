const env = process.env.DATABASE_URL || 'development';
const config = require('../knexfile')[env];
const knex = require('knex');
const connection = knex(config);

module.exports = connection
