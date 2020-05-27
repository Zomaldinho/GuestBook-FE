import React, { Component } from 'react';

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.editedPost.title,
      description: this.props.editedPost.description,
    };
  }

  //handling title change
  titleChange = (txt) => {
    this.setState({ title: txt.target.value });
  };

  //handling description change
  descriptionChange = (txt) => {
    this.setState({ description: txt.target.value });
  };

  //handling submit button onClick event
  submit = () => {
    if (!this.state.title || !this.state.description) {
      return alert('You can not submit empty Title and/or Description');
    }
    fetch(`http://localhost:5000/edit/${this.props.editedPost._id}`, {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        title: this.state.title,
        description: this.state.description,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data._id) {
          this.props.routeChange('home');
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { routeChange, editedPost } = this.props;
    return (
      <div className="forms">
        <fieldset>
          <legend>Edit Your Post</legend>
          <label>Title:</label>
          <input
            type="text"
            defaultValue={editedPost.title}
            onChange={(txt) => this.titleChange(txt)}
          ></input>
          <br></br>
          <br></br>
          <label>Description:</label>
          <textarea
            defaultValue={editedPost.description}
            onChange={(txt) => this.descriptionChange(txt)}
          ></textarea>
          <br></br>
          <br></br>
          <button onClick={() => this.submit()}>Submit</button>
          <button onClick={() => routeChange('home')}>Cancel</button>
        </fieldset>
      </div>
    );
  }
}

export default Edit;
