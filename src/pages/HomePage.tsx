import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function HomePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const quickLinks = [
    { title: "Catálogo", desc: "Explora todos nuestros diseños y tallas disponibles.", action: () => navigate("/catalog"), cta: "Ver colección" },
    { title: "Mi Carrito", desc: "Revisa los productos que has agregado a tu pedido.", action: () => navigate("/cart"), cta: "Ver carrito" },
    { title: "Mi Perfil", desc: "Actualiza tus datos personales y dirección de envío.", action: () => navigate("/profile"), cta: "Ver perfil" },
  ];

  return (
    <div className="min-h-screen w-full bg-[#f7f7f5] flex flex-col overflow-x-hidden">
      <Navbar />

      <main className="flex-1 flex flex-col">

        {/* Hero */}
        <section className="bg-[#1e3a5f] w-full relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, white 40px, white 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, white 40px, white 41px)' }} />

          <div className="relative w-full px-8 md:px-16 lg:px-24 py-24 md:py-36">
            <div className="max-w-3xl">
              <p className="text-white/40 text-xs tracking-[0.3em] uppercase mb-6">Bienvenido de vuelta</p>
              <h1 className="text-white leading-tight mb-8 select-none"
                style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.8rem, 6vw, 5rem)', fontWeight: 600 }}>
                Hola,<br />
                <span className="italic font-medium text-white/70">{user?.firstName} {user?.lastName}</span>
              </h1>
              <p className="text-white/40 text-lg leading-relaxed mb-12 max-w-xl">
                Encuentra tu camiseta perfecta entre nuestra colección de diseños únicos. Calidad que se nota en cada detalle.
              </p>
              <div className="flex flex-wrap gap-5">
                <button onClick={() => navigate("/catalog")}
                  className="px-12 py-5 bg-white text-[#1e3a5f] text-base font-medium tracking-wide rounded-md hover:bg-gray-50 hover:shadow-xl hover:shadow-black/15 hover:scale-105 active:scale-[0.98] transition-all duration-200">
                  Ver colección
                </button>
                <button onClick={() => navigate("/cart")}
                  className="px-12 py-5 border-2 border-white/30 text-white text-base font-medium tracking-wide rounded-md hover:border-white hover:text-white hover:scale-105 active:scale-[0.98] transition-all duration-200">
                  Mi carrito
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Quick access - extra horizontal padding so first and last cards have side space */}
        <section className="w-full px-8 md:px-16 lg:px-32 pt-20 pb-16 md:pt-28 md:pb-20">
          <div className="mb-14">
            <p className="text-xs text-gray-400 tracking-[0.25em] uppercase mb-3">Navegación rápida</p>
            <h2 className="text-3xl md:text-4xl font-medium text-gray-800" style={{ fontFamily: 'Playfair Display, serif' }}>
              ¿A dónde quieres ir?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10 px-2">
            {quickLinks.map((link, i) => (
              <div key={link.title}
                className="bg-white border border-gray-100 rounded-lg p-8 md:p-10 group cursor-pointer hover:border-[#1e3a5f]/30 hover:shadow-xl hover:shadow-[#1e3a5f]/8 hover:scale-[1.02] transition-all duration-300"
                onClick={link.action}>
                <p className="text-[10px] text-gray-300 tracking-[0.25em] uppercase mb-5">0{i + 1}</p>
                <h3 className="text-gray-800 font-medium text-2xl mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {link.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-8">{link.desc}</p>
                <span className="text-[#1e3a5f] text-sm font-medium tracking-widest uppercase group-hover:underline underline-offset-4 transition-all">
                  {link.cta} →
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Features strip */}
        <section className="border-t border-gray-100 bg-white w-full mt-auto">
          <div className="w-full px-8 md:px-16 lg:px-24 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { label: "Envío gratis", sub: "En todos los pedidos" },
                { label: "Diseños únicos", sub: "Colección exclusiva" },
                { label: "100% Algodón", sub: "Calidad premium" },
                { label: "Tallas XS–XXL", sub: "Para todos los estilos" },
              ].map(({ label, sub }) => (
                <div key={label}>
                  <p className="text-gray-700 font-medium text-base mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>{label}</p>
                  <p className="text-gray-400 text-sm">{sub}</p>
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
