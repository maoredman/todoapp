import React, { Component } from 'react';

class EditableText extends Component {
  constructor(props) { // props.placeholder string, props.showbox bool default false
    super(props);
    this.state = { content: '', editing: true, done: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDone = this.handleDone.bind(this);
  }

  componentDidMount(){
    this.nameInput.focus();
  }

  handleChange(event) {
    this.setState({ content: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    if (this.state.done) {
      this.props.addtoDone(-1);
      this.props.addtoUndone(1);
    }
    if (this.state.done) {
        this.props.setDoneState(false);
    }
    this.setState({ editing: false, done: false });
  }
  handleEdit() {
    this.setState({ editing: true });
  }
  handleDone() {
    if (!this.state.editing) {
      const newDoneState = !this.state.done;
      this.setState({ done: newDoneState });
      this.props.setDoneState(newDoneState);
    }
  }

  render() {
    const checkbox = (this.props.showbox) ? <input type="checkbox" onClick={this.handleDone} /> : null;
    if (this.state.editing) {
      return (
        <form onSubmit={this.handleSubmit}>
          {checkbox}
          <label>
            <input
              type="text"
              placeholder={this.props.placeholder}
              value={this.state.content}
              onChange={this.handleChange}
              ref={(input) => { this.nameInput = input; }}
            />
          </label>
          <button type="submit">
            <i className="fa fa-floppy-o" aria-hidden="true"></i>
          </button>
        </form>
      );
    }
    let textClass = (this.state.done) ? 'done' : '';
    textClass += (this.props.isListTitle) ? ' listtitle' : '';
    return ( // not editing
      <span>
        {checkbox}
        <span className={textClass}> {this.state.content} </span>
        <button onClick={this.handleEdit}><i className="fa fa-pencil-square-o" aria-hidden="true" /></button>
      </span>
    );
  }
}
EditableText.propTypes = {
  placeholder: React.PropTypes.string.isRequired,
  showbox: React.PropTypes.bool,
  setDoneState: React.PropTypes.func,
  addtoDone: React.PropTypes.func,
  addtoUndone: React.PropTypes.func,
  isListTitle: React.PropTypes.bool,
};
EditableText.defaultProps = {
  showbox: false,
  setDoneState(whatever) { return true; },
  addtoDone(whatever) { return true; },
  addtoUndone(whatever) { return true; },
  isListTitle: false,
};

export default EditableText;
