/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */

import { useEffect, useState } from "react";
import axios from "axios";

function Account({ token }) {
  const [accountInfo, setAccountInfo] = useState(null);

  useEffect(() => {
    async function fetchAccountInfo() {
      try {
        // const token = sessionStorage.getItem("token");

        if (!token) {
          return;
        }
        const response = await axios.get(
          "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(response.data);
        setAccountInfo(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchAccountInfo();
  }, [token]);

  return (
    <div className="account-container">
      <h2>Account Information</h2>
      {accountInfo ? (
        <div>
          <p>ID: {accountInfo.id}</p>
          <p>First Name: {accountInfo.firstname}</p>
          <p>Last Name: {accountInfo.lastname}</p>
          <p>Email: {accountInfo.email}</p>
          <p>Books: {accountInfo.books.length}</p>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
}

export default Account;
