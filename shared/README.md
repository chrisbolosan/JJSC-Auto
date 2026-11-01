# Shared

Code is used by both `web/` and also `api/`

## Files

Types generated from Supabase, SO NEVER edit manually
`src/database.types.ts`

## How to update the database types

You need to run this from the repo root after ANY database change:

npm run generate:types

Then now commit the updated `database.types.ts`

https://supabase.com/docs/guides/api/rest/generating-types
