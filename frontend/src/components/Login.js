import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import LoginService from '../services/LoginService';
import Message from '../elements/Message';
import Error from '../elements/Error';
import axios from 'axios';
import {
  COMMON_FIELDS,
  REGISTRATION_FIELDS,
  LOGIN_FIELDS,
  LOGIN_MESSAGE,
  ERROR_IN_LOGIN,
} from '../MessageBundle';
import '../javel.css';
import {register} from '../constants/constants';
import loginImg from "./icon.png";

export default class Login extends Component {
  constructor (props) {
    super (props);

    this.state = {
      email: '',
      password: '',
      id: '',
      name: '',
      error: false,
      loginSuccess: false,
    };
  }

  handleOnChangeUserName = (e) => {
    this.setState ({
      email: e.target.value,
    });
  };

  handleOnChangePassword = e => {
    this.setState ({
      password: e.target.value,
    });
  };

  onSubmit = async e => {
    const data = {
      email: this.state.email,
      password: this.state.password,
    };

    var response;

    await axios.post("http://localhost:5000/api/login", data)
    .then(function(res) {
        response = res;
        console.log(response);
    })

    if (response.status !== 200) {
      this.setState ({
        error: true,
        loginSuccess: false,
      });
    } else {
      this.setState ({
        id: response.data._id,
        name: response.data.name,
        email: response.data.email,
        loginSuccess: true,
        error: false,
      });   
      this.props.history.push({
        pathname: '/page2',
        state: {"id": this.state.id, "name": this.state.name}, // your data array of objects
      })
      console.log('Successfully Login');
    } 

  };

  render () {
    const {loginSuccess, error} = this.state;
    return (
        <div className="login">
          <div className="image">
            <img src={loginImg}></img>
          </div>
          <h1> {LOGIN_FIELDS.LOGIN_HEADING} </h1> {' '} <form
            onSubmit={this.onSubmit}
        >
          <div>
            <div className="fields">
              <p> {COMMON_FIELDS.USER_NAME} </p>
              {' '}{' '}{' '}{' '}
              {' '}
              {' '}
              <input
                  type="text"
                  name="Username"
                  onChange={this.handleOnChangeUserName}
                  autoComplete="Username"
                  required
              />
            </div>
            {' '}
            {' '}
            {' '}
            {' '}
            <div className="fields">
              {' '}
              {' '}
              {' '}
              <p> {COMMON_FIELDS.PASSWORD} </p>
              {' '}{' '}{' '}{' '}
              {' '}
              {' '}
              <input
                  type="password"
                  name="Password"
                  onChange={this.handleOnChangePassword}
                  autoComplete="Password"
                  required
              />
              {' '}
              {' '}
              {' '}
              {' '}
              {' '}
            </div>
            {' '}
            {' '}
            {' '}
            {' '}
            <div className = "buttons">
            {/* <Link to='/page2'> */}
              <button
                type="button"
                onClick={this.onSubmit}
                className="btn btn-primary btn-sm">
              {' '}{' '}{' '} {LOGIN_FIELDS.LOGIN} {' '}{' '}{' '}{' '}
            </button>
            {/* </Link> */}
              {' '}
              {' '}
              {' '}
              {' '}
              {' '}
              <Link to={register}> {REGISTRATION_FIELDS.REGISTER} </Link>
              {' '}{' '}
              {' '}
              {' '}
              {' '}
              {' '}
            </div>{' '} {' '}{' '}
          </div>{' '} {' '}{' '}
        </form>
          {' '}
          {' '}
          {loginSuccess && <Message message={LOGIN_MESSAGE} />}
          {' '}{' '}{' '}{' '}
          {' '}
          {' '}
          {error && <Error message={ERROR_IN_LOGIN} />}
          {' '}{' '}{' '}{' '}
          {' '}
          {' '}
        </div>
    );
  }
}


