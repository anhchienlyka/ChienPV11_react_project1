import React, { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useDebounce from "../hooks/useHook";
import useSession from "../hooks/useSession";
import { IBook } from "../interfaces/IBook";
import * as BookAPI from "../BooksAPI";
import BookDetail from "./DetailBook";

const SearchBook = () => {
  const [inputBookSearch, setInputBookSearch] = useState<string>("");
  const [listBookSearch, setListBookSearch] = useState<any[]>([]);
  const navigate = useNavigate();
  const [storageBook] = useSession("books");
  const debounceInputSearch = useDebounce<string>(inputBookSearch, 500);

  useEffect(() => {
    if (debounceInputSearch) {
      BookAPI.search(debounceInputSearch)
        .then((book: IBook[]) =>
          setListBookSearch(
            book.map((item: IBook) => {
              const shelfName = (storageBook as IBook[]).find(
                (sb: IBook) => sb.id === item.id
              )?.shelf;
              return {
                ...item,
                shelf: shelfName ? shelfName : "none",
              };
            })
          )
        )
        .catch((error: Error) => console.log(error));
    }
    // eslint-disable-next-line
  }, [debounceInputSearch]);

  const handleCloseBookSearch = (): void => {
    navigate("/");
  };

  const handleSearchBooks = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>): void => {
    setInputBookSearch(value);
  };

  const handleSelectBookShelfs = (book: IBook, option: string) => {
    BookAPI.update(book, option)
      .then((res) => console.log(res))
      .catch((error: Error) => console.log(error));
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <button className="close-search" onClick={handleCloseBookSearch}>
          Close
        </button>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            value={inputBookSearch}
            placeholder="Search by title or author"
            onChange={handleSearchBooks}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {(listBookSearch as any)?.error ? (
            "No results found"
          ) : (
            <BookDetail
              books={listBookSearch}
              handleSelectBookDetail={handleSelectBookShelfs}
            />
          )}
        </ol>
      </div>
    </div>
  );
};

export default memo(SearchBook);
