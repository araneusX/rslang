import React, { Component } from 'react';

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

  submitHandler = (event : any) => {
    event.preventDefault();
    console.log(this.state);
  };

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <div>
            <input type="text" name="userMail" value={email} onChange={this.changeHandler} />
          </div>
          <div>
            <input type="text" name="password" value={password} onChange={this.changeHandler} />
          </div>
          <button type="submit">Sign In</button>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  }
}
