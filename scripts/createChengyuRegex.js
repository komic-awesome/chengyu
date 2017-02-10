#!/usr/bin/env node

'use strict'

const fs = require('fs')
const path = require('path')
const fetchChengyuList = require('./mods/fetchChengyuList')

let root = path.join(__dirname, '../')

fetchChengyuList().then((chenyuList) => {
  fs.writeFileSync(
    path.join(root, './lib/chengyuRegex.js')
  , `module.exports = /(${chenyuList.join('|')})/g\n`
  )
  console.log('生成正则表达式成功')
}, () => {
  console.log('发生了奇怪的错误')
})
