import { gql } from "@apollo/client";

export const BOOKS_QUERY = gql`
  {
    books {
      id
      name
    }
  }
`;

export const BOOK_DETAIL_QUERY = gql`
  query($id: ID!) {
    book(id: $id) {
      name
      genre
      author {
        name
        books {
          name
          genre
        }
      }
    }
  }
`;

export const ADD_BOOK_MUTATION = gql`
  mutation($name: String!, $genre: String!, $authorId: String!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      genre
    }
  }
`;

export const DELETE_BOOK_MUTATION = gql`
  mutation($id: ID!) {
    deleteBook(id: $id) {
      name
    }
  }
`;
