import { gql } from "@apollo/client";

export const BOOKS_QUERY = gql`
  {
    books {
      id
      name
    }
  }
`;

export const ADD_BOOK_MUTATION = gql`
  mutation($name: String!, $genre: String!, $authorId: String!){
    addBook(name: $name, genre: $genre, authorId: $authorId){
      name
      genre
    }
  }
`;
