import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export type Profile = {
  id: string
  age_range: string
  city: string
  profession: string
  interests: string[]
  created_at: string
}

export type Question = {
  id: string
  text: string
  theme: string
  level: 'monde' | 'europe' | 'national' | 'regional' | 'local'
  region?: string
  response_count: number
}

export type Response = {
  id: string
  question_id: string
  profile_id: string
  vote: 'oui' | 'non' | 'nuance'
  text: string
  created_at: string
}
