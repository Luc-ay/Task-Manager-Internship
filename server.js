import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.routes.js'
import connectDB from './config/db.js'

dotenv.config()
connectDB()

const app = express()

app.use(express.json())
app.use('/auth', userRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`)
})
