/* TODO - add your code to create a functional React component that renders a login form */

import { useState } from "react";
import axios from "axios";

function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(event) {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login",
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
        {
          email: email,
          password: password,
        }
      );
      setToken(response.data.token);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="login-container">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Log In</button>
    </div>
  );
}

export default Login;
