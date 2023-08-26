import React, { memo } from "react";
import { IBook } from "../interfaces/IBook";
import { ActionBook } from "../Enums/ActionBookEnum";
import { Link } from "react-router-dom";
interface BookInfor {
  books: IBook[];
  handleSelectBookDetail: (book: IBook, option: any) => any;
}
const DetailBook = ({ books, handleSelectBookDetail }: BookInfor) => {
  return (
    <div className="shelf-books">
      <ol className="book-grid">
        {books &&
          books.map((book: IBook) => {
            const backgroundImage = book.imageLinks
              ? book.imageLinks?.smallThumbnail
              : null;
            return (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${backgroundImage})`,
                      }}
                    ></div>
                    <div className="shelf-book-changer">
                      <select
                        onChange={(e) =>
                          handleSelectBookDetail(book, e.target.value)
                        }
                        value={book.shelf}
                      >
                        <option value="move" disabled>
                          {ActionBook.MOVE_TO}
                        </option>
                        <option value="currentReading">
                          {ActionBook.CURRRENTLY_READING}
                        </option>
                        <option value="wantRead">{ActionBook.WANT_READ}</option>
                        <option value="read">{ActionBook.READ}</option>
                        <option value="none">{ActionBook.NONE}</option>
                      </select>
                    </div>
                  </div>
                  <div className="show-detail">
                  <Link to={`/detail/${book.id}`} className="btn btn-success">
                     Show Detail
                    </Link>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.author}</div>
                </div>
              </li>
            );
          })}
      </ol>
    </div>
  );
};

export default memo(DetailBook);
