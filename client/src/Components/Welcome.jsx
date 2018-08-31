import React from 'react'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import BookList from './BookList'
import AddBook from './AddBook'

// Apollo Client Configuration
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

const Welcome = () => (
  <ApolloProvider client={client}>
    <h1>Welcome Abroad!</h1>
    <BookList />
    <AddBook />
  </ApolloProvider>
)

export default Welcome
