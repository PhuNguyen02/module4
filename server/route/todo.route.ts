import express from 'express';
import TodoController from '../controller/todo.controller';

const router = express.Router();

router.get('/tasks', TodoController.getAllTasks);
router.get('/task/:id', TodoController.getTaskById);
router.post('/task', TodoController.addTask);
router.put('/task/:id', TodoController.updateTask);
router.delete('/task/:id', TodoController.deleteTask);

export default router;
