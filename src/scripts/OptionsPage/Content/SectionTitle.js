import React, { Component, PropTypes } from 'react'

let sectionTitleStyles = {
  fontSize: 22,
  height: 50,
  lineHeight: '50px',
  marginTop: 20,
}

export default class extends Component {
  render() {
    return (
      <div style={sectionTitleStyles}>
        {this.props.children}
      </div>
    )
  }
}
