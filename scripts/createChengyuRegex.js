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

streamToPromise(chenyuListParser).then((chenyuList) => {
  fs.writeFileSync(
    path.join(root, './lib/chengyuRegex.js')
  , `module.exports = /(${chenyuList.join('|')})/g\n`
  )
  console.log('生成正则表达式成功')
}, () => {
  console.log('发生了奇怪的错误')
})
