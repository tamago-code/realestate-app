import { useState, type FormEvent } from 'react'
import type { PropertyInput } from '../lib/properties'

type Props = {
  // 編集時は既存の値、新規登録時は未指定
  initialValues?: PropertyInput
  submitLabel: string
  onSubmit: (input: PropertyInput) => Promise<void>
  onCancel: () => void
}

// 物件の新規登録・編集で共通のフォーム
export function PropertyForm({ initialValues, submitLabel, onSubmit, onCancel }: Props) {
  const [name, setName] = useState(initialValues?.name ?? '')
  const [rent, setRent] = useState(initialValues ? String(initialValues.rent) : '')
  const [area, setArea] = useState(initialValues?.area ?? '')
  const [layout, setLayout] = useState(initialValues?.layout ?? '')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    const rentNumber = Number(rent)
    if (!Number.isInteger(rentNumber) || rentNumber < 0) {
      setError('家賃は0以上の整数で入力してください。')
      return
    }

    setSubmitting(true)
    try {
      await onSubmit({
        name: name.trim(),
        rent: rentNumber,
        area: area.trim(),
        layout: layout.trim(),
      })
    } catch (err) {
      setError(`保存に失敗しました:${err instanceof Error ? err.message : String(err)}`)
      setSubmitting(false)
    }
  }

  return (
    <form className="property-form" onSubmit={handleSubmit}>
      <label>
        物件名
        <input value={name} onChange={(e) => setName(e.target.value)} maxLength={100} required />
      </label>

      <label>
        家賃(円)
        <input
          type="number"
          value={rent}
          onChange={(e) => setRent(e.target.value)}
          min={0}
          step={1}
          required
        />
      </label>

      <label>
        エリア名
        <input value={area} onChange={(e) => setArea(e.target.value)} maxLength={100} required />
      </label>

      <label>
        間取り
        <input
          value={layout}
          onChange={(e) => setLayout(e.target.value)}
          placeholder="例:1LDK"
          maxLength={20}
          required
        />
      </label>

      {error && <p className="form-error">{error}</p>}

      <div className="form-actions">
        <button type="submit" disabled={submitting}>
          {submitting ? '保存中...' : submitLabel}
        </button>
        <button type="button" className="secondary" onClick={onCancel} disabled={submitting}>
          キャンセル
        </button>
      </div>
    </form>
  )
}
