import React, { Fragment } from 'react'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`

let _renderBooks = books => (
  <ul>
    {books.map(book => (
      <li key={book.id}>{book.name}</li>
    ))}
  </ul>
)

let BookList = props => {
  const { data } = props
  return (
    <Fragment>
      {data.loading ? <div>Loading Books...</div> : _renderBooks(data.books)}
    </Fragment>
  )
}

BookList.defaultProps = {
  data: {}
}

BookList.propTypes = {
  data: PropTypes.object
}

export default graphql(getBooksQuery)(BookList)
