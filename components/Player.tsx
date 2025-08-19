"use client";
import { useState, useEffect } from "react";

// Spotify Track型
interface Artist {
    id: string;
    name: string;
}

interface Track {
    id: string;
    name:string;
    uri: string;
    artists: Artist[];
    duration_ms: number;
}

interface CurrentTrackResponse {
    item: Track | null;
    is_playing: boolean;
    progress_ms: number;
}

export default function Player() {
    const [query, setQuery] = useState<string>("");
    const [tracks, setTracks] = useState<Track[]>([]);
    const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);

    // 曲検索
    const search = async () => {
        const res = await fetch("/api/search?q=" + query);
        const data = await res.json();
        setTracks(data.tracks.items as Track[]);
    };

    // 再生
    const play = async (uri: string) => {
        await fetch("/api/play", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ uri }),
        });
        updateCurrentTrack();
    };

    // 再生中の曲情報取得
    const updateCurrentTrack = async () => {
        const res = await fetch("/api/current");
        const data: CurrentTrackResponse = await res.json();
        if (data.item) {
            setCurrentTrack(data.item);
            setIsPlaying(data.is_playing);
            setProgress(data.progress_ms / data.item.duration_ms);
        }
    };

    // 再生 / 一時停止
    const togglePlay = async () => {
        const api = isPlaying ? "/api/pause" : "/api/resume";
        await fetch(api, { method: "POST" });
        updateCurrentTrack();
    }

    // 次の曲
    const next = async () => {
        await fetch("/api/next", { method: "POST" });
        updateCurrentTrack();
    };

    // 前の曲
    const previous = async () => {
        await fetch("/api/previous", { method: "POST" });
        updateCurrentTrack();
    };

    // 1秒ごとに進行状況更新
    useEffect(() => {
        const interval = setInterval(updateCurrentTrack, 1000);
        return () => clearInterval(interval);
    }, []);

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
