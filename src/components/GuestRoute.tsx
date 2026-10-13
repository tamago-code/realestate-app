import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

// ログイン済みでログイン・会員登録画面を開いた場合は物件一覧へ移動する
export function GuestRoute({ children }: { children: ReactNode }) {
  const { session, loading } = useAuth()

  if (loading) {
    return <p className="loading">読み込み中...</p>
  }
  if (session) {
    return <Navigate to="/properties" replace />
  }
  return children
}
