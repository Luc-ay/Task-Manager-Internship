import Task from '../models/task.model.js'

export const createTask = async (req, res) => {
  try {
    const { name, description } = req.body
    if (!name || description) {
      return res.status(400).json({
        Success: false,
        Message: 'Please fill all the fields',
      })
    }
    const task = await Task.create({ name, description })
    res.status(200).json({
      Success: true,
      Message: 'Task created successfully',
      task,
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

export const getAllTask = async (req, res) => {
  try {
    const task = await Task.find({})
    if (!task) {
      return res.status(404).json({
        success: false,
        Message: 'No task Found, Create one',
      })
    }

    res.status(200).json(task)
  } catch (error) {
    res.status(500).json({
      Success: false,
      Message: 'Error in Get All Task API',
      Error: error.message,
    })
  }
}

export const getSingleTask = async (req, res) => {
  try {
    const { id: taskId } = req.params
    const task = await Task.findOne({ _id: taskId })
    if (!task) {
      return res.status(404).json({
        Success: false,
        Message: 'No Task Found',
      })
    }
    res.status(200).json({
      Success: true,
      task,
    })
  } catch (error) {
    res.status(500).json({
      Success: false,
      Message: 'Error in Get Task API',
      Error: error.message,
    })
  }
}

export const deleteTask = async (req, res) => {
  try {
    const { id: taskId } = req.params
    const task = await Task.findByIdAndDelete({ _id: taskId })
    if (!task) {
      return res.status(404).json({
        Success: false,
        Message: `No task found with id : ${taskId}`,
      })
    }

    res.status(200).json({
      Success: true,
      task,
    })
  } catch (error) {
    res.status(500).json({
      Success: false,
      Message: 'Error in Delete Task API',
      Error: error.message,
    })
  }
}

export const updateTask = async (req, res) => {
  try {
    const { id: taskId } = req.params
    const task = await Task.findByIdAndUpdate({ _id: taksId }, req.body, {
      new: true,
      runValidators: true,
    })
    if (!task) {
      return res.status(500).json({
        Success: false,
        Message: `No task found with id: ${taskId}`,
      })

      res.status.json({
        Success: true,
        task,
      })
    }
  } catch (error) {
    res.status(500).json({
      Success: false,
      Message: 'Error in Delete Task API',
      Error: error.message,
    })
  }
}
