export interface Devotional {
  id?: string
  title: string
  verse: {
    verse: string
    versions: {
      arc: string
      nvi: string
      ntlh: string
    }
  }
  theme: string
  content: string
  createdAt: unknown
}

export interface Studie {
  id?: string
  title: string
  theme: string
  content: string
  createdAt: unknown
}
