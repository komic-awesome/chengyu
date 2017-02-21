'use strict';

import matchChengyuUseTrie from 'MatchChengyu/matchChengyuUseTrie'
import splitSentence from 'mods/splitSentence'
import createResultPage from './ContentScript/createResultPage'
import findLongestTextElement from 'mods/findLongestTextElement'

const CHENGYU_MIN_CHAR_COUNT = 3

function main() {
  let contentElement = findLongestTextElement()
    , findedSentences = []

  if (!contentElement) {
    return createResultPage(findedSentences)
  }

  let contentText = contentElement.innerText
    , splitedSentences = splitSentence(contentText)

  splitedSentences.forEach((sentence) => {
    if (sentence.length < CHENGYU_MIN_CHAR_COUNT) { return }
    let matchedChengyu = matchChengyuUseTrie(sentence)

    if (!matchedChengyu.length) { return }

    let chengyu = { word: '', sentence: sentence }

    findedSentences.push(
      Object.assign(
        { words: matchedChengyu.map(x => x.word) },
        { sentence: sentence }
      )
    )
  })

  createResultPage(findedSentences)
}

main()
