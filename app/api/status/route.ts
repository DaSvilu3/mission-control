import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('http://localhost:18789/health', {
      cache: 'no-store',
    });

    if (!res.ok) {
      return NextResponse.json({ online: false, error: `Gateway returned ${res.status}` });
    }

    const data = await res.json();
    return NextResponse.json({ online: true, ...data });
  } catch {
    return NextResponse.json({ online: false, error: 'Cannot reach gateway' });
  }
}
