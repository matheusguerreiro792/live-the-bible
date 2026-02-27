import { Studie } from '@/types'

declare module '@/firebase/services/studies' {
  export function getLatestStudie(): Promise<Studie | null>
  export function getStudies(): Promise<Studie[]>
  export function getStudie(id: string): Promise<Studie | null>
  export function postStudie(studie: Studie): Promise<Studie>
  export function updateStudie(id: string, updatedData: Partial<Studie>): Promise<Studie>
  export function deleteStudie(id: string): Promise<void>
}
