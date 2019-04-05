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
