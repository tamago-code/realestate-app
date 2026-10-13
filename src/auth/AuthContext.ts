import { createContext, useContext } from 'react'
import type { Session } from '@supabase/supabase-js'

type AuthContextValue = {
  session: Session | null
  // 初回のセッション復元が終わるまでは true(未ログイン扱いで誤ってリダイレクトしないため)
  loading: boolean
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function useAuth() {
  const value = useContext(AuthContext)
  if (!value) {
    throw new Error('useAuth は AuthProvider の内側で使ってください')
  }
  return value
}
