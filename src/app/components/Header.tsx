import Link from 'next/link';

interface IHeaderProps {
  user: firebase.UserInfo;
  pathname?: any;
}

export default ({ user, pathname }: IHeaderProps) => {
  const loginLink = () => (
    <>
      <Link href="/login">
        <a className={pathname === '/login' ? 'is-active' : ''}>ログイン</a>
      </Link>
      <Link href="/signup">
        <a className={pathname === '/signup' ? 'is-active' : ''}>新規登録</a>
      </Link>
    </>
  );
  const logoutLink = () => (
    <Link href="/logout">
      <a className={pathname === '/logout' ? 'is-active' : ''}>Logout</a>
    </Link>
  );

  return (
    <header>
      <Link href="/">
        <a className={pathname === '/' ? 'is-active' : ''}>Home</a>
      </Link>
      <Link href="/about">
        <a className={pathname === '/about' ? 'is-active' : ''}>About</a>
      </Link>
      {user ? logoutLink() : loginLink()}
      {/* TODO: 管理画面へのリンク */}
    </header>
  );
};
