import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q');
    const token = req.cookies.get('spotify_access_token')?.value; // Cookie名修正

    if (!token) {
        return NextResponse.json({ error: 'No access token found' }, { status: 401 });
    }

    if (!q) {
        return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
    }

    try {
        const response = await fetch(
            "https://api.spotify.com/v1/search?" + // URL修正
                new URLSearchParams({ q, type: "track", limit: "10"}),
            {
                headers: { Authorization: "Bearer " + token }, // スペース追加
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json({ error: errorData }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to search tracks' }, { status: 500 });
    }
}
