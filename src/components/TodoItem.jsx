 import PropTypes from 'prop-types';

const TodoItem = ({
  todo, index, deleteTodo, editTodo, saveEditTodo,
  editIndex, editTask, setEditTask
}) => {
  return (
    <li>
        <div>
       <span>{todo.id}</span></div>
    {editIndex === index ? (
      <div>
        <input
          type="text"
          value={editTask}
          onChange={(e) => setEditTask(e.target.value)}
        />
        <button onClick={() => saveEditTodo(index, editTask)}>Save</button>
      </div>
    ) : (
      <div>
        <span>{todo.description}</span>
        <button style={{backgroundColor:"orange"}}   onClick={() => editTodo(index)}>Edit</button>
        <button style={{backgroundColor:"red"}} onClick={() => deleteTodo(todo.id)}>Delete</button>
      </div>
    )}
  </li>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired,
  index: PropTypes.number.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  saveEditTodo: PropTypes.func.isRequired,
  editIndex: PropTypes.bool.isRequired,
  editTask: PropTypes.string.isRequired,
  setEditTask: PropTypes.func.isRequired,
};

export default TodoItem;
