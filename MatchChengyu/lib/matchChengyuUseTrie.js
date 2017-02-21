const chengyuTrie = require('./chengyuTrie')

function matchChengyu(text) {
  let findedWords = []

  for (var i = 0; i < text.length; i++) {
    let currentChar = text.charAt(i)
      , currentTreePoint = chengyuTrie
      , index = i

    while(currentTreePoint[currentChar]) {
      currentTreePoint = currentTreePoint[currentChar]
      index = index + 1
      if (currentTreePoint['end']) {
        let wordStarIndex = i
          , wordEndIndex = index
        findedWords.push({
          index: wordStarIndex
        , word: text.slice(wordStarIndex, wordEndIndex)
        })
        i = index
        break
      }
      currentChar = text.charAt(index)
    }
  }
  return findedWords
}

module.exports = matchChengyu
