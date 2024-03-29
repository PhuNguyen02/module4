// todo.repository.ts
import db from '../config/database.config'

interface Task {
  id: number;
  title: string;
}

class TodoRepository {
  getAllTasks(): Promise<Task[]> {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM tasks', (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      });
    });
  }

  getTaskById(id: number): Promise<Task | null> {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM tasks WHERE id = ?', [id], (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        if (results.length === 0) {
          resolve(null);
          return;
        }
        resolve(results[0]);
      });
    });
  }

  addTask(title: string): Promise<number> {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO tasks (title) VALUES (?)', [title], (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results.insertId);
      });
    });
  }

  updateTask(id: number, title: string): Promise<void> {
    return new Promise((resolve, reject) => {
      db.query('UPDATE tasks SET title = ? WHERE id = ?', [title, id], (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
  }

  deleteTask(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM tasks WHERE id = ?', [id], (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
  }
}

export default new TodoRepository();
