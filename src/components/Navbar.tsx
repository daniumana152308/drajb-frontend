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
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-sm w-full">
            <div className="w-full px-8 md:px-16 lg:px-24">
                <div className="h-20 flex items-center justify-between">

                    {/* Brand */}
                    <Link to="/home" className="flex items-center gap-3 hover:scale-105 transition-transform duration-200">
                        <span className="font-extrabold uppercase select-none bg-gradient-to-r from-blue-700 to-orange-500 bg-clip-text text-transparent text-xl tracking-widest">
                            DRAJB Store
                        </span>
                    </Link>

                    {/* Desktop links */}
                    {user && (
                        <div className="hidden md:flex items-center gap-8">
                            {[
                                { path: "/home", label: "Inicio" },
                                { path: "/catalog", label: "Catálogo" },
                                { path: "/orders", label: "Mis Pedidos" },
                                { path: "/profile", label: "Mi perfil" },
                            ].map(({ path, label }) => (
                                <Link key={path} to={path}
                                    className={`text-sm font-semibold tracking-wide transition-all duration-200 hover:scale-105 relative group ${
                                        active(path) ? "text-blue-700" : "text-gray-600 hover:text-blue-600"
                                    }`}>
                                    {label}
                                    <span className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full transition-transform duration-200 origin-left ${
                                        active(path) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                    }`} />
                                </Link>
                            ))}

                            <Link to="/cart" className={`relative text-sm font-semibold tracking-wide transition-all duration-200 hover:scale-105 group ${
                                active("/cart") ? "text-blue-700" : "text-gray-600 hover:text-blue-600"
                            }`}>
                                🛒 Carrito
                                {totalItems > 0 && (
                                    <span className="absolute -top-2.5 -right-5 bg-orange-500 text-white text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center shadow-md shadow-orange-500/40">
                                        {totalItems}
                                    </span>
                                )}
                                <span className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full transition-transform duration-200 origin-left ${
                                    active("/cart") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                }`} />
                            </Link>
                        </div>
                    )}

                    {/* User + logout */}
                    {user && (
                        <div className="hidden md:flex items-center gap-4 pr-2">
                            <span className="text-gray-500 text-sm font-medium">{user.firstName} {user.lastName}</span>
                            <button onClick={handleLogout}
                                className="text-xs font-bold text-red-500 hover:text-red-600 tracking-widest uppercase transition-all duration-200 hover:scale-105 border border-red-200 hover:border-red-400 px-3 py-1.5 rounded-full hover:bg-red-50">
                                Salir
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile nav */}
            {user && (
                <div className="md:hidden border-t border-gray-200 flex justify-around bg-white/98">
                    {[
                        { path: "/home", label: "Inicio", icon: "🏠" },
                        { path: "/catalog", label: "Catálogo", icon: "👕" },
                        { path: "/orders", label: "Pedidos", icon: "📦" },
                        { path: "/cart", label: "Carrito", icon: "🛒", badge: totalItems },
                        { path: "/profile", label: "Perfil", icon: "👤" },
                    ].map(({ path, label, icon, badge }) => (
                        <Link key={path} to={path}
                            className={`relative flex flex-col items-center justify-center gap-0.5 px-3 min-h-[52px] text-[11px] font-semibold tracking-wide transition-all duration-200 ${
                                active(path) ? "text-blue-600" : "text-gray-400 hover:text-gray-700"
                            }`}>
                            <span className="text-base">{icon}</span>
                            {label}
                            {badge && badge > 0 && (
                                <span className="absolute top-1 right-1 bg-orange-500 text-white text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center">
                                    {badge}
                                </span>
                            )}
                        </Link>
                    ))}
                    <button onClick={handleLogout}
                        className="text-red-400 text-[11px] font-semibold tracking-wide hover:text-red-600 transition-all duration-200 px-3 min-h-[52px] flex flex-col items-center justify-center gap-0.5">
                        <span className="text-base">🚪</span>
                        Salir
                    </button>
                </div>
            )}
        </nav>
    );
}
