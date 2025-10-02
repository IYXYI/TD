import React, { useEffect, useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  useEffect(() => {
    fetch('/api/todos')
      .then(res => res.json())
      .then(setTodos);
  }, []);

  const addTodo = async () => {
    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task })
    });
    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
    setTask('');
  };

  const toggleTodo = async (id, done) => {
    const res = await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ done: !done })
    });
    const updated = await res.json();
    setTodos(todos.map(t => t.id === id ? updated : t));
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h2>Todo List</h2>
      <input value={task} onChange={e => setTask(e.target.value)} placeholder="New todo..." />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <label>
              <input type="checkbox" checked={todo.done} onChange={() => toggleTodo(todo.id, todo.done)} />
              {todo.task}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
