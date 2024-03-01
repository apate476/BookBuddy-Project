/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */

import { Link } from "react-router-dom";
import bookLogo from "../assets/books.png";

function NavBar({ loggedIn, logout }) {
  return (
    <header>
      <h1>
        <img id="logo-image" src={bookLogo} />
        Library
      </h1>
      <nav>
        <Link to="/books">Home</Link>
        {loggedIn && <Link to="/users/account">Account</Link>}
        {!loggedIn && <Link to="/users/login">Log In</Link>}
        {!loggedIn && <Link to="/users/register">Sign Up</Link>}
        {loggedIn && (
          <Link to="/books" onClick={logout}>
            Logout
          </Link>
        )}
      </nav>
    </header>
  );
}

export default NavBar;
