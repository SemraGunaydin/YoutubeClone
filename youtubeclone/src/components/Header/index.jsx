import { Link, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaBell, FaMicrophone } from "react-icons/fa";
import { MdVideoLibrary } from "react-icons/md";
import { IoIosVideocam } from "react-icons/io";

const Header = () => {
  const navigate = useNavigate();

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const text = e.target[0].value;
    if (text.trim()) {
      navigate(`/results?search_query=${text}`);
    }
  };

  return (
    <header className="px-2 sm:px-4 py-[17px] flex justify-between items-center">
      {/* Logo and Title */}
      <Link className="flex gap-1.5 items-center" to="/">
        <img
          src="/youtube.png"
          alt="youtube-logo"
          className="w-[41px] sm:w-12"
        />
        <h1 className="text-[21px] sm:text-2xl font-mono">YouTube</h1>
      </Link>

      {/* Search Form */}
      <form
        onSubmit={handleSubmit}
        className="flex border border-gray-400 rounded-[20px] overflow-hidden"
      >
        <input
          type="search"
          placeholder="Search"
          className="bg-[#0f0f0f] px-2 sm:px-5 py-1 sm:py-2 border border-transparent rounded-l-[20px]"
        />
        <button
          type="submit"
          className="px-3 sm:px-4 sm:text-2xl bg-zinc-800 hover:bg-zinc-600 cursor-pointer transition duration-300"
        >
          <CiSearch />
        </button>
        <button
          type="button"
          className="px-3 sm:px-4 sm:text-2xl bg-zinc-800 hover:bg-zinc-600 cursor-pointer transition duration-300"
        >
          <FaMicrophone />
        </button>
      </form>

      {/* Right Icons */}
      <div className="flex gap-3 text-xl cursor-pointer max-sm:hidden">
        <FaBell className="hover:text-gray-400 transition" />
        <MdVideoLibrary className="hover:text-gray-400 transition" />
        <IoIosVideocam className="hover:text-gray-400 transition" />
      </div>
    </header>
  );
};

export default Header;