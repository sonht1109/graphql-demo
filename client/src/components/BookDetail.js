import { useQuery } from "@apollo/client";
import React from "react";
import { BOOK_DETAIL_QUERY } from "../queries/book";
import Loading from "./Loading";

export default function BookDetail({ id }) {
  const { data, error, loading } = useQuery(BOOK_DETAIL_QUERY, {
    variables: { id },
  });
  if (loading) return <Loading />;
  if (error) return <p>Error in fetching ...</p>;

  return (
    <div>
      <p>Name: {data.book.name}</p>
      <p>Genre: {data.book.genre}</p>
      <p>Author: {data.book.author.name}</p>
      <p>List books of author: </p>
      <ul>
        {data.book.author.books.map((d) => {
          return (
            <li>
              {d.name} - {d.genre}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
