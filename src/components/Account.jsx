/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */

import { useEffect, useState } from "react";
import axios from "axios";
// import Reservation from "./Reservation";

function Account({ token }) {
  const [accountInfo, setAccountInfo] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [bookCount, setBookCount] = useState(0);

  useEffect(() => {
    async function getAccountInfo() {
      try {
        if (!token) {
          return;
        }
        const response = await axios.get(
          "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAccountInfo(response.data);
        setBookCount(response.data.books.length);
      } catch (error) {
        console.error(error);
      }
    }

    getAccountInfo();
  }, [token]);

  async function getReservations() {
    try {
      const response = await axios.get(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // console.log(response.data);
      setReservations(response.data.reservation);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getReservations();
  }, [token]);

  async function handleReturn(reservationId) {
    try {
      const response = await axios.delete(
        `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${reservationId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Returned Book", response.data);

      updateBookCount(bookCount - 1);
      getReservations();
    } catch (error) {
      console.error(error);
    }
  }
  const updateBookCount = (newCount) => {
    setBookCount(newCount);
  };

  return (
    <div className="account-container">
      <h2>Account Information</h2>
      {!token ? (
        <p>
          Please log in or create an account to view your account information.
        </p>
      ) : accountInfo ? (
        <div>
          <p>ID: {accountInfo.id}</p>
          <p>First Name: {accountInfo.firstname}</p>
          <p>Last Name: {accountInfo.lastname}</p>
          <p>Email: {accountInfo.email}</p>
          <p>Books: {bookCount}</p>
          <div>
            {reservations.length > 0 ? (
              <div className="reservations-container">
                <h2>Reservations</h2>
                <div>
                  {reservations.map((accountDetail) => {
                    return (
                      <div key={accountDetail.id}>
                        <h4>Title: {accountDetail.title}</h4>
                        <h5>Author: {accountDetail.author}</h5>
                        <img
                          src={accountDetail.coverimage}
                          alt={accountDetail.title}
                        />
                        <p>Description: {accountDetail.description}</p>
                        <button onClick={() => handleReturn(accountDetail.id)}>
                          Return Book
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <p className="none">You don't have any books checked out.</p>
            )}
          </div>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
}

export default Account;
