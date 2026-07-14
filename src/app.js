const express = require("express")
const cors = require("cors")
const { use } = require("react")
const { models } = require("mongoose")

const app = express()

app.use(cors())

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Api funciona correctamente")

})

module.exports = app