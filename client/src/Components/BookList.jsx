import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { graphql } from 'react-apollo'
import { getBooksQuery } from 'Queries'

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
