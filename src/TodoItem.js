import React, { Component } from 'react';
import EditableText from './EditableText';

class TodoItem extends Component { // need to implement delete function
  constructor(props) { // takes props.deleteItem()
    super(props);
    this.state = { done: false };
    this.deleteItem = this.deleteItem.bind(this);
    this.addtoDone = this.addtoDone.bind(this);
    this.addtoUndone = this.addtoUndone.bind(this);
    this.setDoneState = this.setDoneState.bind(this);
  }

  setDoneState(doneState) {
    this.setState({ done: doneState });
    if (doneState) {
      this.props.addtoDone(1);
      this.props.addtoUndone(-1);
    } else {
      this.props.addtoUndone(1);
      this.props.addtoDone(-1);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.clear && this.state.done) {
        this.deleteItem(0);
    }
  }
  
  deleteItem(num) {
    if (this.state.done) {
      this.props.addtoDone(num);
    } else {
      this.props.addtoUndone(num);
    }
    this.props.deleteItem(this.props.accessKey);
  }

  addtoDone(num) {
    this.props.addtoDone(num);
  }

  addtoUndone(num) {
    this.props.addtoUndone(num);
  }

  render() {
    let hideOrNot = '';
    if (this.props.show === 'notdone' && this.state.done || this.props.show === 'done' && !this.state.done) {
        hideOrNot = 'hide'
    }
    return (      
      <div className={hideOrNot}>
        <EditableText placeholder="Todo item..." showbox setDoneState={this.setDoneState} addtoDone={this.addtoDone} addtoUndone={this.addtoUndone} />
        <button onClick={() => this.deleteItem(-1)}><i className="fa fa-trash-o" aria-hidden="true" /></button>
      </div>
    );
  }
}
TodoItem.propTypes = {
  accessKey: React.PropTypes.number.isRequired,
  deleteItem: React.PropTypes.func.isRequired,
  addtoDone: React.PropTypes.func.isRequired,
  addtoUndone: React.PropTypes.func.isRequired,
};

export default TodoItem;
