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
            gradient: "from-violet-600 via-purple-600 to-fuchsia-700",
            shadow: "shadow-purple-500/30",
            icon: "👕",
            num: "01",
        },
        {
            title: "Mi Carrito",
            desc: "Revisa los productos que has agregado a tu pedido.",
            action: () => navigate("/cart"),
            cta: "Ver carrito",
            gradient: "from-blue-600 via-cyan-600 to-teal-600",
            shadow: "shadow-cyan-500/30",
            icon: "🛒",
            num: "02",
        },
        {
            title: "Mi Perfil",
            desc: "Actualiza tus datos personales y dirección de envío.",
            action: () => navigate("/profile"),
            cta: "Ver perfil",
            gradient: "from-pink-600 via-rose-500 to-orange-500",
            shadow: "shadow-pink-500/30",
            icon: "👤",
            num: "03",
        },
    ];

    return (
        <div className="min-h-screen w-full flex flex-col overflow-x-hidden">
            <Navbar />

            <main className="flex-1 flex flex-col">

                {/* Hero */}
                <section className="w-full relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-950">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(168,85,247,0.25),transparent_65%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(59,130,246,0.2),transparent_65%)]" />
                    <div className="absolute inset-0 opacity-[0.04]"
                        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, white 40px, white 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, white 40px, white 41px)' }} />

                    <div className="relative w-full px-8 md:px-16 lg:px-24 py-16 sm:py-28 md:py-40">
                        <div className="max-w-3xl">
                            <p className="text-purple-300/60 text-xs tracking-[0.4em] uppercase mb-4 sm:mb-6 font-bold">✦ Bienvenido de vuelta ✦</p>
                            <h1 className="text-white leading-none mb-6 sm:mb-8 select-none"
                                style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(3.5rem, 10vw, 9rem)', letterSpacing: '0.04em' }}>
                                Hola,<br />
                                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                                    {user?.firstName} {user?.lastName}
                                </span>
                            </h1>
                            <p className="text-white/45 text-base sm:text-lg leading-relaxed mb-8 sm:mb-12 max-w-xl">
                                Encuentra tu camiseta perfecta entre nuestra colección de diseños únicos. Calidad que se nota en cada detalle.
                            </p>
                            <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-5">
                                <button onClick={() => navigate("/catalog")}
                                    className="px-8 sm:px-12 py-4 sm:py-5 min-h-[44px] bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-base font-bold tracking-widest rounded-xl hover:shadow-2xl hover:shadow-purple-500/40 hover:scale-105 active:scale-[0.98] transition-all duration-200"
                                    style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.12em' }}>
                                    Ver colección
                                </button>
                                <button onClick={() => navigate("/cart")}
                                    className="px-8 sm:px-12 py-4 sm:py-5 min-h-[44px] border-2 border-white/20 hover:border-purple-400/60 text-white text-base font-bold tracking-widest rounded-xl hover:bg-purple-500/10 hover:scale-105 active:scale-[0.98] transition-all duration-200"
                                    style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.12em' }}>
                                    Mi carrito
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Quick access */}
                <section className="w-full px-8 md:px-16 lg:px-32 pt-14 pb-12 sm:pt-20 sm:pb-16 md:pt-28 md:pb-20">
                    <div className="mb-10 sm:mb-14">
                        <p className="text-purple-400/50 text-xs tracking-[0.3em] uppercase mb-3 font-bold">✦ Navegación rápida ✦</p>
                        <h2 className="text-white font-black"
                            style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '0.05em' }}>
                            ¿A dónde quieres ir?
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-8 md:gap-10">
                        {quickLinks.map((link) => (
                            <div key={link.title}
                                className={`bg-gradient-to-br ${link.gradient} rounded-2xl p-6 sm:p-8 md:p-10 group cursor-pointer hover:scale-[1.04] hover:shadow-2xl ${link.shadow} transition-all duration-300 relative overflow-hidden`}
                                onClick={link.action}>
                                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-300" />
                                <p className="text-white/30 text-[10px] tracking-[0.35em] uppercase mb-4 font-black">{link.num}</p>
                                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{link.icon}</div>
                                <h3 className="text-white font-black text-2xl sm:text-3xl mb-3 leading-none"
                                    style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}>
                                    {link.title}
                                </h3>
                                <p className="text-white/60 text-sm leading-relaxed mb-6 sm:mb-8">{link.desc}</p>
                                <span className="inline-flex items-center gap-2 text-white/80 text-sm font-black tracking-widest uppercase group-hover:text-white group-hover:gap-3 transition-all duration-200">
                                    {link.cta} →
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Features strip */}
                <section className="bg-gray-950/60 backdrop-blur-sm border-t border-white/10 w-full mt-auto">
                    <div className="w-full px-8 md:px-16 lg:px-24 py-12">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            {[
                                { label: "Envío gratis", sub: "En todos los pedidos", icon: "🚚", color: "text-cyan-400" },
                                { label: "Diseños únicos", sub: "Colección exclusiva", icon: "✨", color: "text-purple-400" },
                                { label: "100% Algodón", sub: "Calidad premium", icon: "🌿", color: "text-emerald-400" },
                                { label: "Tallas XS–XXL", sub: "Para todos los estilos", icon: "📐", color: "text-pink-400" },
                            ].map(({ label, sub, icon, color }) => (
                                <div key={label} className="group">
                                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-200">{icon}</div>
                                    <p className={`${color} font-bold text-sm mb-1`}>{label}</p>
                                    <p className="text-white/30 text-xs">{sub}</p>
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
