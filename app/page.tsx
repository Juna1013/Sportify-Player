import Player from "../components/Player";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-green-500 mt-6">Sportify Player</h1>
      <a href="/api/login" className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
        Sportifyにログイン
      </a>
      <div className="w-full max-w-xl mt-6">
        <Player />
      </div>
    </div>
  );
}
