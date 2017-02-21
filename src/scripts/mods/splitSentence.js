export default function(text) {
  text = text.replace(/[。？！；.!?]/g, function(match, p1) {
    return match + ' '
  })

  return text.split(/\s+/).filter(x => x)
}
