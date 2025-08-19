"use client";
import { useState } from "react"; // インポート修正

interface Track {
    id: string;
    name: string;
    uri: string;
    artists: { name: string }[];
}

export default function Player() {
    const [query, setQuery] = useState("");
    const [tracks, setTracks] = useState<Track[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const search = async () => {
        if (!query.trim()) return;
        
        setLoading(true);
        setError(null);
        
        try {
            const res = await fetch("/api/search?q=" + encodeURIComponent(query));
            const data = await res.json();
            
            if (!res.ok) {
                throw new Error(data.error || 'Search failed');
            }
            
            setTracks(data.tracks?.items || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Search failed');
            setTracks([]);
        } finally {
            setLoading(false);
        }
    };

    const play = async (uri: string) => {
        try {
            const response = await fetch("/api/play", {
                method: "POST",
                headers: { "Content-Type": "application/json" }, // タイポ修正
                body: JSON.stringify({ uri }),
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Play failed');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Play failed');
        }
    };

    return (
        <div className="p-4 space-y-4">
            <div className="flex space-x-2">
                <input
                    className="flex-1 border p-2 rounded"
                    placeholder="曲を検索"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && search()}
                />
                <button 
                    onClick={search} 
                    disabled={loading}
                    className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    {loading ? "検索中..." : "検索"}
                </button>
            </div>
            
            {error && (
                <div className="text-red-500 p-2 border border-red-300 rounded bg-red-50">
                    {error}
                </div>
            )}
            
            <ul className="space-y-2">
                {tracks.map((track) => (
                    <li key={track.id} className="flex justify-between items-center p-2 border rounded">
                        <span>{track.name} - {track.artists[0]?.name}</span>
                        <button 
                            onClick={() => play(track.uri)} 
                            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                        >
                            ▶︎ 再生
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
