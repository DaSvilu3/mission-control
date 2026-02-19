import { NextResponse } from 'next/server';

export async function GET() {
  const token = process.env.OPENCLAW_GATEWAY_TOKEN;
  if (!token) {
    return NextResponse.json({ error: 'No gateway token configured', jobs: [] }, { status: 200 });
  }

  try {
    const res = await fetch('http://localhost:18789/api/cron', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: 'list', includeDisabled: true }),
      cache: 'no-store',
    });

    if (!res.ok) {
      return NextResponse.json({ error: `Gateway returned ${res.status}`, jobs: [] }, { status: 200 });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Cannot reach gateway', jobs: [] }, { status: 200 });
  }
}
