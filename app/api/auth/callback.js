export default async function handler(req, res) {
    const code = req.query.code;
    const basic = Buffer.from(
        process.env.SPORTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET
    ).toString("base64");

    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            Authorization: "Basic" + basic,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            code,
            redirect_uri: process.env.SPORTIFY_REDIRECT_URI,
            grant_type: "authorization_code",
        }),
    });

    const data = await response.json();
    // トークンをcookieに保存
    res.setHeader(
        "Set-Cookie",
        `spotify_access_token=${data.access_token}; Path=/; HttpOnly;`
    );

    res.redirect("/");
}
