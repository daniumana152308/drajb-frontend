import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const handleLogout = () => { logout(); navigate("/login"); };
  const active = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-[#1e3a5f] w-full">
      <div className="w-full px-8 md:px-16 lg:px-24">
        <div className="h-20 flex items-center justify-between">

          {/* Brand */}
          <Link to="/home" className="flex items-center gap-3 hover:scale-105 transition-transform duration-200">
            <span className="text-white font-semibold tracking-[0.15em] text-lg uppercase select-none"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              DRAJB Store
            </span>
          </Link>

          {/* Desktop links */}
          {user && (
            <div className="hidden md:flex items-center gap-10">
              {[
                { path: "/home", label: "Inicio" },
                { path: "/catalog", label: "Catálogo" },
                { path: "/profile", label: "Mi perfil" },
              ].map(({ path, label }) => (
                <Link key={path} to={path}
                  className={`text-base tracking-wide transition-all duration-200 hover:scale-105 ${
                    active(path) ? "text-white font-medium" : "text-white/60 hover:text-white"
                  }`}>
                  {label}
                </Link>
              ))}
              <Link to="/cart" className="relative text-base tracking-wide transition-all duration-200 text-white/60 hover:text-white hover:scale-105">
                Carrito
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-5 bg-white text-[#1e3a5f] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          )}

          {/* User + logout - right space so the scale animation doesn't touch the edge */}
          {user && (
            <div className="hidden md:flex items-center gap-5 pr-4">
              <span className="text-white/50 text-base">{user.firstName} {user.lastName}</span>
              <button onClick={handleLogout}
                className="text-sm text-white/40 hover:text-white tracking-wider uppercase transition-all duration-200 hover:scale-105">
                Salir
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile nav */}
      {user && (
        <div className="md:hidden border-t border-white/10 flex justify-around py-3">
          {[
            { path: "/home", label: "Inicio" },
            { path: "/catalog", label: "Catálogo" },
            { path: "/cart", label: "Carrito", badge: totalItems },
            { path: "/profile", label: "Perfil" },
          ].map(({ path, label, badge }) => (
            <Link key={path} to={path}
              className={`relative flex flex-col items-center gap-0.5 px-4 py-1.5 text-sm tracking-wide transition-all duration-200 hover:scale-110 ${
                active(path) ? "text-white font-medium" : "text-white/40 hover:text-white"
              }`}>
              {label}
              {badge && badge > 0 && (
                <span className="absolute -top-1 right-0 bg-white text-[#1e3a5f] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {badge}
                </span>
              )}
            </Link>
          ))}
          <button onClick={handleLogout} className="text-white/30 text-sm tracking-wide hover:text-white transition-all duration-200 hover:scale-110 px-4 py-1.5">
            Salir
          </button>
        </div>
      )}
    </nav>
  );
}
