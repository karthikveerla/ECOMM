import { Link } from 'react-router-dom';
import '../styles/Header.css'; // optional, create only if you want custom styles

export default function Header() {
  return (
    <header className="header-container">
      <div className="logo">
        <Link to="/" style={{ textDecoration: 'none', color: '#c1cddaff' }}>
          <h1>Jorket</h1>
        </Link>
        <Link to="/addrecord">Add Record</Link>
      </div>
      <nav className="nav-links">
        <Link to="/signin">Sign In</Link>
        <Link to="/signup">Sign Up</Link>
      </nav>
    </header>
  );
}
