const { Pool } = require('pg')
require('dotenv').config()

const username = process.env.DATABASE_USER;
const host = process.env.DB_HOST;
const databaseName = process.env.DB_NAME;
const password = process.env.DATABASE_PASS;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'lifetracker',
    password: "472237",
    port: 5432,
})

module.exports = pool