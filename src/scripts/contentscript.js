'use strict';

import matchChengyuUseTrie from 'MatchChengyu/matchChengyuUseTrie'
function main() {
  let contentElement = document.querySelector('#link-report')

  if (!contentElement) { return }

  let contentText = contentElement.innerText
  console.log(matchChengyuUseTrie(contentText))
}

main()
