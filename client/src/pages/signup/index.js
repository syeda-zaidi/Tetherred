import React from "react";
import axios from "axios";
import { Redirect } from 'react-router-dom';


class SignUpPage extends React.Component {

  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      redirectTo: null

    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  };


  handleSubmit(event) {
    event.preventDefault();
    console.log('sign-up handleSubmit, username: ')
    console.log(this.state.email)

    //request to server to add a new username/password
    axios.post('/api/sessions/signup', {
      email: this.state.email,
      password: this.state.password
    })
      .then(response => {
        console.log("signup response : ");
        console.log(response);

        if (response.status === 200) {
          console.log('successful signup');
          console.log(response.data.email);

          // update App.js state
          this.props.updateUser({
            loggedIn: true,
            email: response.data.email
          })
          this.setState({
            redirectTo: '/'
          })
        } else {
          console.log('username already taken')
        }
      }).catch(error => {
        console.log('signup error: ')
        console.log(error)

      })
  };


  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    } else {

      return (
        <div className="container">
          <div className="row">
            <h1>SignUP to Create a New Account</h1>
          </div>
         
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="emailInput">
                    Email
                      </label>
                  <input
                    type="email"
                    id="emailInput"
                    name="email"
                    className="form-control"
                    aria-describedby="emailHelp"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                  <small id="emailHelp" className="form-text text-muted">secret@email.com</small>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="passwordInput">
                    Password
                      </label>
                  <input
                    type="password"
                    id="passwordInput"
                    className="form-control"
                    name="password"
                    aria-describedby="passwordHelp"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                  <small id="passwordHelp" className="form-text text-muted">test123</small>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <button type="submit">Login</button>
              </div>
            </div>
          </form>
        </div>
      )

    }
  }
}

export default SignUpPage;