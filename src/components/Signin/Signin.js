import React, { Component } from 'react';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  //handle email change
  emailChange = (txt) => {
    this.setState({ email: txt.target.value });
  };

  //handle password change
  passwordChange = (txt) => {
    this.setState({ password: txt.target.value });
  };

  //handle enter key press
  enterPress=(e)=>{
    if(e.which=== 13){
      this.submit()
    }
  }

  //handle submit button onclick event
  submit = () => {
    fetch(`http://localhost:5000/signin`, {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        email: this.state.email.toLowerCase(),
        password: this.state.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          this.props.loadUser(data);
          this.props.routeChange('home');
        } else {
          window.alert('Please Fill All The Fields With Proper Credintals');
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="forms">
        <br></br>
        <h1>Welcome to the Geust Book App</h1>
        <h4>Please Sign in or Register to get to the App</h4>
        <fieldset>
          <legend>Sign In</legend>
          <label>Email:</label>
          <input
            type="text"
            autoComplete="on"
            onChange={(txt) => this.emailChange(txt)}
          ></input>
          <br></br>
          <br></br>
          <label>Password:</label>
          <input
            type="password"
            onChange={(txt) => this.passwordChange(txt)}
            onKeyPress={(e)=>this.enterPress(e)}
          ></input>
          <br></br>
          <br></br>
          <button onClick={() => this.submit()}>Submit</button>
          <br></br>
          <button onClick={() => this.props.routeChange('register')}>
            Register
          </button>
        </fieldset>
      </div>
    );
  }
}

export default Signin;
