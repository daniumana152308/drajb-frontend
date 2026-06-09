import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function HomePage() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const quickLinks = [
        {
            title: "Catálogo",
            desc: "Explora todos nuestros diseños y tallas disponibles.",
            action: () => navigate("/catalog"),
            cta: "Ver colección",
            gradient: "from-blue-600 via-blue-700 to-indigo-700",
            shadow: "shadow-blue-500/30",
            icon: "👕",
            num: "01",
        },
        {
            title: "Mi Carrito",
            desc: "Revisa los productos que has agregado a tu pedido.",
            action: () => navigate("/cart"),
            cta: "Ver carrito",
            gradient: "from-orange-500 via-orange-600 to-amber-600",
            shadow: "shadow-orange-500/30",
            icon: "🛒",
            num: "02",
        },
        {
            title: "Mi Perfil",
            desc: "Actualiza tus datos personales y dirección de envío.",
            action: () => navigate("/profile"),
            cta: "Ver perfil",
            gradient: "from-sky-500 via-blue-500 to-blue-600",
            shadow: "shadow-sky-500/30",
            icon: "👤",
            num: "03",
        },
    ];

    return (
        <div className="min-h-screen w-full flex flex-col overflow-x-hidden">
            <Navbar />

            <main className="flex-1 flex flex-col">

                {/* Hero */}
                <section className="w-full relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(251,146,60,0.15),transparent_65%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(56,189,248,0.15),transparent_65%)]" />
                    <div className="absolute inset-0 opacity-[0.04]"
                        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, white 40px, white 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, white 40px, white 41px)' }} />

                    <div className="relative w-full px-8 md:px-16 lg:px-24 py-16 sm:py-28 md:py-40 text-center">
                        <div className="max-w-3xl mx-auto">
                            <p className="text-orange-300/70 text-xs tracking-widest uppercase mb-4 sm:mb-6 font-bold">✦ Bienvenido de vuelta ✦</p>
                            <h1 className="text-white font-black leading-tight mb-6 sm:mb-8 select-none"
                                style={{ fontSize: 'clamp(2.5rem, 8vw, 6.5rem)' }}>
                                Hola,{" "}
                                <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-400 bg-clip-text text-transparent">
                                    {user?.firstName} {user?.lastName}
                                </span>
                            </h1>
                            <p className="text-blue-100/60 text-base sm:text-lg leading-relaxed mb-8 sm:mb-12 max-w-xl mx-auto font-medium">
                                Encuentra tu camiseta perfecta entre nuestra colección de diseños únicos. Calidad que se nota en cada detalle.
                            </p>
                            <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-5 justify-center">
                                <button onClick={() => navigate("/catalog")}
                                    className="px-8 sm:px-12 py-4 sm:py-5 min-h-[44px] bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white text-base font-extrabold tracking-wide rounded-xl hover:shadow-2xl hover:shadow-orange-500/40 hover:scale-105 active:scale-[0.98] transition-all duration-200">
                                    Ver colección
                                </button>
                                <button onClick={() => navigate("/cart")}
                                    className="px-8 sm:px-12 py-4 sm:py-5 min-h-[44px] border-2 border-white/25 hover:border-orange-400/70 text-white text-base font-bold tracking-wide rounded-xl hover:bg-orange-500/10 hover:scale-105 active:scale-[0.98] transition-all duration-200">
                                    Mi carrito
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Quick access */}
                <section className="w-full px-8 md:px-16 lg:px-32 pt-14 pb-12 sm:pt-20 sm:pb-16 md:pt-28 md:pb-20">
                    <div className="mb-10 sm:mb-14 text-center">
                        <p className="text-orange-500/60 text-xs tracking-widest uppercase mb-3 font-bold">✦ Navegación rápida ✦</p>
                        <h2 className="text-gray-900 font-black"
                            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
                            ¿A dónde quieres ir?
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-8 md:gap-10">
                        {quickLinks.map((link) => (
                            <div key={link.title}
                                className={`bg-gradient-to-br ${link.gradient} rounded-2xl p-6 sm:p-8 md:p-10 group cursor-pointer hover:scale-[1.04] hover:shadow-2xl ${link.shadow} transition-all duration-300 relative overflow-hidden text-center`}
                                onClick={link.action}>
                                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-300" />
                                <p className="text-white/30 text-[10px] tracking-widest uppercase mb-4 font-black">{link.num}</p>
                                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{link.icon}</div>
                                <h3 className="text-white font-black text-xl sm:text-2xl mb-3 leading-tight">
                                    {link.title}
                                </h3>
                                <p className="text-white/65 text-sm leading-relaxed mb-6 sm:mb-8 font-medium">{link.desc}</p>
                                <span className="inline-flex items-center justify-center gap-2 text-white/80 text-sm font-bold tracking-wide uppercase group-hover:text-white group-hover:gap-3 transition-all duration-200">
                                    {link.cta} →
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Features strip */}
                <section className="bg-white/70 backdrop-blur-sm border-t border-gray-200/80 w-full mt-auto">
                    <div className="w-full px-8 md:px-16 lg:px-24 py-12">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            {[
                                { label: "Envío gratis",   sub: "En todos los pedidos",  icon: "🚚", color: "text-orange-500" },
                                { label: "Diseños únicos", sub: "Colección exclusiva",    icon: "✨", color: "text-blue-600"   },
                                { label: "100% Algodón",   sub: "Calidad premium",        icon: "🌿", color: "text-emerald-600"},
                                { label: "Tallas XS–XXL",  sub: "Para todos los estilos", icon: "📐", color: "text-sky-500"   },
                            ].map(({ label, sub, icon, color }) => (
                                <div key={label} className="group">
                                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-200">{icon}</div>
                                    <p className={`${color} font-bold text-sm mb-1`}>{label}</p>
                                    <p className="text-gray-500 text-xs font-medium">{sub}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
