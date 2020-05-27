import React, { Component } from 'react';
import Post from './components/Post/Post';
import Edit from './components/Edit/Edit';
import Navbar from './components/Navbar/Navbar';
import NewPost from './components/NewPost/NewPost';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      route: 'signin',
      editedPost: null,
      user: {
        id: '',
        name: '',
        email: '',
        date: '',
      },
    };
  }

  //Routing functions to handle renered components
  Routing = (route) => {
    this.setState({ route: route });
  };

  //retrieving user data from signin and storing in state
  loadUser = (user) => {
    this.setState({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        date: user.date,
      },
    });
  };

  //To save data from post component and pass it to the Edit component
  editedPost = (post) => {
    this.setState({ editedPost: post });
  };

  render() {
    return (
      <div className="App">
        {this.state.route === 'home' ? (
          <div>
            <Navbar routeChange={this.Routing} />
            <Post
              routeChange={this.Routing}
              editedPost={this.editedPost}
              user={this.state.user}
            />
          </div>
        ) : this.state.route === 'edit' ? (
          <div>
            <div>
              <Navbar routeChange={this.Routing} />
              <Edit
                routeChange={this.Routing}
                editedPost={this.state.editedPost}
              />
            </div>
          </div>
        ) : this.state.route === 'newPost' ? (
          <div>
            <Navbar routeChange={this.Routing} />
            <NewPost routeChange={this.Routing} user={this.state.user} />
          </div>
        ) : this.state.route === 'signin' ? (
          <Signin routeChange={this.Routing} loadUser={this.loadUser} />
        ) : this.state.route === 'register' ? (
          <Register routeChange={this.Routing} loadUser={this.loadUser} />
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

export default App;
