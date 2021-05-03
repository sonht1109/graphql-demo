import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BookList />
      <AddBook />
    </ApolloProvider>
  );
}

export default App;
