import { Devotional } from '@/types'

declare module '@/firebase/services/devotionals' {
  export function getLatestDevotional(): Promise<Devotional | null>
  export function getDevotionals(): Promise<Devotional[]>
  export function getDevotional(id: string): Promise<Devotional | null>
  export function postDevotional(devotional: Devotional): Promise<Devotional>
  export function updateDevotional(id: string, updatedData: Partial<Devotional>): Promise<Devotional>
  export function deleteDevotional(id: string): Promise<void>
}
