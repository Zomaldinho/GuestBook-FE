import React, { Component } from 'react';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
    };
  }

  //handling name change
  nameChange = (txt) => {
    this.setState({ name: txt.target.value });
  };

  //handling email change
  emailChange = (txt) => {
    this.setState({ email: txt.target.value });
  };

  //handling password change
  passwordChange = (txt) => {
    this.setState({ password: txt.target.value });
  };

  //handling retyped password change
  password2Change = (txt) => {
    this.setState({ password2: txt.target.value });
  };

  //handle enter key press
  enterPress=(e)=>{
    if(e.which=== 13){
      this.submit()
    }
  }

  //handle register button onclick event
  submit = () => {
    if (this.state.password !== this.state.password2) {
      return window.alert('Re-Typed Password is Not Matching');
    }
    fetch(`http://localhost:5000/register`, {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email.toLowerCase(),
        password: this.state.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          this.props.loadUser(data);
          this.props.routeChange('home');
        } else if (data === 'Wrong Inputs') {
          window.alert('Please Fill All The Fields With Proper Credintals ');
        } else if (data.errmsg.includes('duplicate key')) {
          window.alert('Email is Already Registered');
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
          <legend>Register</legend>
          <label>Name:</label>
          <input type="text" onChange={(txt) => this.nameChange(txt)}></input>
          <br></br>
          <br></br>
          <label>Email:</label>
          <input
            type="email"
            onChange={(txt) => this.emailChange(txt)}
          ></input>
          <br></br>
          <br></br>
          <label>password:</label>
          <input
            type="password"
            onChange={(txt) => this.passwordChange(txt)}
          ></input>
          <br></br>
          <br></br>
          <label>Re-type Password:</label>
          <input
            type="password"
            onChange={(txt) => this.password2Change(txt)}
            onKeyPress={(e)=>this.enterPress(e)}
          ></input>
          <br></br>
          <br></br>
          <button onClick={() => this.submit()}> Register</button>
          <br></br>
          <button onClick={() => this.props.routeChange('signin')}>
            Signin
          </button>
        </fieldset>
      </div>
    );
  }
}

export default Register;
