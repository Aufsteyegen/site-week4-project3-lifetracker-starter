const express = require('express')
const app = express()
const cors = require("cors")
const pool = require('./db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

app.use(cors())
app.use(express.json())

app.post("/register", (req, res) => {
    const { email, username, firstName, lastName, password } = req.body
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        console.error('Error generating salt:', err)
        return res.status(500).json({ error: 'Internal server error' })
      }
      bcrypt.hash(password, salt, (err, hashedPassword) => {
        if (err) {
          console.error('Error hashing password:', err)
          return res.status(500).json({ error: 'Internal server error' })
        }
        const query = `
          INSERT INTO users (email, username, first_name, last_name, password)
          VALUES ($1, $2, $3, $4, $5)
          RETURNING id;
        `
        pool
          .query(query, [email, username, firstName, lastName, hashedPassword])
          .then((result) => {
            const userId = result.rows[0].id
            res.json({ userId })
          })
          .catch((error) => {
            console.error('Error registering user:', error)
            res.status(500).json({ error: 'Internal server error' })
          })
      })
    })
})

app.post("/login", function (req, res) {
    const secretKey = 'your_secret_key'
    const { email, password } = req.body

    const getUserQuery = 'SELECT * FROM users WHERE email = $1'
    pool.query(getUserQuery, [email], (err, result) => {
        if (err) {
            console.error('Error executing query:', err)
            res.status(500).json({ error: 'An error occurred while executing the query.' })
            return
        }
        
        const user = result.rows[0]
        if (!user) {
            res.status(401).json({ error: 'Email not found.' })
            return
        }
        
        bcrypt.compare(password, user.password, (bcryptErr, isMatch) => {
            if (bcryptErr) {
                console.error('Error comparing passwords:', bcryptErr)
                res.status(500).json({ error: 'An error occurred while comparing passwords.' })
                return
            }

            if (isMatch) {
                const payload = {
                    email: user.email
                }

                const token = jwt.sign(payload, secretKey, { expiresIn: '1h' })
                res.json({ token })
            } else {
                res.status(401).json({ error: 'Incorrect password.' })
            }
        })
    })
})

app.post("/nutrition", (req, res) => {
    const { email, name, category, calories, quantity } = req.body
    const query = `INSERT INTO nutrition (email, name, category, calories, quantity)
                   VALUES ($1, $2, $3, $4, $5)
                   RETURNING *
                   `
    pool.query(query, [email, name, category, calories, quantity]).then((result) => {
        const insertedRow = result.rows[0]
        res.json({ id: insertedRow.id })
    })
    .catch((error) => {
        console.error('Error inserting:', error)
        res.status(500).json({ error: 'Internal server error' })
    })
})


module.exports = app