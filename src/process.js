import sources from "./sources.json"

export const sourcesList = Object.entries(sources).filter(([_, source]) => {
  if (source.redirect) {
    return false
  }
  return true
}).map(([id, source]) => {
  return {
    id,
    name: source.name,
    title: source.title,
  }
})
