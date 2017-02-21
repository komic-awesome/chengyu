#!/usr/bin/env node

'use strict'

const fs = require('fs')
const path = require('path')
const fetchChengyuList = require('./mods/fetchChengyuList')
const R = require('ramda')

let root = path.join(__dirname, '../')

let indexedDict = {}

function addWordToIndexedDict(word) {
  let wordFirstChar = word.charAt(0)

  if (!indexedDict[wordFirstChar]) {
    indexedDict[wordFirstChar] = []
  }

  indexedDict[wordFirstChar].push(word)
}

fetchChengyuList().then((chengyuList) => {
  chengyuList.forEach((word) => {
    addWordToIndexedDict(word)
  })

  let createFakeRegex = R.curry(function(joinedWord) {
    return `REGEX_BEGIN^(${joinedWord})REGEX_END`
  })

  let convertToCode = R.curry(function(object) {
    return JSON.stringify(object, null, 4)
      .replace(/("REGEX_BEGIN|REGEX_END")/g, '/')
  })

  let indexedRegex = R.compose(
    convertToCode, R.map(R.compose(createFakeRegex, R.join('|')))
  )(indexedDict)

  fs.writeFileSync(
    path.join(root, './lib/chengyuIndexedRegex.js')
  , `module.exports = ${indexedRegex}\n`
  )
  console.log('成功生成了 IndexedRegex 结构')
}, () => {
  console.log('发生了奇怪的错误')
})
