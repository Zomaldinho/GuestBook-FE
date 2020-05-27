import React, { Component } from 'react';
import './Post.css';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      replyText: '',
    };
  }

  //getting intial data from server
  componentDidMount() {
    fetch('http://localhost:5000/')
      .then((response) => response.json())
      .then((data) => this.setState({ data }));
  }

  //handling post deletion
  delete = (post) => {
    let confirm = window.confirm('Are you sure you want to delete this post?');
    if (confirm) {
      fetch(`http://localhost:5000/delete/${post._id}`, {
        method: 'delete',
      })
        .then(this.componentDidMount())
        .catch((err) => console.log(err));
    }
  };

  //handling reply input text change
  txtChange = (e) => {
    this.setState({ replyText: e.target.value });
  };

  //handle enter key press on the reply input text
  enterPress = (e, post, i) => {
    if (e.which === 13) {
      this.addReply(post, i);
    }
  };

  //updating the replies when click Reply button
  addReply = (post, i) => {
    if (!this.state.replyText) {
      return alert('You can not submit empty Reply');
    }
    fetch(`http://localhost:5000/reply/${post._id}`, {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        description: this.state.replyText,
        writtenBy: this.props.user.name,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data._id) {
          this.componentDidMount();
          document.getElementsByClassName('rplyTxt')[i].value = '';
        }
      })
      .catch((err) => console.log(err));
  };

  //handling Edit button onClick event
  edit = (post) => {
    this.props.editedPost(post);
    this.props.routeChange('edit');
  };

  render() {
    return (
      <div className="container">
        <h2>Welcome {this.props.user.name} to the Guest Book App</h2>
        {/* Looping throught the posts */}
        {this.state.data.map((post, i) => {
          return (
            <div className="post">
              <h3>{post.title}</h3>
              <p className="pstTxt">{post.description}</p>
              <p>{post.createdBy} wrote</p>
              {/* Adding condition to show the edit and delete buttons only if the user is the same one who created the post */}
              {post.email === this.props.user.email ? (
                <div>
                  <button onClick={() => this.edit(post)}>Edit</button>
                  <button onClick={() => this.delete(post)}>Delete</button>
                </div>
              ) : (
                <br></br>
              )}
              <input
                type="text"
                placeholder="Add a reply"
                className="rplyTxt"
                onChange={(txt) => this.txtChange(txt)}
                onKeyPress={(e) => this.enterPress(e, post, i)}
              ></input>
              <button onClick={() => this.addReply(post, i)}>reply</button>
              {post.replies.map((reply) => {
                return (
                  <div className="reply">
                    <p className="pstTxt">{reply.description}</p>
                    <p>{reply.writtenBy} replied</p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Post;
