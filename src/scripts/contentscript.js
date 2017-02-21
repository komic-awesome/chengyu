'use strict';

function main() {
  let contentElement = document.querySelector('#link-report')

  if (!contentElement) { return }

  let contentText = contentElement.innerText
  console.log(contentText)
}

main()
