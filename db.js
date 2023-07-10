const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
    connectionString: process.env.PRODUCTION_API_BASE_URL
})


module.exports = pool