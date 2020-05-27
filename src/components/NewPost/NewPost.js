import React, { Component } from 'react';

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
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

  //handling submit button onclick event
  submit = () => {
    if (!this.state.title || !this.state.description) {
      return alert('You can not submit empty Title and/or Description');
    }
    fetch(`http://localhost:5000/post`, {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        title: this.state.title,
        description: this.state.description,
        createdBy: this.props.user.name,
        email: this.props.user.email,
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
    return (
      <div className="forms">
        <fieldset>
          <legend>Add New Post</legend>
          <label>Title:</label>
          <input type="text" onChange={(txt) => this.titleChange(txt)}></input>
          <br></br>
          <br></br>
          <label>Description:</label>
          <textarea onChange={(txt) => this.descriptionChange(txt)}></textarea>
          <br></br>
          <br></br>
          <button onClick={() => this.submit()}>Submit</button>
          <button onClick={() => this.props.routeChange('home')}>
            Cancel
          </button>
        </fieldset>
      </div>
    );
  }
}

export default NewPost;
