import React from "react";
import { gql, useQuery } from "@apollo/client";

const BOOK_QUERY = gql`
  {
    books{
      name
      genre
    }
  }
`;

export default function BookList() {
  const { loading, error, data } = useQuery(BOOK_QUERY);

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error in fetching :(</p>;
  return (
    <div>
      <h2 style={{textAlign: 'center'}}>Book list</h2>
      {
        data.books.map(d => {
          return <div className="book-row">{d.name}</div>
        })
      }
    </div>
  );
}
