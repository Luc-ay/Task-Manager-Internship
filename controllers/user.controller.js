import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const jwtSecret = process.env.JWT_SECRET

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Validate input fields
    if (!name || !email || !password) {
      return res.status(400).json({
        Success: false,
        Message: 'Please fill all the fields',
      })
    }
    // Check if the user already exists
    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({
        Success: false,
        Message: 'Email already exists, please Login',
      })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)
    // Create a new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    })

    // Send response after successful registration
    res.status(201).json({
      Success: true,
      Message: 'User created successfully',
      user: {
        name: newUser.name,
        email: newUser.email,
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      Success: false,
      Message: 'Server error. Please try again later.',
      Error: error.message,
    })
  }
}

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({
        Success: false,
        Message: 'Please fill all the fields',
      })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({
        Success: false,
        Message: 'User not found',
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({
        Success: false,
        Message: 'Invalid Password',
      })
    }

    // Generate a JWT token
    const payload = {
      userId: user._id, // Add user information to the payload (e.g., user ID)
    }

    const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' })

    res.status(200).json({
      Success: true,
      Message: 'Login successful',
      user: {
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    console.error(error.message)
    res.status(500).json({
      Success: false,
      Message: 'Server error. Please try again later.',
      Error: error.message,
    })
  }
}
