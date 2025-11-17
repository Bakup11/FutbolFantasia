import { createClient } from '@supabase/supabase-js';

// Pega aquí tus datos directo:
const supabaseUrl = "https://uskfktdeyjjexgahacyy.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVza2ZrdGRleWpqZXhnYWhhY3l5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0MDg5ODEsImV4cCI6MjA3ODk4NDk4MX0.KApFf54BaA6ufJ0CkpPl2hrqWyU35gjgFj67bUUWzSE";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
