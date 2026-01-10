declare module '@/firebase/services/devotionals' {
  export function getLatestDevotional(): Promise<Devotional | null>
  export function getDevotionals(): Promise<Devotional[]>
}
