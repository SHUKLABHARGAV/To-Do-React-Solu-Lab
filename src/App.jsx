import { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import SearchBox from './components/SearchBox';
import './index.css'; // Import the CSS file

const App = () => {
  const [todos, setTodos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editTask, setEditTask] = useState('');
  const [taskCounter, setTaskCounter] = useState(1); // Counter for task numbers

  useEffect(() => {
    fetch('http://localhost:5000/tasks')
      .then(response => response.json())
      .then(data => setTodos(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const addTodo = (task) => {
    const newTask = { id: String(taskCounter), description: task };
    setTodos([...todos, newTask]);
    setTaskCounter(taskCounter + 1); // Increment the counter

    fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })
      .then(response => response.json())
      .then(data => console.log('Task added:', data))
      .catch(error => console.error('Error adding task:', error));
  };

  const deleteTodo = (id) => {
    fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== id));
      })
      .catch(error => console.error('Error deleting task:', error));
  };

  const editTodo = (index) => {
    setEditIndex(index);
    setEditTask(todos[index].description);
  };

  const saveEditTodo = (index, task) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, description: task } : todo
    );
    setTodos(updatedTodos);
    setEditIndex(null);
    setEditTask('');

    const updatedTodo = updatedTodos[index];
    fetch(`http://localhost:5000/tasks/${updatedTodo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTodo),
    })
      .then(response => response.json())
      .then(data => console.log('Task updated:', data))
      .catch(error => console.error('Error updating task:', error));
  };

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  };

  const filteredTodos = todos.filter(todo =>
    todo.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Todo List</h1>
      <div className="search-box">
        <SearchBox
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
        />
      </div>
      <TodoForm addTodo={addTodo} />
      <TodoList
        todos={filteredTodos}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
        saveEditTodo={saveEditTodo}
        editIndex={editIndex}
        editTask={editTask}
        setEditTask={setEditTask}
      />
    </div>
  );
};

export default App;
