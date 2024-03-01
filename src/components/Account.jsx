/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */

import { useEffect, useState } from "react";
import axios from "axios";

function Account({ token }) {
  const [accountInfo, setAccountInfo] = useState(null);
  const [reservations, setReservations] = useState([]);
  console.log(accountInfo);
  useEffect(() => {
    async function getAccountInfo() {
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

    async function getReservations() {
      try {
        if (!token) {
          return;
        }
        const { data } = await axios.get(
          "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(response.data);
        let reservations = setReservations(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }

    getAccountInfo();
    getReservations();
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
      {reservations.length > 0 ? (
        <div>
          <h3>Reservations</h3>
          <div>
            {reservations.map((reservationInfo) => {
              <div key={reservationInfo.id}>
                <h4>Title: {reservationInfo.title}</h4>
                <h5>Author: {reservationInfo.author}</h5>
                <img
                  src={reservationInfo.coverimage}
                  alt={reservationInfo.title}
                />
              </div>;
            })}
          </div>
        </div>
      ) : (
        <p>You don't have any books checked out.</p>
      )}
    </div>
  );
}

export default Account;
