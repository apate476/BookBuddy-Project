/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */

import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Books() {
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

  return (
    <main>
      <h2 className="book-header">Book List</h2>
      <div className="book-container">
        {allBooks.map((singleBook) => (
          <div className="book-card" key={singleBook.id}>
            <div className="book-page">
              <h3>Title: {singleBook.title}</h3>
              <h4>Author: {singleBook.author}</h4>
              <img src={singleBook.coverimage} alt={singleBook.title} />
              <Link to={`/books/${singleBook.id}`}>View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Books;
