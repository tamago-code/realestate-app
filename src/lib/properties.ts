import { supabase } from './supabase'

export type Property = {
  id: number
  user_id: string
  name: string
  // 月額家賃(円)
  rent: number
  area: string
  // 間取り(例:1LDK)
  layout: string
  created_at: string
}

// 登録・編集フォームから送る項目
export type PropertyInput = Pick<Property, 'name' | 'rent' | 'area' | 'layout'>

// RLS により自分が登録した物件だけが返ってくる
export async function fetchProperties(): Promise<Property[]> {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

// user_id は DB 側の既定値(auth.uid())で入るので送らない
export async function createProperty(input: PropertyInput): Promise<Property> {
  const { data, error } = await supabase.from('properties').insert(input).select().single()
  if (error) throw error
  return data
}

export async function updateProperty(id: number, input: PropertyInput): Promise<Property> {
  const { data, error } = await supabase
    .from('properties')
    .update(input)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteProperty(id: number): Promise<void> {
  const { error } = await supabase.from('properties').delete().eq('id', id)
  if (error) throw error
}
