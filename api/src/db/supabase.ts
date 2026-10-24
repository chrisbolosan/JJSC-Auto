import 'dotenv/config' //Load api/.env into process.env
import { createClient } from '@supabase/supabase-js' // From Supabase library


//Variables read from .env
const url = process.env.SUPABASE_URL
const secretKey = process.env.SUPABASE_SECRET_KEY

if (!url || !secretKey) {
	throw new Error(' Issue with env file. Check api/.env')
}

//server doesnt log in as a user
export const supabaseAdmin = createClient(url, secretKey, {
	auth: { persistSession: false, autoRefreshToken: false },
})
