import { NextRequest, NextResponse } from "next/server";
import { validateUser } from '@/app/controller/auth/validate'

export async function POST(req: NextRequest) {
  const data = await req.json();
  const email = data.email;

  const status = await validateUser({ customerEmail: email });
  
  return NextResponse.json(status);
}
