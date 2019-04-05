const TodoForm = ({ onTodoAddInputChange, todoAddInput, onSubmit }) => {
  return (
    <form onSubmit={ onSubmit } className="form-inline">
      <input
        autoFocus
        type="text"
        className="form-control"
        placeholder="add a new todo..."
        onChange={ onTodoAddInputChange }
        value={ todoAddInput }
      />
      <button type="submit" className="btn btn-light">Add</button>
    </form>
  );
};
