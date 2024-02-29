import { useState } from "react";
import bookLogo from "./assets/books.png";
import Books from "./components/Books";
import { Routes, Route } from "react-router-dom";
import SingleBook from "./components/SingleBook";
import Login from "./components/Login";
import Register from "./components/Register";
import Account from "./components/Account";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [token, setToken] = useState(null);

  return (
    <>
      <h1>
        <img id="logo-image" src={bookLogo} />
        Book Buddy
      </h1>

      <Routes>
        <Route path="/books" element={<Books />} />
        <Route path="/books/:bookId" element={<SingleBook />} />
        <Route path="/users/login" element={<Login setToken={setToken} />} />
        <Route
          path="/users/register"
          element={<Register setToken={setToken} />}
        />
        <ProtectedRoute
          path="/users/account"
          element={<Account token={token} />}
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
