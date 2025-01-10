import express from 'express'
import {
  getAllTask,
  createTask,
  getSingleTask,
  deleteTask,
  updateTask,
} from '../controllers/task.controller.js'

const router = express.Router()

router.get('/task', getAllTask)
router.post('api/task', createTask)
router.get('/task/:id', getSingleTask)
router.delete('/task/:id', deleteTask)
router.put('/task/:id', updateTask)
export default router
