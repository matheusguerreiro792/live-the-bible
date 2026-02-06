declare module '@/firebase/services/studies' {
  export function getLatestStudie(): Promise<Studie | null>
  export function getStudies(): Promise<Studie[]>
}
