export default function handler(req, res) {
    const scope = "user-read-playback-state user-modify-playback-state user-read-currently-playing streaming app-remote-control user-read-email";
    const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;
    const client_id = process.env.SPORTIFY_CLIENT_ID;

    res.redirect(
        "https://accounts.spotify.com/authorize?" +
        new URLSearchParams({
            response_type: "code",
            client_id,
            scope,
            redirect_uri,
        })
    );
}
