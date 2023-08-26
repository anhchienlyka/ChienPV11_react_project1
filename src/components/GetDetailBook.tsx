import React, { useState, useEffect } from "react";
import * as BooksAPI from "../BooksAPI";
import { useParams } from "react-router-dom";
import { IBook } from "../interfaces/IBook";
function GetDetailBook() {
  const [book, setBook] = useState<IBook>();
  const { bookId } = useParams();
  console.log("book", book);
  useEffect(() => {
    BooksAPI.get(bookId)
      .then((bookData) => {
        setBook(bookData);
      })
      .catch((error) => {
        console.error("Error fetching book details:", error);
      });
    // eslint-disable-next-line
  }, [bookId]);

  return (
    <div>
      {!book ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="book-detail">
            <h2 className="book-title">{book.title}</h2>
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${
                  book.imageLinks ? book.imageLinks?.smallThumbnail : null
                })`,
              }}
            ></div>
            <p className="book-description">{book.description}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default GetDetailBook;
