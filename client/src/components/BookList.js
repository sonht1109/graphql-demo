import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { BOOKS_QUERY, DELETE_BOOK_MUTATION } from "../queries/book";
import BookDetail from "./BookDetail";

function BookList() {
  const { loading, error, data } = useQuery(BOOKS_QUERY);
  const [deleteBook] = useMutation(DELETE_BOOK_MUTATION);
  const [selectedBook, setSelectedBook] = useState(null);

  const onDeleteBook = (id) => {
    // deleteBook({ variables: { id }, refetchQueries: [{query: BOOKS_QUERY}] });
  };

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error in fetching :(</p>;

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Book list ({data.books.length})</h2>
      <div style={{display: 'flex'}}>
        <div style={{width: '50%', marginRight: '40px'}}>
          {data.books.map((d) => {
            return (
              <div key={d.id} className="book-row">
                <span>{d.name}</span>
                <div className="group-buttons">
                  <div
                    className="book-row_detail"
                    onClick={() => setSelectedBook(d.id)}
                  >
                    Detail
                  </div>
                  <div
                    className="book-row_close"
                    onClick={() => onDeleteBook(d.id)}
                  >
                    Delete
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {selectedBook && <BookDetail id={selectedBook} />}
      </div>
    </>
  );
}

export default BookList;
