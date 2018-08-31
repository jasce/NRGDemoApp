import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'

import { graphql, compose } from 'react-apollo'
import { getAuthorsQuery, addBookMutation, getBooksQuery } from 'Queries'
class AddBook extends Component {
  static defaultProps = {
    data: {}
  }

  static propTypes = {
    addBook: PropTypes.func.isRequired,
    authorsList: PropTypes.array.isRequired,
    data: PropTypes.object
  }

  state = {
    bookName: '',
    genre: '',
    author: ''
  }

  _renderAuthors = data => (
    <Fragment>
      {data.loading ? (
        <option disabled>Loading Authors...</option>
      ) : (
        <Fragment>
          {data.authors.map(author => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </Fragment>
      )}
    </Fragment>
  )

  handleChange = e => {
    const { name, value } = e.target
    let data = { ...this.state }
    data[name] = value
    this.setState(data)
  }

  handleSubmit = e => {
    e.preventDefault()
    const { addBook } = this.props
    addBook({
      variables: {
        name: this.state.bookName,
        genre: this.state.genre,
        authorId: this.state.author
      },
      refetchQueries: [{ query: getBooksQuery }]
    })
  }

  render() {
    const { authorsList } = this.props
    const { bookName, genre, author } = this.state
    console.log(this.props)
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="field">
          <label>Book Name:</label>
          <input
            type="text"
            name="bookName"
            value={bookName}
            onChange={this.handleChange}
          />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input
            type="text"
            name="genre"
            value={genre}
            onChange={this.handleChange}
          />
        </div>
        <div className="field">
          <label>Author:</label>
          <select onChange={this.handleChange} name="author" value={author}>
            <option>Select author</option>
            {this._renderAuthors(authorsList)}
          </select>
        </div>
        <button type="submit">+</button>
      </form>
    )
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: 'authorsList' }),
  graphql(addBookMutation, { name: 'addBook' })
)(AddBook)
