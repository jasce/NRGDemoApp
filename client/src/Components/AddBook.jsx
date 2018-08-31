import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'

import { graphql } from 'react-apollo'
import { getAuthorsQuery } from 'Queries'
class AddBook extends Component {
  static defaultProps = {
    data: {}
  }

  static propTypes = {
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
  }

  render() {
    const { data } = this.props
    const { bookName, genre, author } = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="field">
          <label>Book Name:</label>
          <input type="text" name="bookName" value={bookName} onChange={this.handleChange} />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input type="text" name="genre" value={genre} onChange={this.handleChange} />
        </div>
        <div className="field">
          <label>Author:</label>
          <select onChange={this.handleChange} name="author" value={author}>
            <option>Select author</option>
            {this._renderAuthors(data)}
          </select>
        </div>
        <button>+</button>
      </form>
    )
  }
}

export default graphql(getAuthorsQuery)(AddBook)
