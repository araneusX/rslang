import React, { Component } from 'react';
import { logInUser, createUser } from '../backend/user';

export default class TestForm extends Component<{}, {email: string, password: string}> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  changeHandler = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  submitHandler = async (event : any) => {
    event.preventDefault();
    const typeOfEvent = localStorage.getItem('typeOfEvent');
    switch (typeOfEvent) {
      case 'log':
        console.log(await logInUser(this.state));
        break;
      case 'create':
        console.log(await createUser(this.state));
        break;
      default:
        break;
    }
  };

  clickHandler = (event : any) => {
    localStorage.setItem('typeOfEvent', event.target.value);
  };

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <div>
            <input type="email" name="email" value={email} onChange={this.changeHandler} />
          </div>
          <div>
            <input type="text" name="password" value={password} onChange={this.changeHandler} />
          </div>
          <button type="submit" value="log" onClick={this.clickHandler}>Sign In</button>
          <button type="submit" value="create" onClick={this.clickHandler}>Sign Up</button>
        </form>
      </div>
    );
  }
}
