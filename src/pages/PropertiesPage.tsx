import { useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import { supabase } from '../lib/supabase'
import { properties } from '../data/properties'

export function PropertiesPage() {
  const { session } = useAuth()
  const [loggingOut, setLoggingOut] = useState(false)

  async function handleLogout() {
    setLoggingOut(true)
    // セッションが消えると ProtectedRoute がログイン画面へリダイレクトする
    const { error } = await supabase.auth.signOut()
    if (error) {
      setLoggingOut(false)
      alert(`ログアウトに失敗しました:${error.message}`)
    }
  }

  return (
    <div className="properties-page">
      <header className="app-header">
        <h1>物件一覧</h1>
        <div className="header-user">
          <span>{session?.user.email}</span>
          <button type="button" onClick={handleLogout} disabled={loggingOut}>
            {loggingOut ? 'ログアウト中...' : 'ログアウト'}
          </button>
        </div>
      </header>

      <ul className="property-list">
        {properties.map((property) => (
          <li key={property.id} className="property-card">
            <h2>{property.name}</h2>
            <p className="property-rent">
              {property.rent.toLocaleString('ja-JP')}
              <span>円/月</span>
            </p>
            <p className="property-area">{property.area}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
