require('dotenv').config();
const express = require('express')
const app = express()

app.use(express.json())

app.listen(3300, () => {console.log
    ('listening on port 3300')})