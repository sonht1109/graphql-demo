const graphql = require("graphql");
const _ = require("lodash");
const { authors } = require("../data");

const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    genre: {
      type: GraphQLString,
    },
    author: {
      type: require("./author"),
      resolve(parent, args) {
        return _.find(authors, { id: parent.id });
      },
    },
  }),
});

module.exports = BookType;
