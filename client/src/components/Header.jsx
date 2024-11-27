import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    //when the searchTerm is cleared in the filters panel and you want that to clear/sync with the main search bar value, then remove the if condition and directly setSearchTerm here without any checking
    if (searchTermFromUrl) setSearchTerm(searchTermFromUrl);
  }, [location.search]);

  return (
    <header className="fixed top-0 z-50 w-full h-16 shadow-md shadow-custom-bg bg-white/80 backdrop-blur-md">
      <div className="flex items-center justify-between max-w-6xl p-2 mx-auto">
        <Link to="/">
          <h1 className="text-lg font-bold text-transparent md:text-2xl lg:text-3xl bg-gradient-to-r from-custom-secondary to-custom-primary bg-clip-text">
            EstateEase
          </h1>
        </Link>
        <form
          onSubmit={handleSearchSubmit}
          className="flex items-center p-3 rounded-lg bg-custom-bg"
        >
          <input
            type="text"
            placeholder="Search..."
            className="w-24 bg-transparent focus:outline-none md:w-48 lg:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch
            className="cursor-pointer text-slate-700"
            onClick={handleSearchSubmit}
          />
        </form>
        <ul className="flex items-center gap-4 text-base lg:text-lg">
          <Link to="/">
            <li className="hidden transition-all duration-300 text-slate-700 sm:inline hover:text-slate-500">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden transition-all duration-300 text-slate-700 sm:inline hover:text-slate-500">
              About
            </li>
          </Link>
          {currentUser ? (
            <Link to="/profile">
              <img
                src={currentUser.avatar}
                alt="profile"
                className="object-cover rounded-full h-7 w-7"
              />
            </Link>
          ) : (
            <Link to="/sign-in">
              <li className="px-5 py-1 text-white transition-all duration-300 rounded-lg hover:opacity-90 bg-custom-primary">
                SignIn
              </li>
            </Link>
          )}
          {/* Alternative approach */}
          {/* <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.avatar}
                alt="profile"
                className="object-cover rounded-full h-7 w-7"
              />
            ) : (
              <li className="text-slate-700 hover:underline">SignIn</li>
            )}
          </Link> */}
        </ul>
      </div>
    </header>
  );
}

export default Header;
