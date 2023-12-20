const mongoose = require('mongoose')
const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(require('./routes/todo.route'))

mongoose.connect('mongodb+srv://ToDo:qwertyuiop123@todo.ae15lto.mongodb.net/?retryWrites=true&w=majority')
.then(() => console.log('Connected - MongoDB'))
.catch(() => console.log('Connection failed - MongoDB'))

app.listen(5000, () => console.log('Connected to server'))