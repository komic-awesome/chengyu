#!/usr/bin/env node

'use strict'

const fs = require('fs')
const path = require('path')
const csv = require('csv')
const streamToPromise = require('./mods/streamToPromise')

let root = path.join(__dirname, '../')

let chenyuListParser = fs.createReadStream(path.join(root, './seed/chengyu.csv'))
  .pipe(csv.parse())
  .pipe(csv.transform((record) => {
    return record[0]
  }))

let trieTree = {}

function addWordToTrieTree(word) {
  let currentTreePoint = trieTree

  for (var i = 0; i < word.length; i++) {
    var currentChar = word.charAt(i)
    if (!currentTreePoint[currentChar]) {
      currentTreePoint[currentChar] = {}
    }

    currentTreePoint = currentTreePoint[currentChar]
  }

  if (currentTreePoint !== trieTree) {
    currentTreePoint['end'] = true;
  }
}

streamToPromise(chenyuListParser).then((chengyuList) => {
  chengyuList.forEach((word) => {
    addWordToTrieTree(word)
  })

  fs.writeFileSync(
    path.join(root, './lib/chengyuTrie.js')
  , `module.exports = ${JSON.stringify(trieTree, null, 4)}\n`
  )
  console.log('成功生成了 Trie 结构')
}, () => {
  console.log('发生了奇怪的错误')
})
