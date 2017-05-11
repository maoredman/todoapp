import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoItem from './TodoItem';
import EditableText from './EditableText';
import ItemList from './ItemList';
import TodoList from './TodoList';
import ListList from './ListList';


class App extends Component {
  constructor() {
    super();
    this.state = {
      show: 'all',
      lists: [],
      listcount: 0,
      numDone: 0,
      numUndone: 0,
      clear: false,
    };
    this.addList = this.addList.bind(this);
    this.deleteList = this.deleteList.bind(this);
    this.addtoDone = this.addtoDone.bind(this);
    this.addtoUndone = this.addtoUndone.bind(this);
    this.showAll = this.showAll.bind(this);
    this.showDone = this.showDone.bind(this);
    this.showNotDone = this.showNotDone.bind(this);
    this.setClear = this.setClear.bind(this);
    this.resetClear = this.resetClear.bind(this);
  }

  /* newList() {
    console.log('new list');
  } */
  addList() {
    const newListCount = this.state.listcount + 1;
    const newLists = this.state.lists;
    newLists.push(newListCount);
    this.setState({ listcount: newListCount, lists: newLists });
  }

  deleteList(key) {
    const lists = this.state.lists.filter((itm) => {
      return key !== itm;
    });
    this.setState({ lists }); // ESlint-required shorthand
  }
  
  addtoDone(num) {
    this.setState({ numDone: this.state.numDone + num });
  }

  addtoUndone(num) {
    this.setState({ numUndone: this.state.numUndone + num });
  }

  showAll() {
    this.setState({ show: 'all'});
  }
  showDone() {
    this.setState({ show: 'done'});
  }
  showNotDone() {
    this.setState({ show: 'notdone'});
  }
  setClear() {
    this.setState({ clear: true, numDone: 0 });
  }
  resetClear() {
    this.setState({ clear: false });
  }

  render() {
    var AllClass = '';
    var DoneClass = '';
    var NotDoneClass = '';
    if (this.state.show === 'all') {
      AllClass = 'fill';
    } else if (this.state.show === 'done') {
      DoneClass = 'fill';
    } else {
      NotDoneClass = 'fill';
    }
    return (
      <div>
        <h2 className='topbar'>
          Done: { this.state.numDone } &nbsp; &nbsp; Not done: { this.state.numUndone }
        </h2>
        <div className="center">
          <button onClick={this.addList}>Click to add list</button>
          <button onClick={this.showAll} className={AllClass}>All</button>
          <button onClick={this.showDone} className={DoneClass}>Done</button>
          <button onClick={this.showNotDone} className={NotDoneClass}>Not Done</button>
          <button onClick={this.setClear} onMouseLeave={this.resetClear}>Clear Done</button>
        </div>
        <ListList show={this.state.show} clear={this.state.clear} numbers={this.state.lists} deleteList={this.deleteList} addtoDone={this.addtoDone} addtoUndone={this.addtoUndone} />
      </div>
    );
  }
}

export default App;
