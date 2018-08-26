import React from 'react'
import { Route } from 'react-router-dom'
import NavBar from 'Components/NavBar'
import Welcome from 'Components/Welcome'

const App = props => (
  <React.Fragment>
    <NavBar />
    <Route path="/" component={Welcome} />
  </React.Fragment>
)

export default App
