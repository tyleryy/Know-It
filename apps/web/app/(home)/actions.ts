import { redirect } from 'next/navigation'
 
export function navigateToSelection(code: string) {
  redirect(`/selection/${code}`)
}