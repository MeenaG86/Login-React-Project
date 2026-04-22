import MovieCard from "./MovieCard";

function MovieRow({ title, movies }) {
  return (
    <section className="px-4 sm:px-8 md:px-14 py-8">
      <h3 className="text-2xl font-bold mb-5">{title}</h3>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}

export default MovieRow;