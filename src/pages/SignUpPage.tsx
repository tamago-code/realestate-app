import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { toJapaneseAuthError } from '../lib/authErrors'

// Supabase のデフォルトの最小文字数に合わせる
const MIN_PASSWORD_LENGTH = 6

export function SignUpPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setMessage(null)

    if (password !== passwordConfirm) {
      setError('パスワードが一致しません。')
      return
    }

    setSubmitting(true)
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      // 確認メールのリンクからこのアプリに戻ってくるようにする
      options: { emailRedirectTo: window.location.origin },
    })
    setSubmitting(false)

    if (error) {
      setError(toJapaneseAuthError(error))
      return
    }

    // メール確認が無効な設定ならそのままログイン状態になる
    if (data.session) {
      navigate('/properties', { replace: true })
      return
    }
    setMessage('確認メールを送信しました。メール内のリンクを開いて登録を完了してください。')
  }

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>会員登録</h1>

        <label>
          メールアドレス
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </label>

        <label>
          パスワード({MIN_PASSWORD_LENGTH}文字以上)
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            minLength={MIN_PASSWORD_LENGTH}
            required
          />
        </label>

        <label>
          パスワード(確認)
          <input
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            autoComplete="new-password"
            minLength={MIN_PASSWORD_LENGTH}
            required
          />
        </label>

        {error && <p className="form-error">{error}</p>}
        {message && <p className="form-message">{message}</p>}

        <button type="submit" disabled={submitting}>
          {submitting ? '登録中...' : '登録する'}
        </button>

        <p className="form-link">
          すでにアカウントをお持ちの方は <Link to="/login">ログイン</Link>
        </p>
      </form>
    </div>
  )
}
