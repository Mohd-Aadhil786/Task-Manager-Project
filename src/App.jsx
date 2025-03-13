import React, { useState } from 'react';

    function App() {
      const [tasks, setTasks] = useState([
        { id: 1, text: 'Implement task list', description: 'Create a list to display tasks.', completed: true, progress: 100 },
        { id: 2, text: 'Add task creation', description: 'Allow users to add new tasks.', completed: false, progress: 0 },
        { id: 3, text: 'Implement task completion', description: 'Allow users to mark tasks as complete.', completed: false, progress: 0 },
        { id: 4, text: 'Add task deletion', description: 'Allow users to delete tasks.', completed: false, progress: 0 },
        { id: 5, text: 'Style the application', description: 'Improve the visual appearance of the app.', completed: true, progress: 100 },
        { id: 6, text: 'Add task descriptions', description: 'Include a description field for each task.', completed: true, progress: 100 },
        { id: 7, text: 'Implement task counts', description: 'Show the number of completed and to-do tasks.', completed: true, progress: 100 },
        { id: 8, text: 'Add a border layout', description: 'Add a border to each task item.', completed: true, progress: 100 },
        { id: 9, text: 'Add gradient background', description: 'Add a gradient background to the page.', completed: true, progress: 100 },
        { id: 10, text: 'Make the page colorful', description: 'Modify the page with more colorful styling.', completed: true, progress: 100 },
      ]);
      const [newTaskText, setNewTaskText] = useState('');
      const [newTaskDescription, setNewTaskDescription] = useState('');

      const completedTasksCount = tasks.filter(task => task.completed).length;
      const todoTasksCount = tasks.length - completedTasksCount;

      const handleTaskCompletion = (taskId) => {
        setTasks(tasks.map(task =>
          task.id === taskId ? { ...task, completed: !task.completed, progress: task.completed ? 0 : 100 } : task
        ));
      };

      const handleTaskDeletion = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
      };

      const handleNewTaskTextChange = (event) => {
        setNewTaskText(event.target.value);
      };

      const handleNewTaskDescriptionChange = (event) => {
        setNewTaskDescription(event.target.value);
      };

      const handleAddTask = () => {
        if (newTaskText.trim() !== '') {
          const newTask = {
            id: Date.now(),
            text: newTaskText,
            description: newTaskDescription,
            completed: false,
            progress: 0,
          };
          setTasks([...tasks, newTask]);
          setNewTaskText('');
          setNewTaskDescription('');
        }
      };

      const handleProgressChange = (taskId, newProgress) => {
        setTasks(tasks.map(task =>
          task.id === taskId ? { ...task, progress: newProgress } : task
        ));
      };

      return (
        <div>
          <h1>Task Management</h1>

          <div>
            <p>Completed Tasks: {completedTasksCount}</p>
            <p>To Do Tasks: {todoTasksCount}</p>
          </div>

          <div className="add-task-form">
            <input
              type="text"
              placeholder="Add a new task"
              value={newTaskText}
              onChange={handleNewTaskTextChange}
            />
            <input
              type="text"
              placeholder="Add a description"
              value={newTaskDescription}
              onChange={handleNewTaskDescriptionChange}
            />
            <button onClick={handleAddTask}>Add Task</button>
          </div>

          <ul className="task-list">
            {tasks.map(task => (
              <li key={task.id} className="task-item">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleTaskCompletion(task.id)}
                />
                <span>
                  <b>{task.text}</b>
                  <br />
                  {task.description}
                  <br />
                  Progress: {task.progress}%
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={task.progress}
                    onChange={(e) => handleProgressChange(task.id, parseInt(e.target.value))}
                  />
                </span>
                <button onClick={() => handleTaskDeletion(task.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    export default App;
