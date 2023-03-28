require("dotenv").config()
const express = require("express"); // <-- common js
//import express from "exrepss" <-- es 6 import
const cors = require("cors")
const animals = require("./routes/animals.routes")


const app = express()

// import db-connection
require("./database")

app.use(cors())

// routes
app.use("/api/v1", animals)



app.listen(4000, () => {
    console.log("Listening for requests on port 4000")
})