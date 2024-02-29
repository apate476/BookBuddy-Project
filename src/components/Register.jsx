/* TODO - add your code to create a functional React component that renders a registration form */

import { useState } from "react";
import axios from "axios";

function Register({ setToken }) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister() {
    try {
      const response = await axios.post(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setToken(response.data.token);
      //   console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="register-container">
      {/* <input
        type="text"
        placeholder="First Name"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
      /> */}
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

      <button onClick={handleRegister}>Sign up</button>
    </div>
  );
}

export default Register;
