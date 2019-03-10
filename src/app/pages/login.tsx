import Link from 'next/link';

import App from '../containers/App';
import LoginForm from '../containers/LoginForm';

export default () => {
  return (
    <App>
      <p>ログイン</p>
      <LoginForm />
      <Link href="/signup">
        <a>新規登録する</a>
      </Link>
    </App>
  );
};
