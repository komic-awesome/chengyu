const streamToPromise = require('./streamToPromise')
const path = require('path')
const fs = require('fs')
const csv = require('csv')

module.exports = function() {
  return streamToPromise(
    fs.createReadStream(path.join(__dirname, './chengyu.csv'))
      .pipe(csv.parse())
      .pipe(csv.transform((record) => {
        return record[0]
      }))
  )
}
