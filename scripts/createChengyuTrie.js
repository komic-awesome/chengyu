#!/usr/bin/env node

'use strict'

const fs = require('fs')
const path = require('path')
const fetchChengyuList = require('./mods/fetchChengyuList')

let root = path.join(__dirname, '../')

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

fetchChengyuList().then((chengyuList) => {
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
