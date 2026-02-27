import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dxrgllwfuyvzghefgeao.supabase.co";
const supabaseAnonKey = "sb_publishable_aG4oygmbDnhZFKPFaDcH_Q_xZkBc5qI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);