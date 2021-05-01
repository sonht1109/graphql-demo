const graphql = require("graphql");
const _ = require("lodash");
const AuthorType = require("./author");
const BookType = require("./book");
const { books, authors } = require("../data");

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
} = graphql;

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    book: {
      type: BookType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
        return _.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(){
        return books
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(){
        return authors
      }
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
