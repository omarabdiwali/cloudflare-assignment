import { NextResponse } from 'next/server';
export const runtime = "edge"

export async function GET(req) {
  const me = {
    "name": "Omar",
    "homepage": "https://omarabdiwali.vercel.app",
    "githubURL": "https://github.com/omarabdiwali",
    "interestingFact": "I have played soccer all my life, and won major tournaments in my city.",
    "skills": ["React", "JavaScript", "Python", "MongoDB"]
  }
  
  return new NextResponse(JSON.stringify(me));
}