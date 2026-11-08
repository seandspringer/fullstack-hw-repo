import { Outlet } from 'react-router';
import Navbar from './Navbar';

export default function Main() {
  // <Outlet /> is the place where child routes will render
  // also see https://reactrouter.com/start/declarative/navigating
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
