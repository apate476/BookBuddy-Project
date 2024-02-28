/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function SingleBook() {
  const { bookId } = useParams();
  const [bookDetails, setBookDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getBookDetails() {
      console.log(bookId);
      try {
        const response = await axios.get(
          `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${bookId}`
        );
        console.log(response);
        setBookDetails(response.data.book);
      } catch (error) {
        console.error(error.response);
      }
    }
    getBookDetails();
  }, [bookId]);

  if (!bookDetails) {
    return <p>Loading Book Details...</p>;
  }

  return (
    <div className="book-details-container">
      <h2>Book Details</h2>
      <img src={bookDetails.coverimage} />
      <div>
        <h3>Title: {bookDetails.title}</h3>
        <h4>Author: {bookDetails.author}</h4>
        <p>Descripition: {bookDetails.description}</p>
        <p>Availability: {bookDetails.available ? "Yes" : "No"}</p>
      </div>
      <button onClick={() => navigate("/books")}>Back to the List</button>
    </div>
  );
}

export default SingleBook;
