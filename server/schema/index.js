const graphql = require("graphql");
const _ = require("lodash");
const AuthorType = require("./author");
const BookType = require("./book");
const { books, authors } = require("../data");
const Book = require("../models/book");
const Author = require("../models/author");

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
  GraphQLString,
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
        return Book.findById(args.id)
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
        return Author.findById(args.id)
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve() {
        return Book.find();
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve() {
        return Author.find();
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: {
          type: GraphQLString,
        },
        age: {
          type: GraphQLInt,
        },
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age,
        });
        return author.save();
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: {
          type: GraphQLString,
        },
        genre: {
          type: GraphQLString,
        },
        authorId: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        const { name, genre, authorId } = args;
        let book = new Book({ name, genre, authorId });
        return book.save();
      },
    },
    deleteBook: {
      type: BookType,
      args: {
        id: {type: GraphQLID}
      },
      resolve(parent, args){
        return Book.deleteOne({_id: args.id})
      }
    }
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
