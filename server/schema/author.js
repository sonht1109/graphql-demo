const graphql = require("graphql");
const _ = require("lodash");
const Book = require("../models/book")

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
} = graphql;

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    age: {
      type: GraphQLInt,
    },
    books: {
      type: new GraphQLList(require("./book")),
      resolve(parent, args) {
        return Book.find({authorId: parent.id})
      },
    },
  }),
});

module.exports = AuthorType;
