import React, { Component } from 'react';
import EditableText from './EditableText';
import ItemList from './ItemList';

class TodoList extends Component {
  constructor(props) { // takes props.addtoDone/Undone
    super(props);
    this.state = {
      items: [],
      itemcount: 0,
      doneCount: 0,
      undoneCount: 0,
    };
    this.deleteItem = this.deleteItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.addtoDone = this.addtoDone.bind(this);
    this.addtoUndone = this.addtoUndone.bind(this);
    this.deleteList = this.deleteList.bind(this);
  }
  
  addItem() {
    const newItemCount = this.state.itemcount + 1;
    const newItems = this.state.items;
    newItems.push(newItemCount);
    this.setState({ itemcount: newItemCount, items: newItems });
    this.props.addtoUndone(1);
    this.setState({ undoneCount: this.state.undoneCount + 1 });
  }

  deleteList() {
    this.props.addtoDone(this.state.doneCount * (-1));
    this.props.addtoUndone(this.state.undoneCount * (-1));
    this.props.deleteList(this.props.accessKey);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.clear) {
        this.setState({ doneCount: 0 });
    }
  }

  deleteItem(key) {
    const items = this.state.items.filter((itm) => {
      return key !== itm;
    });
    this.setState({ items }); // ESlint-required shorthand
  }

  addtoDone(num) {
    this.props.addtoDone(num);
    this.setState({ doneCount: this.state.doneCount + num });
  }

  addtoUndone(num) {
    this.props.addtoUndone(num);
    this.setState({ undoneCount: this.state.undoneCount + num });
  }

  render() {
    /* var rows = [];
    this.props.products.forEach( (product) => {
      rows.push(<TodoItem value={product} key={product.name} />);
    }); */
    return (
      <div className='list'>
        <EditableText placeholder="Todo list title..." isListTitle />
        <button onClick={this.deleteList}><i className="fa fa-trash-o" aria-hidden="true" /></button>
        <button onClick={this.addItem}><i className="fa fa-plus-square-o" aria-hidden="true" /></button>
        <ItemList show={this.props.show} clear={this.props.clear} numbers={this.state.items} deleteItem={this.deleteItem} addtoDone={this.addtoDone} addtoUndone={this.addtoUndone} />
      </div>
    );
  }
}
TodoList.propTypes = {
  addtoUndone: React.PropTypes.func.isRequired,
  addtoDone: React.PropTypes.func.isRequired,
  deleteList: React.PropTypes.func.isRequired,
  accessKey: React.PropTypes.number.isRequired,
};

export default TodoList;