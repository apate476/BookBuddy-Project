import { useEffect, useState } from "react";
import axios from "axios";

function Reservation({ updateBookCount, token }) {
  const [reservations, setReservations] = useState([]);

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
      updateBookCount(response.data.books.length);
      getReservations();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      {reservations.length > 0 ? (
        <div className="reservations-container">
          <h3>Reservations</h3>
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
  );
}

export default Reservation;
