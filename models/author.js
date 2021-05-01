const graphql = require('graphql')
const _ = require('lodash');
const { books } = require('../data');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

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
      type: GraphQLString,
    },
    books: {
      type: new GraphQLList(require('./book')),
      resolve(parent, args){
        return _.filter(books, {authorId: parent.id})
      }
    }
  }),
});

module.exports = AuthorType