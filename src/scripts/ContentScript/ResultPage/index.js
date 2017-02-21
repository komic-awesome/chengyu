import React, { Component, PropTypes } from 'react'

let styles = {
  content: {
    maxWidth: 600,
    paddingTop: 70,
    paddingBottom: 20,
    margin: '0 auto',
  }
}

export default class extends Component {
  render() {
    let { findedChengyu } = this.props

    let listItems = findedChengyu.map(({ word, sentence }, index) => {
      let sentenceHtml = {
        __html: sentence.replace(word, (word) => {
          return `<strong style="color:#f25867;">${word}</strong>`
        })
      }

      return (
        <div key={index}>
          <div>{word}</div>
          <p dangerouslySetInnerHTML={sentenceHtml}></p>
        </div>
      )
    })

    return (
      <div style={styles.content}>
        <h1>匹配的成语结果</h1>
        <div>
          {listItems}
        </div>
      </div>
    )
  }
}
