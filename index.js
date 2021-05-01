const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const schema = require('./models')

const app = express()

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(3001, () => {
  console.log('Server is running on port 3001 !')
})