import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const token = req.cookies.get('spotify_access_token')?.value; // Cookie名修正
    const { uri } = await req.json();

    if (!token) {
        return NextResponse.json({ error: 'No access token found' }, { status: 401 });
    }

    if (!uri) {
        return NextResponse.json({ error: 'URI is required' }, { status: 400 });
    }

    try {
        const response = await fetch("https://api.spotify.com/v1/me/player/play", { // URL修正
            method: "PUT",
            headers: {
                Authorization: "Bearer " + token, // スペース追加
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ uris: [uri] }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json({ error: errorData }, { status: response.status });
        }

        return NextResponse.json({ ok: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to play track' }, { status: 500 });
    }
}
