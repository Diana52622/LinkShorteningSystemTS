import { createClient, SupabaseClient } from "@supabase/supabase-js";
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl: string = process.env.DATABASE_URL as string;
const supabaseKey: string = process.env.DATABASE_KEY as string;
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export default supabase;