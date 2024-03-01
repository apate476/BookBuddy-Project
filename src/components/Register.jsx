/* TODO - add your code to create a functional React component that renders a registration form */

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register({ setToken }) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  async function handleRegister() {
    try {
      const response = await axios.post(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register",
        {
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password,
        }
      );
      //   console.log(response.data);
      setToken(response.data.token);
      login();
      navigate("/users/account");
    } catch (error) {
      console.error(error);
      // Check if the error is due to the email already being registered
      if (error.response.status === 500) {
        setErrorMessage("This email has already been registered.");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  }
  return (
    <div className="register-container">
      <input
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
      />
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
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
}

export default Register;
