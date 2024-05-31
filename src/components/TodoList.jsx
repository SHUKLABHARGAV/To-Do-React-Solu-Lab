import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ todos, deleteTodo, editTodo, saveEditTodo, editIndex, editTask, setEditTask }) => { 
  return (
    <div>
        <ol>
    {todos.map((todo, index) => (
      <TodoItem
        key={todo.id}
        todo={todo}
        index={index}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
        saveEditTodo={saveEditTodo}
        editIndex={editIndex}
        editTask={editTask}
        setEditTask={setEditTask}
      />
    ))}
    </ol>
  </div>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  saveEditTodo: PropTypes.func.isRequired,
  editIndex: PropTypes.number,
  editTask: PropTypes.string,
  setEditTask: PropTypes.func.isRequired,
};

export default TodoList;
