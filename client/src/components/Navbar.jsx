import { Search, Bell, LogOut, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar({ searchTerm, setSearchTerm }) {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail") || "User";
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    navigate("/");
  }

  return (
    <nav className="sticky top-0 z-50 bg-black/90 border-b border-zinc-800 text-white">
      <div className="px-4 sm:px-8 md:px-14 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-red-600 text-2xl sm:text-3xl font-bold tracking-wide">
            NETFLIX
          </h1>

          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden md:flex items-center gap-4 text-sm text-zinc-300">
            <p className="hover:text-white cursor-pointer">Home</p>
            <p className="hover:text-white cursor-pointer">TV Shows</p>
            <p className="hover:text-white cursor-pointer">Movies</p>
            <p className="hover:text-white cursor-pointer">My List</p>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-md py-2 pl-10 pr-4 text-sm outline-none focus:border-red-600"
              />
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
              />
            </div>

            <button className="text-zinc-300 hover:text-white">
              <Bell size={20} />
            </button>

            <div className="w-10 h-10 rounded bg-red-600 flex items-center justify-center font-bold">
              {userEmail[0]?.toUpperCase() || "U"}
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-medium"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="mt-4 flex flex-col gap-4 md:hidden">
            <div className="flex flex-col gap-3 text-sm text-zinc-300">
              <p className="hover:text-white cursor-pointer">Home</p>
              <p className="hover:text-white cursor-pointer">TV Shows</p>
              <p className="hover:text-white cursor-pointer">Movies</p>
              <p className="hover:text-white cursor-pointer">My List</p>
            </div>

            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-md py-2 pl-10 pr-4 text-sm outline-none focus:border-red-600"
              />
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
              />
            </div>

            <div className="flex items-center justify-between">
              <button className="text-zinc-300 hover:text-white">
                <Bell size={20} />
              </button>

              <div className="w-10 h-10 rounded bg-red-600 flex items-center justify-center font-bold">
                {userEmail[0]?.toUpperCase() || "U"}
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-medium"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;