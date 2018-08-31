import React, { Fragment } from 'react'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`

let _renderAuthors = data => (
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

let AddBook = props => {
  const { data } = props
  return (
    <form>
      <div className="field">
        <label>Book Name:</label>
        <input type="text" />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input type="text" />
      </div>
      <div className="field">
        <label>Author:</label>
        <select>
          <option>Select author</option>
          {_renderAuthors(data)}
        </select>
      </div>
      <button>+</button>
    </form>
  )
}

AddBook.defaultProps = {
  data: {}
}

AddBook.propTypes = {
  data: PropTypes.object
}

export default graphql(getAuthorsQuery)(AddBook)
