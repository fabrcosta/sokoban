import { Injectable } from "@angular/core";
import { createClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: "root",
})
export class SupabaseService {
  readonly SUPABASE_URL = 'https://wulqtjhwovhakoxxztkw.supabase.co';
  readonly SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1bHF0amh3b3ZoYWtveHh6dGt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgzMDc2NzcsImV4cCI6MjA1Mzg4MzY3N30.pLG9G7CkFE3nOkaVf6Fmy8a4HWI0dB98jRIHRaUxcM4';

  public getConnection() {
    return createClient(this.SUPABASE_URL, this.SUPABASE_ANON_KEY, {auth: { persistSession: false, autoRefreshToken: true }});
  }
}
