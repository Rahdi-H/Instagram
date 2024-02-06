import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://weslomcgalqhcspyugyq.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indlc2xvbWNnYWxxaGNzcHl1Z3lxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU3MjQxNjMsImV4cCI6MjAyMTMwMDE2M30.qCBOblzev1rDahUHxdotj74pdFnnYfIiDPN0UiKliEI"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)