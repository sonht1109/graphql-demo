import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import BookList from "./components/BookList";

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BookList />
    </ApolloProvider>
  );
}

export default App;
