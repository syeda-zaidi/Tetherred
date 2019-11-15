
import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

// import { makeStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
// import Container from 'react-bootstrap/Container';
// import Button from "../../components/CustomButtons/Button.js";
// import Card from "../../components/Card/Card.js";
// import CardBody from "../../components/Card/CardBody.js";
// import CardHeader from "../../components/Card/CardHeader.js";
// import GridContainer from "../../components/Grid/GridContainer.js";
// import GridItem from '../../components/Grid/GridItem';
// import Visibility from '@material-ui/icons/Visibility';
// import VisibilityOff from '@material-ui/icons/VisibilityOff';


// const useStyles = makeStyles(theme => ({
//   container: {
//     display: 'flex',
//     flexWrap: 'wrap',
//   },
//   textField: {
//     marginLeft: theme.spacing(1),
//     marginRight: theme.spacing(1),
//     width: 200,
//   },
// }));



class BasicTextFields extends React.Component {

  // const classes = useStyles();
  
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      redirectTo: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)

  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('handleSubmit');
    console.log(this.state.email);

    axios.post('/api/sessions/signin', {
      email: this.state.email,
      password: this.state.password
    })
      .then(response => {
        console.log('login response: ')
        console.log(response)
        if (response.status === 200) {
          // update App.js state
          this.props.updateUser({
            loggedIn: true,
            email: response.data.email
          })
          // update the state to redirect to home
          this.setState({
            redirectTo: '/dashboard'
          })
        }
      }).catch(error => {
        console.log('login error: ')
        console.log(error);

      })
  }

  // And return the JS
  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    } else {

      return (
         <div>
        < div className = "container" >
          <div className="row">
            <h1>Welcome To Tetherred</h1>
          </div>

          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="emailInput">Email</label>
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
        </div >
        </div>
      )
    }
  }
}



export default BasicTextFields;

