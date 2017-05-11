import React, { Component } from 'react';
import TodoList from './TodoList';

class ListList extends Component {
  constructor(props) {
    super(props);
    this.deleteList = this.deleteList.bind(this);
    this.addtoDone = this.addtoDone.bind(this);
    this.addtoUndone = this.addtoUndone.bind(this);
  }

  deleteList(key) {
    this.props.deleteList(key);
  }

  addtoDone(num) {
    this.props.addtoDone(num);
  }

  addtoUndone(num) {
    this.props.addtoUndone(num);
  }

  render() {
    const numbers = this.props.numbers;
    const listList = numbers.map((number) =>
      <TodoList show={this.props.show} clear={this.props.clear} key={number.toString()} accessKey={number} deleteList={this.deleteList} addtoDone={this.addtoDone} addtoUndone={this.addtoUndone} />
    );
    return (
      <div className>
        {listList}
      </div>
    );
  }
}
ListList.propTypes = {
  numbers: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
  deleteList: React.PropTypes.func.isRequired,
  addtoDone: React.PropTypes.func.isRequired,
  addtoUndone: React.PropTypes.func.isRequired,
};

export default ListList;