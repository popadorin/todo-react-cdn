const removeItem = (items, itemIndex) => items.filter((_, i) => i !== itemIndex);

const TodoList = ({ todoItems, removeItem, markTodoDone }) => {
  const itemsNodes = todoItems.map((item, index) => (
    <li key={ index } className="list-group-item " onClick={ () => markTodoDone(parseInt(index)) } >
      <div className={ item.done ? 'done' : 'undone' }>
        { item.value }
        <button type="button" className="close" onClick={ (e) => {
            e.stopPropagation();
            removeItem(parseInt(index));} }>&times;</button>
      </div>
    </li>
  ));

  return (
    <ul className="list-group"> { itemsNodes } </ul>
  );
};

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

class Todo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todoItems: props.initItems,
      todoAddInput: '',
    };
  }

  addItem = todoItemValue => {
    this.setState(({ todoItems }) => {
      const newItem = {
        value: todoItemValue,
        index: todoItems.length + 1,
        done: false,
      };

      return { todoItems: [newItem].concat(todoItems) };
    });
  };

  removeItem = itemIndex => this.setState(({ todoItems }) => ( {
    todoItems: removeItem(todoItems, itemIndex),
  } ));

  onSubmit = event => {
    event.preventDefault();
    const { todoAddInput } = this.state;

    if (todoAddInput) {
      this.addItem(todoAddInput);
    }

    this.setState({ todoAddInput: '' });
  };

  markTodoDone = itemIndex => {
    this.setState(({ todoItems }) => {
      const itemToMark = todoItems[itemIndex];
      const restItems = removeItem(todoItems, itemIndex);
      itemToMark.done = !itemToMark.done;
      const reformattedItems = itemToMark.done ? restItems.concat(itemToMark) : [itemToMark].concat(restItems);

      return { todoItems: reformattedItems };
    });
  };

  onTodoAddInputChange = event => this.setState({ todoAddInput: event.target.value });

  render() {
    const { todoAddInput, todoItems } = this.state;

    return (
      <div id="main">
        <h1>Todo list</h1>
        <TodoList
          todoItems={ todoItems }
          removeItem={ this.removeItem }
          markTodoDone={ this.markTodoDone }
        />
        <TodoForm
          addItem={ this.addItem }
          onSubmit={ this.onSubmit }
          todoAddInput={ todoAddInput }
          onTodoAddInputChange={ this.onTodoAddInputChange }
        />
      </div>
    );
  }
}

const initTodoItems = [
  { index: 1, value: 'learn react', done: false },
  { index: 2, value: 'Go shopping', done: true },
  { index: 3, value: 'buy flowers', done: true }
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <Todo initItems={ initTodoItems } />
      </div>
    );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
