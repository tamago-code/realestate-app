import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

// 未ログインならログイン画面へリダイレクトする
export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { session, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <p className="loading">読み込み中...</p>
  }
  if (!session) {
    // ログイン後に元の画面へ戻れるよう、遷移元を渡しておく
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }
  return children
}
