
// Next.js Edge API Route Handlers: https://nextjs.org/docs/app/building-your-application/routing/router-handlers#edge-and-nodejs-runtimes

import type { NextRequest } from 'next/server'
import { Ai } from '@cloudflare/ai';

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const question = url.searchParams.get('question');
  const ai = new Ai(process.env.AI);
  const input = { prompt: question! };
  const output = await ai.run('@cf/meta/llama-2-7b-chat-int8', input );
  return new Response(JSON.stringify(output));
}
