import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Router from 'next/router';

import { loginUser } from '../store/auth/actions';

interface ILoginFormProps {
  loginUser: any;
}

interface ILoginFormState {
  email: string;
  password: string;
}

class LoginForm extends React.Component<ILoginFormProps, ILoginFormState> {
  state = {
    email: '',
    password: '',
  };

  handleEmailChange = (e: React.ChangeEvent <HTMLInputElement>) => {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange = (e: React.ChangeEvent <HTMLInputElement>) => {
    this.setState({ password: e.target.value });
  }

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('submit button');
    this.props.loginUser(this.state.email, this.state.password)
      .then(() => Router.push('/'))
      .catch(err => console.error(err));
  }

  render() {
    const { email, password } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label>メールアドレス</label>
        <input
          name="email"
          type="email"
          value={email}
          onChange={this.handleEmailChange}
          required={true}
        />
        <label>パスワード</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={this.handlePasswordChange}
          required={true}
        />
        <input type="submit" value="ログイン" />
      </form>
    );
  }
}

const mapStateToProps = (state: any) => {
  console.debug(state);
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    { loginUser },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginForm);
