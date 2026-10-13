import type { AuthError } from '@supabase/supabase-js'

// Supabase の英語エラーを画面表示用の日本語に変換する
export function toJapaneseAuthError(error: AuthError): string {
  switch (error.code) {
    case 'invalid_credentials':
      return 'メールアドレスまたはパスワードが正しくありません。'
    case 'email_not_confirmed':
      return 'メールアドレスの確認が完了していません。届いたメールのリンクを開いてください。'
    case 'user_already_exists':
    case 'email_exists':
      return 'このメールアドレスはすでに登録されています。'
    case 'weak_password':
      return 'パスワードが弱すぎます。より長く複雑なパスワードを設定してください。'
    case 'over_email_send_rate_limit':
    case 'over_request_rate_limit':
      return '試行回数が多すぎます。しばらく待ってから再度お試しください。'
    default:
      return `エラーが発生しました:${error.message}`
  }
}
