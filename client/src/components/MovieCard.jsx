import { Play } from "lucide-react";

function MovieCard({ movie }) {
  return (
    <div className="min-w-[220px] sm:min-w-[240px] md:min-w-[260px] group relative rounded-lg overflow-hidden bg-zinc-900 shadow-lg">
      <img
        src={movie.image}
        alt={movie.title}
        className="w-full h-56 object-cover group-hover:scale-110 transition duration-300"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90"></div>

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h4 className="text-lg font-semibold">{movie.title}</h4>
      </div>

      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center gap-3">
        <button className="bg-white text-black px-4 py-2 rounded font-semibold flex items-center gap-2 hover:bg-zinc-200">
          <Play size={16} fill="currentColor" />
          Play
        </button>

        <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-medium text-sm">
          Add to List
        </button>
      </div>
    </div>
  );
}

export default MovieCard;