import React, { Component, PropTypes } from 'react'

let styles = {
  content: {
    maxWidth: 680,
    paddingTop: 70,
    paddingBottom: 20,
    margin: '0 auto',
  },
  closeButton: {
    position: 'fixed',
    top: 10,
    right: 10,
    border: '1px solid black',
    color: '#333',
    fontWeight: 'normal',
    fontSize: '25px',
    background: 'none',
    boxSizing: 'border-box',
    padding: '0 10px',
    cursor: 'pointer',
  },
  wordListTableTr: {
    backgroundColor: '#fff',
    borderTop: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  wordListTable: {
    fontSize: 14,
    marginTop: '20px',
  },
}

function WordlistTheadTd(props) {
  let style = {
    fontSize: 16,
    padding: '8px',
    color: '#888',
  }

  return <td style={style} {...props}>{props.children}</td>
}

function WordlistTableTd(props) {
  let style = {
    fontSize: 14,
    padding: '8px',
    borderBottom: '1px solid #ddd',
  }

  if (props.type === 'word') {
    style.color = '#888'
    style.marginTop = '-8px'
  }

  return <td style={style} {...props}>{props.children}</td>
}

export default class extends Component {
  handleCloseClicked() {
    // TODO(yangqing): DRY
    let containerId = 'chengyu-root-XHDASD'
      , container = document.getElementById(containerId)

    if (container) {
      container.parentNode.removeChild(container)
    }
  }

  render() {
    let { findedSentences } = this.props

    let listItems = findedSentences.map(({ words, sentence }, index) => {
      words.forEach(
        (word) => {
          sentence = sentence.replace(word, (word) => {
            return `<strong style="color:#f25867;">${word}</strong>`
          })
        }
      )

      let sentenceHtml = { __html: sentence }
        , wordHtml = { __html: words.map( x => `<div>${x}</div>`).join(' ') }

      return (
        <tr key={index} style={styles.wordListTableTr}>
          <WordlistTableTd type="word">
            <div dangerouslySetInnerHTML={wordHtml}></div>
          </WordlistTableTd>
          <WordlistTableTd>
            <p dangerouslySetInnerHTML={sentenceHtml}></p>
          </WordlistTableTd>
        </tr>
      )
    })

    if (!findedSentences || !findedSentences.length) {
      return (
        <div style={styles.content}>
          <p>
            未找到成语或无法识别正文，请
            <a href="#"
              style={{ textDecoration: 'underline', lineHeight: 1 }}
              onClick={this.handleCloseClicked.bind(this)}>关闭</a>。
          </p>
          <button style={styles.closeButton}
            onClick={this.handleCloseClicked.bind(this)}>X</button>
        </div>
      )
    }

    return (
      <div style={styles.content}>
        <h1 style={{ fontSize: 16 }}>匹配到的成语和例句：</h1>
        <table style={styles.wordListTable}>
          <thead>
            <tr style={styles.wordListTableTr}>
              <WordlistTheadTd width="100">成语</WordlistTheadTd>
              <WordlistTheadTd>所属例句</WordlistTheadTd>
            </tr>
          </thead>
          <tbody>
            {listItems}
          </tbody>
        </table>
        <button style={styles.closeButton}
          onClick={this.handleCloseClicked.bind(this)}>X</button>
      </div>
    )
  }
}
