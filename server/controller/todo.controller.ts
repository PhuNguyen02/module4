// todo.controller.ts
import { Request, Response } from 'express';
import TodoRepository from '../repository/todo.repository'

class TodoController {
  async getAllTasks(req: Request, res: Response) {
    try {
      const tasks = await TodoRepository.getAllTasks();
      res.json(tasks);
    } catch (error) {
      console.error('Error fetching tasks: ', error);
      res.status(500).send('Error fetching tasks');
    }
  }

  async getTaskById(req: Request, res: Response) {
    const taskId = parseInt(req.params.id);
    try {
      const task = await TodoRepository.getTaskById(taskId);
      if (!task) {
        res.status(404).send('Task not found');
        return;
      }
      res.json(task);
    } catch (error) {
      console.error('Error fetching task: ', error);
      res.status(500).send('Error fetching task');
    }
  }

  async addTask(req: Request, res: Response) {
    const { title } = req.body;
    try {
      const existingTask = await TodoRepository.getAllTasks();
      const isExisting = existingTask.some(task => task.title === title);
      if (isExisting) {
        res.status(400).send('Title already exists');
        return;
      }

      const taskId = await TodoRepository.addTask(title);
      res.status(201).json({ id: taskId });
    } catch (error) {
      console.error('Error creating task: ', error);
      res.status(500).send('Error creating task');
    }
  }

  async updateTask(req: Request, res: Response) {
    const taskId = parseInt(req.params.id);
    const { title } = req.body;
    if (!title) {
      res.status(400).send('Title is required');
      return;
    }
    if (title.length > 200) {
      res.status(400).send('Title length should not exceed 200 characters');
      return;
    }
    try {
      await TodoRepository.updateTask(taskId, title);
      res.status(200).send('Task updated successfully');
    } catch (error) {
      console.error('Error updating task: ', error);
      res.status(500).send('Error updating task');
    }
  }

  async deleteTask(req: Request, res: Response) {
    const taskId = parseInt(req.params.id);
    try {
      await TodoRepository.deleteTask(taskId);
      res.status(200).send('Task deleted successfully');
    } catch (error) {
      console.error('Error deleting task: ', error);
      res.status(500).send('Error deleting task');
    }
  }
}

export default new TodoController();
