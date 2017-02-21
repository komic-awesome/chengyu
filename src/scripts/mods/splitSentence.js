const SENTENCE_BREAK = '$sentence_break$'

export default function(text) {

  let paras = text.split(/\n+/g)

  return (
    paras.map(
      para => para
        .replace(/[。？！；.!?]+(?![”"])/g, x => x + SENTENCE_BREAK)
    )
    .map(x => x.split(SENTENCE_BREAK))
    .reduce((acc, x) => acc.concat(x), [])
    .filter(x => x)
  )
}
