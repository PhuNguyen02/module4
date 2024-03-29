import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Task {
  id: number;
  title: string;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [editTaskTitle, setEditTaskTitle] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get<Task[]>('http://localhost:8000/api/v1/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Lỗi: ', error);
    }
  };

  const createTask = async () => {
    try {
      await axios.post('http://localhost:8000/api/v1/task', { title: newTaskTitle });
      fetchTasks();
      setNewTaskTitle('');
      alert('Thêm thành công');
    } catch (error) {
      console.error('Lỗi: ', error);
      alert('Thêm thất bại ^^');
    }
  };

  const deleteTask = async (taskId: number) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/task/${taskId}`);
      fetchTasks();
      alert('Xoá thành công');
    } catch (error) {
      console.error('Lỗi: ', error);
      alert('Xoá thất bại');
    }
  };

  const updateTask = async (taskId: number, newTitle: string) => {
    try {
      await axios.put(`http://localhost:8000/api/v1/task/${taskId}`, { title: newTitle });
      fetchTasks();
      alert('Cập nhật thành công');
      setEditTaskId(null); // Disable edit mode after updating
    } catch (error) {
      console.error('lỗi: ', error);
      alert('Cập nhật thất bại');
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        placeholder="Nhập tên task"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
      />
      <button onClick={createTask}>Thêm Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {editTaskId === task.id ? (
              <>
                <input
                  type="text"
                  value={editTaskTitle}
                  onChange={(e) => setEditTaskTitle(e.target.value)}
                />
                <button onClick={() => updateTask(task.id, editTaskTitle)}>Save</button>
              </>
            ) : (
              <>
                {task.title}
                <button onClick={() => deleteTask(task.id)}>Delete</button>
                <button onClick={() => { setEditTaskId(task.id); setEditTaskTitle(task.title); }}>Edit</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
