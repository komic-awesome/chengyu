#!/usr/bin/env node

const chengyuIndexedRegex = require('./chengyuIndexedRegex.js')

function matchChengyu(text) {
  let findedWords = []
    , remaingText = text
    , index = 0

  while(remaingText.length > 2) {
    let firstChar = remaingText.charAt(0)
      , regex = chengyuIndexedRegex[firstChar]
      , match

    if (!regex || !(match = remaingText.match(regex))) {
      index++
      remaingText = remaingText.slice(1)
      continue
    }

    let word = match[0]
    findedWords.push({
      index: index
    , word: word
    })

    remaingText = remaingText.slice(word.length)
    index += word.length
  }

  return findedWords
}

module.exports = matchChengyu
