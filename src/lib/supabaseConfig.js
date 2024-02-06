import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://******.supabase.co"
const supabaseAnonKey = "***"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
