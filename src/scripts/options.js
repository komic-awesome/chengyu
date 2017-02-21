import React from 'react'
import ReactDOM from 'react-dom'
import OptionsPage from 'OptionsPage'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Perfs from 'mods/Perfs'

const App = () => (
  <MuiThemeProvider>
    <OptionsPage />
  </MuiThemeProvider>
)

Perfs.ready(() => {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )
})
