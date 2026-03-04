import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Shield, User, Menu, X, LogOut, Inbox } from "lucide-react";
import Alert from "./Alert";

const Navbar = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
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
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const NavButton = ({ children, onClick, className = "" }) => (
    <button
      onClick={onClick}
      className={`relative px-3 py-1 rounded-md font-medium transition-all duration-200 hover:text-amber-500 ${className}`}
    >
      {children}
      <span className="absolute left-0 -bottom-1 h-[2px] bg-amber-500 transition-all duration-200" />
    </button>
  );

  const AuthButtons = ({ isMobile = false }) => {
    if (isAuthenticated) {
      return (
        <div className={`flex ${isMobile ? "flex-col gap-4" : "items-center gap-3"}`}>
          {/* User Info */}
          <div className={`flex items-center gap-1 text-sm ${scrolled ? "text-slate-700" : "text-white"}`}>
            {user?.role === "admin" && <Shield size={16} className="text-amber-500" />}
            {user?.role === "user" && <User size={16} className="text-amber-500" />}
            {!isMobile && <span className="ml-1">{user?.name.charAt(0).toUpperCase() + user?.name.slice(1) || "User"}</span>}
          </div>

          {/* Minimal View Inquiries */}
          <button
            onClick={() => navigate("/inquiries#inquiries-section")}
            title="View Inquiries"
            className={`p-2 rounded-md text-white bg-amber-500 hover:bg-amber-600 transition duration-200 ${
              isMobile ? "w-full flex justify-start gap-2" : "flex items-center"
            }`}
          >
            <Inbox size={16} />
            {isMobile && <span>View Inquiries</span>}
          </button>

          {/* Minimal Logout */}
          <button
            onClick={() => setShowAlert(true)}
            title="Logout"
            className={`p-2 rounded-md text-white bg-red-500 hover:bg-red-600 transition duration-200 ${
              isMobile ? "w-full flex justify-start gap-2" : ""
            }`}
          >
            <LogOut size={16} />
            {isMobile && <span>Logout</span>}
          </button>
        </div>
      );
    }

    return (
      <button
        onClick={() => navigate("/login")}
        className={`bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md text-xs font-medium transition duration-200 ${
          isMobile ? "w-full text-left" : ""
        }`}
      >
        Log In
      </button>
    );
  };

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-12 transition-all duration-500 backdrop-blur-md ${
          scrolled
            ? "bg-white/70 shadow-md border-b border-white/30 h-16"
            : "bg-transparent h-12 text-white"
        }`}
      >
        {/* Logo */}
        <div onClick={() => navigate("/")} className="flex items-center gap-3 cursor-pointer group">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center font-serif italic font-bold text-xl transition-all duration-300 ${
              scrolled ? "bg-slate-900 text-white" : "bg-white text-slate-900"
            } group-hover:scale-110`}
          >
            R
          </div>
          <span className="hidden sm:block font-serif text-2xl font-semibold tracking-tight group-hover:text-amber-500 transition">
            RealEstate
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6 text-xs font-semibold uppercase tracking-[0.15em]">
          {navItems.map((item) => (
            <NavButton
              key={item.name}
              onClick={() => handleNavClick(item.targetId)}
              className={scrolled ? "text-slate-700" : "text-white/90"}
            >
              {item.name}
            </NavButton>
          ))}

          {user?.role === "admin" && (
            <NavButton
              onClick={() => navigate("/admin-panel")}
              className={scrolled ? "text-slate-700" : "text-white/90"}
            >
              Admin Portal
            </NavButton>
          )}
        </div>

        {/* Desktop Auth */}
        <div className="hidden lg:flex items-center gap-3">
          <AuthButtons />
        </div>

        {/* Mobile Hamburger */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden">
          {mobileOpen ? (
            <X size={28} className={scrolled ? "text-slate-800" : "text-white"} />
          ) : (
            <Menu size={28} className={scrolled ? "text-slate-800" : "text-white"} />
          )}
        </button>
      </nav>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-500 ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        } lg:hidden`}
      >
        <div className="flex flex-col gap-6 p-8 mt-20 text-sm font-semibold uppercase tracking-wide text-slate-700">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                handleNavClick(item.targetId);
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

          <div className="border-t pt-6 flex flex-col gap-3">
            <AuthButtons isMobile />
          </div>
        </div>
      </div>

      {/* Logout Alert */}
      {showAlert && (
        <Alert
          message="Are you sure you want to logout?"
          onConfirm={() => {
            logout();
            setShowAlert(false);
            navigate("/");
          }}
          onCancel={() => setShowAlert(false)}
        />
      )}

      {children}
    </>
  );
};

export default Navbar;