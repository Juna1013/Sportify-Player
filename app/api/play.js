export default async function handler(req, res) {
    const token = req.cookies.sportify_access_token;
    const { uri } = req.body;

    await fetch("https://api.sportify.com/v1/me/player/play", {
        method: "PUT",
        headers: {
            Authorization: "Bearer" + token,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ uris: [uri] }),
    });

    res.json({ ok: true });
}
