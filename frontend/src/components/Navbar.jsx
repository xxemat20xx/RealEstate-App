import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Shield, User, Menu, X, LogOut } from "lucide-react";
import Alert from "./Alert";

const Navbar = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Property", targetId: "property" },
    { name: "About", targetId: "about" },
    { name: "Contact", targetId: "contact" },
  ];

  const handleNavClick = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white backdrop-blur-xl shadow-sm h-16"
            : "bg-transparent h-24 text-white"
        } flex items-center justify-between px-6 sm:px-12`}
      >
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center font-serif italic font-bold text-xl transition-all duration-300 ${
              scrolled
                ? "bg-slate-900 text-white"
                : "bg-white text-slate-900"
            } group-hover:scale-110`}
          >
            R
          </div>
          <span className="hidden sm:block font-serif text-2xl font-semibold tracking-tight group-hover:text-amber-500 transition">
            RealEstate
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-10 text-xs font-semibold uppercase tracking-[0.2em]">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.targetId)} // Scroll to section on click
              className={`relative transition duration-300 ${
                scrolled ? "text-slate-600" : "text-white/80"
              } hover:text-amber-500`}
            >
              {item.name}
              <span
                className={`absolute left-0 -bottom-1 h-[2px] bg-amber-500 transition-all duration-300`}
              />
            </button>
          ))}

          {user?.role === "admin" && (
            <button
              onClick={() => navigate("/admin-panel")}
              className={`relative transition duration-300 ${
                scrolled ? "text-slate-600" : "text-white/80"
              } hover:text-amber-500`}
            >
              Admin Portal
            </button>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Desktop Auth */}
          <div className="hidden lg:flex items-center gap-5">
            {isAuthenticated ? (
              <>
                <div
                  className={`flex items-center gap-2 text-sm ${
                    scrolled ? "text-slate-700" : "text-white"
                  }`}
                >
                  {user?.role === "admin" && (
                    <Shield size={18} className="text-amber-500" />
                  )}
                  {user?.role === "user" && (
                    <User size={18} className="text-amber-500" />
                  )}

                  <span>
                    {user?.name?.charAt(0).toUpperCase() +
                      user?.name?.slice(1)}
                  </span>
                </div>

                {/* Clean Premium Logout */}
                <button
                  onClick={() => setShowAlert(true)}
                  className="group flex items-center gap-2 px-5 py-2 rounded-full
                             border border-slate-300/40
                             text-xs font-semibold uppercase tracking-wide
                             transition-all duration-300
                             hover:bg-red-500 hover:text-white
                             hover:border-red-500 hover:shadow-lg"
                >
                  <LogOut
                    size={16}
                    className="transition-transform duration-300 group-hover:-translate-x-1"
                  />
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className={`text-sm font-medium transition ${
                    scrolled
                      ? "text-slate-600 hover:text-slate-900"
                      : "text-white hover:text-amber-400"
                  }`}
                >
                  Log In
                </button>

                <button className="bg-amber-600 text-white px-7 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-amber-700 hover:shadow-xl transition-all duration-300">
                  Register
                </button>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden"
          >
            {mobileOpen ? (
              <X size={28} className={scrolled ? "text-slate-800" : "text-white"} />
            ) : (
              <Menu size={28} className={scrolled ? "text-slate-800" : "text-white"} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        />
      )}

      {/* Mobile Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-500 ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        } lg:hidden`}
      >
        <div className="flex flex-col gap-8 p-8 mt-20 text-sm font-semibold uppercase tracking-widest text-slate-700">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                handleNavClick(item.targetId); // Scroll to section
                setMobileOpen(false);
              }}
              className="hover:text-amber-500 transition transform hover:translate-x-2"
            >
              {item.name}
            </button>
          ))}

          {user?.role === "admin" && (
            <button
              onClick={() => {
                navigate("/admin-panel");
                setMobileOpen(false);
              }}
              className="hover:text-amber-500 transition transform hover:translate-x-2"
            >
              Admin Portal
            </button>
          )}

          <div className="border-t pt-6">
            {isAuthenticated ? (
              <button
                onClick={() => {
                  setShowAlert(true);
                  setMobileOpen(false);
                }}
                className="flex items-center justify-center gap-2
                           bg-red-500 text-white px-6 py-3 rounded-full
                           text-xs font-semibold uppercase
                           hover:bg-red-600 hover:shadow-lg transition"
              >
                <LogOut size={16} />
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  navigate("/login");
                  setMobileOpen(false);
                }}
                className="bg-amber-600 text-white px-6 py-3 rounded-full text-xs font-semibold uppercase hover:bg-amber-700 hover:shadow-lg transition"
              >
                Log In
              </button>
            )}
          </div>
        </div>
      </div>

      {showAlert && (
        <Alert
          message="Are you sure you want to logout?"
          onConfirm={() => {
            logout();
            setShowAlert(false);
          }}
          onCancel={() => setShowAlert(false)}
        />
      )}

      {children}
    </>
  );
};

export default Navbar;