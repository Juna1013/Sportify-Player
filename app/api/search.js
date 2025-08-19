export default async function handler(req, res) {
    const { q } = req.query;
    const token = req.cookies.sportify_access_token;

    const response = await fetch(
        "https://api.sportify.com/v1/search?" +
            new URLSearchParams({ q, type: "track", limit: 10}),
        {
            headers: { Authorization: "Bearer " + token },
        }
    );
    const data = await response.json();
    res.json(data);
}
