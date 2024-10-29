require('dotenv').config() 
const mongoUri = process.env.MONGODB

const mongoose = require('mongoose')

//writing a function to establish the connection to Mongoose Database
const initializeDatabase = async () => {
     await mongoose.connect(mongoUri).then(() => {
          console.log("Connected to Database")
     })
          .catch((error) => {
               console.log("Error connecting to Database",error)
          })
}

module.exports = { initializeDatabase }