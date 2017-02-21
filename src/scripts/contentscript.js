'use strict';

import matchChengyuUseTrie from 'MatchChengyu/matchChengyuUseTrie'
import splitSentence from 'mods/splitSentence'

function main() {
  let contentElement = document.querySelector('#link-report')

  if (!contentElement) { return }

  let contentText = contentElement.innerText
    , splitedSentences = splitSentence(contentText)
    , findedChengyu = []

  splitedSentences.forEach((sentence) => {
    if (sentence.length < 3) { return }
    let matchedChengyu = matchChengyuUseTrie(sentence)

    if (!matchedChengyu.length) { return }

    matchedChengyu.forEach((chengyu) => {
      findedChengyu.push(
        Object.assign(chengyu, { sentence: sentence })
      )
    })
  })

  console.log(findedChengyu)
}

main()
