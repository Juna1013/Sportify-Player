import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const scope = "user-read-playback-state user-modify-playback-state user-read-currently-playing streaming app-remote-control user-read-email";
    const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;
    const client_id = process.env.SPOTIFY_CLIENT_ID; // タイポ修正

    if (!client_id || !redirect_uri) {
        return NextResponse.json({ error: 'Missing environment variables' }, { status: 500 });
    }

    const authUrl = "https://accounts.spotify.com/authorize?" +
        new URLSearchParams({
            response_type: "code",
            client_id,
            scope,
            redirect_uri,
        });

    return NextResponse.redirect(authUrl);
}
