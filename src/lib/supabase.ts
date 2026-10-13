import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

// .env の設定漏れに起動直後に気付けるよう、未設定ならエラーにする
if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error('VITE_SUPABASE_URL と VITE_SUPABASE_PUBLISHABLE_KEY を .env に設定してください')
}

export const supabase = createClient(supabaseUrl, supabasePublishableKey)
