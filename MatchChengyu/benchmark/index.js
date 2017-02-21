#!/usr/bin/env node

'use strict'

const Benchmark = require('benchmark')
const beautifyBenchmarks = require('beautify-benchmark')
const chengyuRegex = require('../lib/chengyuRegex')
const matchChengyuUseTrie = require('../lib/matchChengyuUseTrie')
const matchChengyuUseIndexedRegex = require('../lib/matchChengyuUseIndexedRegex')

let suite = new Benchmark.Suite

let fixture = '克罗克入主快餐馆后，经营、管理更加出色，很快就以崭新的面貌享誉全美。在不长的时间内，270万美元就全部捞了回来。又经过20多年的苦心经营，总资产已达42亿美元，成为国际十大知名餐馆之一。 克罗克实施“瞒天过海”计的成功，就在于他了解麦氏兄弟的脾气性格，仅以让利5%就轻易打入了麦氏快餐馆；随后通过长时间的潜移默化，对老板的刻意奉迎，换取了兄弟俩的信赖，使兄弟俩认为他处处替自己着想，感到双方利益一致，便自动消除了对他的猜忌，愉快地接受了他的多种建议。经过逐步渗透、架空，老板本已“名存实亡”，最后一场交易，全部吃掉了麦克唐纳快餐馆，双方谈判以克罗克的“瞒天过海”计大功告成而宣告结束。'

let rOnlyOneWord = /瞒天过海/g

suite.add('matchChengyuUseRegex', () => {
  chengyuRegex.exec(fixture)
})
.add('One Word RegExp', () => {
  rOnlyOneWord.exec(fixture)
})
.add('matchChengyuUseTrie', () => {
  matchChengyuUseTrie(fixture)
})
.add('matchChengyuUseIndexedRegex', () => {
  matchChengyuUseIndexedRegex(fixture)
})
.on('cycle', (event) => {
  beautifyBenchmarks.add(event.target)
})
.on('complete', function() {
  beautifyBenchmarks.log()
})
.run({ 'async': true })
