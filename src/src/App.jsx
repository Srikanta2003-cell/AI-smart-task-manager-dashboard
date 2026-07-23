import { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [title, setTitle] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!title.trim()) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title,
        completed: false
      }
    ]);

    setTitle('');
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='container'>
      <header className='header'>
        <div>
          <h1>AI Smart Task Manager</h1>
          <p>React Frontend Project</p>
        </div>

        <input
          type='text'
          placeholder='Search tasks...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </header>

      <div className='stats'>
        <div className='card'>
          <h3>{tasks.length}</h3>
          <p>Total</p>
        </div>

        <div className='card'>
          <h3>{tasks.filter(t => t.completed).length}</h3>
          <p>Completed</p>
        </div>

        <div className='card'>
          <h3>{tasks.filter(t => !t.completed).length}</h3>
          <p>Pending</p>
        </div>
      </div>

      <div className='task-form'>
        <input
          type='text'
          placeholder='Enter task'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button onClick={addTask}>Add Task</button>
      </div>

      <div className='task-list'>
        {filteredTasks.length === 0 ? (
          <p className='empty'>No tasks found</p>
        ) : (
          filteredTasks.map(task => (
            <div
              key={task.id}
              className={`task-card ${task.completed ? 'completed' : ''}`}
            >
              <span>{task.title}</span>

              <div className='actions'>
                <button onClick={() => toggleTask(task.id)}>
                  {task.completed ? 'Undo' : 'Done'}
                </button>

                <button
                  className='delete'
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
