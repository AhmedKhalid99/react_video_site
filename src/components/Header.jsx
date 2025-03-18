import { Link, useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = location.pathname !== "/"; // Assuming login page is "/"

  const handleLogout = () => {
    navigate("/"); // Redirect to login page
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-800 text-white px-6 py-4 shadow-md flex items-center justify-between z-50">
      {/* Logo on the left */}
      <div className="text-xl font-bold">
        <img src="/logo.png" alt="Company Logo" className="h-10" />
      </div>

      {/* Company name in the center */}
      <h1 className="text-2xl font-semibold">My Courses</h1>

      {/* Login/Logout Button on the right */}
      <div>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/"
            className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
