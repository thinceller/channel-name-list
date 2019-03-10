import { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import Router from 'next/router';

import { loginUser } from '../store/auth/actions';

interface ILoginForm {
  loginUser: any;
}

const LoginForm: React.FC<ILoginForm> = ({ loginUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: React.ChangeEvent <HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent <HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>メールアドレス</label>
      <input
        name="email"
        type="email"
        value={email}
        onChange={handleEmailChange}
      />
      <label>パスワード</label>
      <input
        name="password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <input type="submit" value="ログイン" />
    </form>
  );
};

const mapStateToProps = (state: any) => {
  console.debug(state);
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({ loginUser }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginForm);
