import { useState } from "react";
import Books from "./components/Books";
import { Routes, Route } from "react-router-dom";
import SingleBook from "./components/SingleBook";
import Login from "./components/Login";
import Register from "./components/Register";
import Account from "./components/Account";
import NavBar from "./components/Navigations";

function App() {
  const [token, setToken] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  function login() {
    setLoggedIn(true);
  }

  function logout() {
    setLoggedIn(false);
  }

  return (
    <>
      <NavBar loggedIn={loggedIn} logout={logout} />
      <Routes>
        <Route path="/books" element={<Books />} />
        <Route path="/books/:bookId" element={<SingleBook />} />
        <Route
          path="/users/login"
          element={<Login setToken={setToken} login={login} />}
        />
        <Route
          path="/users/register"
          element={<Register setToken={setToken} />}
        />
        <Route
          path="/users/account"
          element={<Account token={token} loggedIn={loggedIn} />}
        />
      </Routes>
    </>
  );
}

export default App;

{
  /* <p>Complete the React components needed to allow users to browse a library catalog, check out books, review their account, and return books that they've finished reading.</p>

<p>You may need to use the `token` in this top-level component in other components that need to know if a user has logged in or not.</p>

<p>Don't forget to set up React Router to navigate between the different views of your single page application!</p> */
}
