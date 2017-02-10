const streamToPromise = require('./streamToPromise')
const path = require('path')
const fs = require('fs')
const csv = require('csv')

let root = path.join(__dirname, '../../')

module.exports = function() {
  return streamToPromise(
    fs.createReadStream(path.join(root, './seed/chengyu.csv'))
      .pipe(csv.parse())
      .pipe(csv.transform((record) => {
        return record[0]
      }))
  )
}
