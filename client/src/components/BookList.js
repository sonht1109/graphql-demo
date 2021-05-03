import React from "react";
import { useQuery } from "@apollo/client";
import { BOOKS_QUERY } from "../queries/book";
import AddBook from "./AddBook";

function BookList() {
  const { loading, error, data, refetch } = useQuery(BOOKS_QUERY);

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error in fetching :(</p>;
  return (
    <div>
      <h2 style={{textAlign: 'center'}}>Book list</h2>
      {
        data.books.map(d => {
          return <div key={d.id} className="book-row">{d.name}</div>
        })
      }
      <AddBook shouldRefetch={() => refetch()} />
    </div>
  );
}


export default BookList