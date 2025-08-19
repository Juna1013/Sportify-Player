"use client";
import { UseState } from "react";

export default function Player() {
    const [query, setQuery] = useState("");
    const [tracks, setTracks] = useState([]);

    const search = async () => {
        const res = await fetch("/api/search?q=" + query);
        const data = await res.json();
        setTracks(data.tracks.items);
    };

    const play = async (uri) => {
        await fetch("/api/play", {
            method: "POST",
            headers: { "COntent-Type" : "application/json" },
            body: JSON.stringify({ uri }),
        });
    };

    return (
        <div className="p-4 space-y-4">
            <div className="flex space-x-2">
                <input
                    className="flex-1 border p-2 rounded"
                    placeholder="曲を検索"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button onClick={search} className="bg-green-500 text-white px-4 py-2 rounded">
                    検索
                </button>
            </div>
            <ul className="space-y-2">
                {tracks.map((track) => (
                    <li key={track.id} className="flex justify-between items-center p-2 border rounded">
                        <span>{track.name} - {track.artists[0].name}</span>
                        <button onClick={() => play(track.uri)} className="bg-blue-500 text-white px-2 py-1 rounded">
                            ▶︎ 再生
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
