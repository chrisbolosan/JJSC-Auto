## Local Development Setup

To run and work on this project locally without using Docker:

1. **Clone the repository and install dependencies**
   git clone <repository-url>
   cd <repository-directory>
   npm install

2. **Create a Supabase account**
   If you don't have one already, sign up for a free personal account at supabase.com.

3. **Authenticate the Supabase CLI**
   Log in with your newly created personal Supabase account to authorize your terminal:

   npx supabase login

4. **Link to the Project**
   Link your local codebase to our shared Supabase project using the Project Reference ID:

   npx supabase link --project-ref <your-project-ref>

5. **Start the development server**
   npm run dev
