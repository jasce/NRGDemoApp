import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { graphql } from 'react-apollo'
import { getBookQuery } from 'Queries'

class BookDetail extends Component {
  static defaultProps = {
    data: {}
  }

  static propTypes = {
    data: PropTypes.object
  }

  _renderBookData = () => {
    const { book } = this.props.data
    if (book) {
      return (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All books by this author:</p>
          <ul className="other-books">
            {book.author.books.map(book => (
              <li key={book.id}>{book.name}</li>
            ))}
          </ul>
        </div>
      )
    } else if (this.props.data.loading) {
      return <div>Loading Details...</div>
    } else {
      return <div>No Book Selected...</div>
    }
  }

  render() {
    return (
      <div className="book-details-container">
        <p>Book Details:</p>
        {this._renderBookData()}
      </div>
    )
  }
}

export default graphql(getBookQuery, {
  options: props => {
    return {
      variables: {
        id: props.selectedBook
      }
    }
  }
})(BookDetail)
