export function formatTheme(theme: string): string {
  if (!theme) return ''
  return theme.trim().charAt(0).toUpperCase() + theme.trim().slice(1).toLowerCase()
}

export function formatTitle(title: string): string {
  if (!title) return ''

  const lowercaseWords = [
    'a',
    'as',
    'o',
    'os',
    'de',
    'do',
    'da',
    'dos',
    'das',
    'em',
    'no',
    'na',
    'nos',
    'nas',
    'e',
    'ou',
    'se',
    'que',
    'com',
    'por',
    'um',
    'uma',
    'uns',
    'umas',
  ]

  const words = title.trim().split(/\s+/)
  if (words.length === 0) return ''

  return words
    .map((word, index) => {
      const rawWord = word.toLowerCase()

      const isFirst = index === 0
      const isLast = index === words.length - 1
      const prevWord = words[index - 1]
      const isAfterSeparator = index > 0 && prevWord && prevWord.endsWith(':')

      const cleanWord = rawWord.replace(/[:;.,!?]$/, '')

      if (isFirst || isLast || isAfterSeparator || !lowercaseWords.includes(cleanWord)) {
        return rawWord.charAt(0).toUpperCase() + rawWord.slice(1)
      }

      return rawWord
    })
    .join(' ')
}
