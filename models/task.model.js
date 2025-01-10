import mongoose from 'mongoose'

// User schema
const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [20, 'Name cannot be too long'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
})

const Task = mongoose.model('Task', taskSchema)

export default Task
