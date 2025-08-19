import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');
    
    if (!code) {
        return NextResponse.json({ error: 'Authorization code not found' }, { status: 400 });
    }

    const basic = Buffer.from(
        process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET
    ).toString("base64");

    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            Authorization: "Basic " + basic, // スペースを追加
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            code,
            redirect_uri: process.env.SPOTIFY_REDIRECT_URI || '',
            grant_type: "authorization_code",
        }),
    });

    const data = await response.json();
    
    if (!response.ok) {
        return NextResponse.json({ error: 'Failed to get access token' }, { status: 400 });
    }

    // トークンをcookieに保存
    const redirectResponse = NextResponse.redirect(new URL('/', req.url));
    redirectResponse.cookies.set('spotify_access_token', data.access_token, {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600 // 1時間
    });

    return redirectResponse;
}
