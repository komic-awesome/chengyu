'use strict';

import matchChengyuUseTrie from 'MatchChengyu/matchChengyuUseTrie'
import splitSentence from 'mods/splitSentence'
import createResultPage from './ContentScript/createResultPage'

const CHENGYU_MIN_CHAR_COUNT = 3

function main() {
  let contentElement = document.querySelector('#link-report')

  if (!contentElement) { return }

  let contentText = contentElement.innerText
    , splitedSentences = splitSentence(contentText)
    , findedChengyu = []

  splitedSentences.forEach((sentence) => {
    if (sentence.length < CHENGYU_MIN_CHAR_COUNT) { return }
    let matchedChengyu = matchChengyuUseTrie(sentence)

    if (!matchedChengyu.length) { return }

    matchedChengyu.forEach((chengyu) => {
      findedChengyu.push(
        Object.assign(chengyu, { sentence: sentence })
      )
    })
  })

  createResultPage(findedChengyu)
}

main()
