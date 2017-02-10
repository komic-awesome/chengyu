'use strict'

module.exports = function(stream) {
  let chunks = []
  return new Promise((resolve, reject) => {
    stream.on('data', function(chunk) {
      chunks.push(chunk)
    })
    stream.on('end', () => { resolve(chunks) })
    stream.on('error', reject)
  })
}

