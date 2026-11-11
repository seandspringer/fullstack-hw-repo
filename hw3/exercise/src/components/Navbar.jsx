import { NavLink } from 'react-router';

export default function Navbar() {
  return (
    <nav>
      <ul className="navbar-links">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/countries">Countries</NavLink>
        </li>
        <li>
          <NavLink to="/populous">Population</NavLink>
        </li>
        <li>
          <NavLink to="/regions">Regions</NavLink>
        </li>
      </ul>
    </nav>
  );
}
