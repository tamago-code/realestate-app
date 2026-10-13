import { useEffect, useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import { supabase } from '../lib/supabase'
import {
  createProperty,
  deleteProperty,
  fetchProperties,
  updateProperty,
  type Property,
  type PropertyInput,
} from '../lib/properties'
import { PropertyForm } from '../components/PropertyForm'

export function PropertiesPage() {
  const { session } = useAuth()
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [creating, setCreating] = useState(false)
  // 編集フォームを開いている物件のID
  const [editingId, setEditingId] = useState<number | null>(null)
  const [loggingOut, setLoggingOut] = useState(false)

  useEffect(() => {
    fetchProperties()
      .then(setProperties)
      .catch((err: Error) => setError(`物件の取得に失敗しました:${err.message}`))
      .finally(() => setLoading(false))
  }, [])

  async function handleCreate(input: PropertyInput) {
    const created = await createProperty(input)
    setProperties((prev) => [created, ...prev])
    setCreating(false)
  }

  async function handleUpdate(id: number, input: PropertyInput) {
    const updated = await updateProperty(id, input)
    setProperties((prev) => prev.map((p) => (p.id === id ? updated : p)))
    setEditingId(null)
  }

  async function handleDelete(property: Property) {
    if (!confirm(`「${property.name}」を削除しますか?`)) return
    try {
      await deleteProperty(property.id)
      setProperties((prev) => prev.filter((p) => p.id !== property.id))
    } catch (err) {
      alert(`削除に失敗しました:${err instanceof Error ? err.message : String(err)}`)
    }
  }

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

      <section className="create-section">
        {creating ? (
          <div className="property-card">
            <h2>物件の新規登録</h2>
            <PropertyForm
              submitLabel="登録する"
              onSubmit={handleCreate}
              onCancel={() => setCreating(false)}
            />
          </div>
        ) : (
          <button type="button" onClick={() => setCreating(true)}>
            + 物件を登録
          </button>
        )}
      </section>

      {loading && <p className="status-text">読み込み中...</p>}
      {error && <p className="form-error">{error}</p>}
      {!loading && !error && properties.length === 0 && (
        <p className="status-text">登録された物件はまだありません。</p>
      )}

      <ul className="property-list">
        {properties.map((property) => (
          <li key={property.id} className="property-card">
            {editingId === property.id ? (
              <PropertyForm
                initialValues={property}
                submitLabel="更新する"
                onSubmit={(input) => handleUpdate(property.id, input)}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <>
                <h2>{property.name}</h2>
                <p className="property-rent">
                  {property.rent.toLocaleString('ja-JP')}
                  <span>円/月</span>
                </p>
                <p className="property-area">
                  {property.area} / {property.layout}
                </p>
                <div className="card-actions">
                  <button
                    type="button"
                    className="secondary"
                    onClick={() => setEditingId(property.id)}
                  >
                    編集
                  </button>
                  <button type="button" className="danger" onClick={() => handleDelete(property)}>
                    削除
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
