import React from 'react'
import ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader'
import { BrowserRouter, Route } from 'react-router-dom'

import App from './app'
import './styles/app.scss'

const Test = props => (
  <BrowserRouter basename="/">
    <Route path="/" component={App} />
  </BrowserRouter>
)

ReactDOM.render(<Test />, document.getElementById('root'))

export default hot(module)(Test)
