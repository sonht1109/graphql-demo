import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { AUTHORS_QUERY } from "../queries/author";
import { ADD_BOOK_MUTATION, BOOKS_QUERY } from "../queries/book";

function AddBook() {
  const { data, loading, error } = useQuery(AUTHORS_QUERY);
  const [addBook] = useMutation(ADD_BOOK_MUTATION);

  const [book, setBook] = useState({
    name: "",
    genre: "",
    authorId: "",
  });

  const renderOptions = () => {
    if (loading) return <option>Loading ...</option>;
    if (error) return <option>Error in fetching :(</option>;
    return data.authors.map((d) => {
      return (
        <option key={d.id} value={d.id}>
          {d.name}
        </option>
      );
    });
  };

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setBook({ ...book, [name]: value });
  };

  const onSubmit = () => {
    addBook({ variables: { ...book }, refetchQueries: [{query: BOOKS_QUERY}] });
    setBook({ ...book, name: "", genre: "", authorId: "" });
  };

  return (
    <div className="add-book">
      <label>
        <span>Book name</span>
        <input name="name" value={book.name} onChange={onChange} />
      </label>
      <label>
        <span>Book genre</span>
        <input name="genre" value={book.genre} onChange={onChange} />
      </label>
      <select value={book.authorId} onChange={onChange} name="authorId">
        <option>Select author</option>
        {renderOptions()}
      </select>
      <button onClick={onSubmit}>Add book</button>
    </div>
  );
}

export default AddBook