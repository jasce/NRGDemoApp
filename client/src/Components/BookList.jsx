import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'

import { graphql } from 'react-apollo'
import { getBooksQuery } from 'Queries'
import BookDetail from './BookDetail'

class BookList extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  }

  state = {
    selectedBook: null
  }

  handleClick = (bookId, e) => {
    this.setState({ selectedBook: bookId })
  }

  _renderBooks = books => (
    <ul>
      {books.map(book => (
        <li key={book.id} onClick={this.handleClick.bind(this, book.id)}>
          {book.name}
        </li>
      ))}
    </ul>
  )

  render() {
    const { data } = this.props
    const { selectedBook } = this.state
    return (
      <Fragment>
        {data.loading ? (
          <div>Loading Books...</div>
        ) : (
          <Fragment>
            {this._renderBooks(data.books)}
            <BookDetail selectedBook={selectedBook} />
          </Fragment>
        )}
      </Fragment>
    )
  }
}

export default graphql(getBooksQuery)(BookList)
