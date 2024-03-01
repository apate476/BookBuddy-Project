/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */

import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Books({ token }) {
  const [allBooks, setAllBooks] = useState([]);
  const [searchBook, setSearchBook] = useState("");

  useEffect(() => {
    async function getBooks() {
      try {
        const response = await axios.get(
          "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books"
        );
        const books = response.data.books; // Access the books from response.data
        // console.log("books", books);
        setAllBooks(books);
      } catch (error) {
        console.error(error);
      }
    }

    getBooks();
  }, []);

  async function handleCheckOut(bookId) {
    try {
      const response = await axios.patch(
        `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${bookId}`,
        {
          available: false,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Checked Out", response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main>
      <h2 className="book-header">Book List</h2>
      <input
        className="search"
        type="text"
        placeholder="Search book title..."
        value={searchBook}
        onChange={(e) => setSearchBook(e.target.value)}
      />

      <div className="book-container">
        {allBooks
          .filter((singleBook) => {
            return singleBook.title
              .toLowerCase()
              .includes(searchBook.toLowerCase());
          })
          .map((singleBook) => (
            <div className="book-card" key={singleBook.id}>
              <h3>Title: {singleBook.title}</h3>
              <h4>Author: {singleBook.author}</h4>
              <img src={singleBook.coverimage} alt={singleBook.title} />
              <Link to={`/books/${singleBook.id}`}>View Details</Link>
              <button onClick={() => handleCheckOut(singleBook.id)}>
                Check Out
              </button>
            </div>
          ))}
      </div>
    </main>
  );
}

export default Books;
