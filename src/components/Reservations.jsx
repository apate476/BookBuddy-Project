import { useEffect, useState } from "react";
import axios from "axios";

function Reservation({ token }) {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    async function getReservations() {
      try {
        if (!token) {
          return;
        }
        const response = await axios.get(
          "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(response.data);
        setReservations(response.data);
        // console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
    getReservations();
  }, [token]);

  async function handleReturn(bookId) {
    try {
      const response = await axios.patch(
        `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${bookId}`,
        {
          available: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Returned Book", response.data);
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
            {reservations.map((reservationInfo) => {
              return (
                <div key={reservationInfo.id}>
                  <h4>Title: {reservationInfo.title}</h4>
                  <h5>Author: {reservationInfo.author}</h5>
                  <img
                    src={reservationInfo.coverimage}
                    alt={reservationInfo.title}
                  />
                  <p>Description: {reservationInfo.description}</p>
                  <button onClick={() => handleReturn(reservationInfo.bookId)}>
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
