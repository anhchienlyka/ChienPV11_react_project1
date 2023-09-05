import { memo, useEffect, useState } from "react";
import * as BooksAPI from "../BooksAPI";
import { IBook } from "../interfaces/IBook";
import DetailBook from "./DetailBook";
import { useNavigate } from "react-router-dom";
import useSession from "../hooks/useSession";

interface initialState {
  read: Array<any>;
  currentlyReading: Array<any>;
  wantToRead: Array<any>;
}

const ListBooks = () => {
  const [listBooks, setListBooks] = useState<initialState>({
    read: [],
    currentlyReading: [],
    wantToRead: [],
  });
  const navigate = useNavigate();
  const [, setStorageBooks] = useSession("books");

  useEffect(() => {
    getAllBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllBooks = () => {
    BooksAPI.getAll()
      .then((res: IBook[]) => {
        const read = filterBookByBookShelf(res, "read");
        const currentlyReading = filterBookByBookShelf(res, "currentlyReading");
        const wantToRead = filterBookByBookShelf(res, "wantToRead");
        setListBooks((preState: initialState) => {
          return {
            ...preState,
            read,
            currentlyReading,
            wantToRead,
          };
        });
        setStorageBooks(res);
      })
      .catch((err: Error) => console.error(err));
  };

  const filterBookByBookShelf = (dataSource: IBook[], shelf: string) => {
    return dataSource.filter((book: IBook) => book.shelf === shelf);
  };

  const handleSelectBookShelf = (book: IBook, option: string) => {
    debugger
    BooksAPI.update(book, option).then(() => getAllBooks());
  };
  return (
    <div className="app">
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyBook of ChienPV11</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="shelfbook">
              <h2 className="shelfbook-title">Currently Reading</h2>
              <DetailBook
                books={listBooks.currentlyReading}
                handleSelectBookDetail={handleSelectBookShelf}
              />
            </div>
            <div className="shelfbook">
              <h2 className="shelfbook-title">Want to Read</h2>
              <DetailBook
                books={listBooks.wantToRead}
                handleSelectBookDetail={handleSelectBookShelf}
              />
            </div>
            <div className="shelfbook">
              <h2 className="shelfbook-title">Read</h2>
              <DetailBook
                books={listBooks.read}
                handleSelectBookDetail={handleSelectBookShelf}
              />
            </div>
          </div>
        </div>

        <div className="open-search">
          <button onClick={() => navigate("/search")}>Add a book</button>
        </div>
      </div>
    </div>
  );
};

export default memo(ListBooks);
