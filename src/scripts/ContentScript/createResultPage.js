import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import ResultPage from './ResultPage'

export default function(findedSentences) {
  let containerId = 'chengyu-root-XHDASD'
    , container = document.getElementById(containerId)

  if (container) {
    container.parentNode.removeChild(container)
  }

  container = document.createElement('div')

  container.id = containerId
  container.style.all = 'initial'
  container.style.position = 'fixed'
  container.style.width = '100%'
  container.style.height = '100%'
  container.style.background = 'white'
  container.style.top = '0'
  container.style.overflow = 'auto'
  container.style.zIndex = '9999'

  document.body.appendChild(container)

  ReactDOM.render(
    <ResultPage findedSentences={findedSentences} />
  , document.getElementById(containerId)
  )
}
