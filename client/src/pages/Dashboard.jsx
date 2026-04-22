import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import MovieRow from "../components/MovieRow";
import { movieRows } from "../data/movies";

function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  const allMovies = useMemo(() => movieRows.flatMap((row) => row.movies), []);

  const filteredMovies = allMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <section
        className="relative min-h-[75vh] flex items-center px-4 sm:px-8 md:px-14 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://picsum.photos/1600/800?9')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

        <div className="relative z-10 max-w-2xl py-12">
          <p className="uppercase tracking-[0.3em] text-red-500 text-sm mb-3">
            Netflix Series
          </p>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4">
            Unlimited movies, TV shows and more
          </h2>

          <p className="text-zinc-300 text-sm sm:text-base md:text-lg leading-6 mb-8 max-w-xl">
            Watch your favorite content in this Netflix-style dashboard.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-white text-black px-6 py-3 rounded font-semibold hover:bg-zinc-200">
              Play
            </button>

            <button className="bg-zinc-700/80 text-white px-6 py-3 rounded font-semibold hover:bg-zinc-600">
              More Info
            </button>
          </div>
        </div>
      </section>

      {searchTerm ? (
        <section className="px-4 sm:px-8 md:px-14 py-10">
          <h3 className="text-2xl font-bold mb-6">Search Results</h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredMovies.map((movie) => (
              <div key={movie.id}>
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-56 object-cover rounded-lg"
                />
                <p className="mt-2">{movie.title}</p>
              </div>
            ))}
          </div>
        </section>
      ) : (
        movieRows.map((row) => (
          <MovieRow key={row.title} title={row.title} movies={row.movies} />
        ))
      )}

      <footer className="bg-black border-t border-zinc-800 mt-10 px-4 sm:px-8 md:px-14 py-10 text-zinc-400">
        <p className="mb-6 text-sm">Questions? Call 000-800-919-1694</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-sm">
          <p>FAQ</p>
          <p>Help Centre</p>
          <p>Privacy</p>
          <p>Terms of Use</p>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;