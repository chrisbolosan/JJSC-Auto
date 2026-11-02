import { getMessage } from '@/server/services/homepage.service';

//example  GET /api/homepage/message function, the folder path is our URL
export async function GET() {
  return Response.json(getMessage());
}
