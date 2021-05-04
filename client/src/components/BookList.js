import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { BOOKS_QUERY, DELETE_BOOK_MUTATION } from "../queries/book";
import BookDetail from "./BookDetail";
import Loading from "./Loading";

function BookList() {
  const { loading, error, data } = useQuery(BOOKS_QUERY);
  const [selectedBook, setSelectedBook] = useState(null);
  if (loading) return <Loading />;
  if (error) return <p>Error in fetching :(</p>;

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Book list ({data.books.length})</h2>
      <div style={{ display: "flex" }}>
        <div style={{ width: "50%", marginRight: "40px" }}>
          {data.books.map((d) => {
            return (
              <BookRow
                name={d.name}
                id={d.id}
                setSelectedBook={setSelectedBook}
              />
            );
          })}
        </div>
        {selectedBook && <BookDetail id={selectedBook} />}
      </div>
    </>
  );
}

// book row
function BookRow({ name, id, setSelectedBook }) {
  const [deleteBook, { loading }] = useMutation(DELETE_BOOK_MUTATION);
  const onDeleteBook = (id) => {
    deleteBook({ variables: { id }, refetchQueries: [{ query: BOOKS_QUERY }] });
  };

  if (loading) return <Loading />;

  return (
    <div key={id} className="book-row">
      <span>{name}</span>
      <div className="group-buttons">
        <div className="book-row_detail" onClick={() => setSelectedBook(id)}>
          Detail
        </div>
        <div className="book-row_close" onClick={() => onDeleteBook(id)}>
          Delete
        </div>
      </div>
    </div>
  );
}

export default BookList;
