import React, { Component } from 'react';
import TodoItem from './TodoItem';

class ItemList extends Component {
  constructor(props) {
    super(props);
    this.deleteItem = this.deleteItem.bind(this);
    this.addtoDone = this.addtoDone.bind(this);
    this.addtoUndone = this.addtoUndone.bind(this);
  }

  deleteItem(key) {
    this.props.deleteItem(key);
  }

  addtoDone(num) {
    this.props.addtoDone(num);
  }

  addtoUndone(num) {
    this.props.addtoUndone(num);
  }

  render() {
    const numbers = this.props.numbers;
    const itemlist = numbers.map((number) =>
      <TodoItem show={this.props.show} clear={this.props.clear} key={number.toString()} accessKey={number} deleteItem={this.deleteItem} addtoDone={this.addtoDone} addtoUndone={this.addtoUndone} />
    );
    return (
      <div>
        {itemlist}
      </div>
    );
  }
}
ItemList.propTypes = {
  numbers: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
  deleteItem: React.PropTypes.func.isRequired,
  addtoDone: React.PropTypes.func.isRequired,
  addtoUndone: React.PropTypes.func.isRequired,
};

export default ItemList;