Express API to Supabase. Talks to the database.
 web/ calls the api and will never call Supabase directly.

Example
Browser ->Next.js->Express->Supabase
Supabase secret key lives here only in api/

cd api
then
npm install
copy .env.example -> rename to .env (Grab .env keys from Chris) and fill in the values
npm run dev

REFERENCE DOCS
API KEYS
https://supabase.com/docs/guides/getting-started/api-keys

Init client
https://supabase.com/docs/reference/javascript/installing

How dotenv works
https://github.com/motdotla/dotenv#readme

