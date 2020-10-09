const express = require('express')
const bodyParser = require('body-parser')
const db = require('./api/routers/data_users')
const morgan = require('morgan')
const app = express()


app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended : true,
    })
)

app.get('/', (req, res) => {
    res.json({info: 'Node.js. Express, and Postgres API'})
})

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)




module.exports = app;

