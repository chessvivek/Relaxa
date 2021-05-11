import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import UserRegistration from '../../src/services/RegistrationService';
import Message from '../..//src/elements/Message';
import Error from '../../src/elements/Error';
import axios from 'axios';
import {
  REGISTRATION_FIELDS,
  REGISTRATION_MESSAGE,
  COMMON_FIELDS,
  ERROR_IN_REGISTRATION,
} from '../../src/MessageBundle';
import '../javel.css';
import loginImg from "./icon.png";
export default class Registration extends Component {
  constructor (props) {
    super (props);
    this.state = {
      name: '',
      username: '',
      password: '',
      register: false,
      error: false,
    };
  }

  handleOnChangeName = e => {
    this.setState ({
      name: e.target.value,
    });
  };

  handleOnChangeUserName = e => {
    this.setState ({
      username: e.target.value,
    });
  };

  handleOnChangePassword = e => {
    this.setState ({
      password: e.target.value,
    });
  };


  handleOnBlur = async e => {
    this.setState ({
      username: e.target.value,
    });
    const data = {
      username: this.state.user_name,
    };
  };

  onSubmit = async e => {
    e.preventDefault ();
    console.log("ssub")
    const data = {
      name: this.state.name,
      email: this.state.username,
      password: this.state.password,
    };

    var response;

    await axios.post("http://localhost:5000/api/register", data)
    .then(function(res) {
        response = res;
        console.log(response);
    });

    console.log(response);
    if (response.status === 200) {
      console.log("yes");
      this.setState ({
        register: true,
        error: false,
      });
      this.props.history.push("/");
    } else{
      this.setState ({
        error: true,
        register: false,
      });
      console.log("no");
    }

  };

  render () {
    const {register, error, user_name_taken} = this.state;

    return (

        <div className="register">
        <div className="image">
              <img src={loginImg}></img>
        </div>
          <h1> {REGISTRATION_FIELDS.REGISTRATION_HEADING} </h1> <form
            onSubmit={this.onSubmit}
        >
          <div>
            <div className="fields">
              {' '}
              <p> {REGISTRATION_FIELDS.NAME} </p>
              {' '}
              {' '}
              {' '}
              <input
                  type="text"
                  className={classNames ({error: user_name_taken})}
                  value={this.state.name}
                  name="name"
                  onBlur={this.handleOnBlur}
                  onChange={this.handleOnChangeName}
                  autoComplete="name"
                  required
              />
            </div>
            <div className="fields">
              {' '}
              <p> {COMMON_FIELDS.USER_NAME} </p>
              {' '}
              {' '}
              {' '}
              <input
                  type="text"
                  className={classNames ({error: user_name_taken})}
                  value={this.state.username}
                  name="username"
                  onBlur={this.handleOnBlur}
                  onChange={this.handleOnChangeUserName}
                  autoComplete="username"
                  required
              />
            </div>
            <div className="fields">
            {' '}
            <p> {COMMON_FIELDS.PASSWORD} </p>
            {' '}
            {' '}
            {' '}
            <input
                type="password"
                value={this.state.password}
                name="Password"
                onChange={this.handleOnChangePassword}
                autoComplete="password"
                required
            />
          </div>
            {' '}
            <div className="buttons">
              {' '}
              <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={user_name_taken}
              >
                 {' '}{' '} {REGISTRATION_FIELDS.REGISTER} {' '}{' '}
              </button>
              {' '}
              {' '}
              {' '}
              <Link to="/login"> {REGISTRATION_FIELDS.CANCEL} </Link>
              {' '}
              {' '}
              {' '}
            </div>
            {' '}
            {' '}
            {' '}
          </div>{' '}{' '}
        </form>
          {' '}
          {' '}
          {' '}
          {error && <Error message={ERROR_IN_REGISTRATION} />}
          {' '}
          {' '}
          {' '}
          {register && <Message message={REGISTRATION_MESSAGE} />}
          {' '}
          {' '}
          {' '}
        </div>

    );
  }
}
