import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { login, register } from "../services/Api";

const inputClass = "w-full bg-white border border-gray-200 rounded-md px-5 py-4 text-base text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-[#1e3a5f] focus:ring-1 focus:ring-[#1e3a5f]/20 transition-all duration-200";
const labelClass = "block text-xs font-medium text-gray-400 uppercase tracking-widest mb-2";

export default function LoginPage() {
  const { login: setAuth } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", address: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) { setError("Correo y contraseña son obligatorios."); return; }
    setLoading(true); setError("");
    try {
      const user = mode === "login" ? await login(form.email, form.password) : await register(form);
      setAuth(user);
      navigate("/home");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error inesperado");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#f7f7f5] overflow-x-hidden">

      {/* Left panel */}
      <div className="hidden lg:flex w-5/12 bg-[#1e3a5f] flex-col justify-between px-16 py-16 relative overflow-hidden">
        <div className="absolute inset-0"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(255,255,255,0.015) 60px, rgba(255,255,255,0.015) 61px), repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(255,255,255,0.015) 60px, rgba(255,255,255,0.015) 61px)' }} />

        <div className="relative">
          <span className="text-white font-semibold tracking-[0.2em] text-2xl uppercase select-none"
            style={{ fontFamily: 'Playfair Display, serif' }}>
            DRAJB Store
          </span>
        </div>

        <div className="relative">
          <h2 className="text-white/90 font-medium leading-snug mb-6 select-none"
            style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)' }}>
            Diseño que<br />
            <span className="italic text-white/50">te define.</span>
          </h2>
          <p className="text-white/30 text-lg leading-relaxed">
            Encuentra camisetas únicas, con diseños que reflejan tu estilo. Calidad y forma en cada prenda.
          </p>
        </div>

        <div className="relative flex gap-10">
          <div>
            <p className="text-white font-semibold text-3xl" style={{ fontFamily: 'Playfair Display, serif' }}>+30</p>
            <p className="text-white/30 text-sm tracking-widest uppercase mt-1">Diseños</p>
          </div>
          <div className="w-px bg-white/10" />
          <div>
            <p className="text-white font-semibold text-3xl" style={{ fontFamily: 'Playfair Display, serif' }}>6</p>
            <p className="text-white/30 text-sm tracking-widest uppercase mt-1">Tallas</p>
          </div>
          <div className="w-px bg-white/10" />
          <div>
            <p className="text-white font-semibold text-3xl" style={{ fontFamily: 'Playfair Display, serif' }}>100%</p>
            <p className="text-white/30 text-sm tracking-widest uppercase mt-1">Algodón</p>
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-lg">

          <div className="lg:hidden text-center mb-10">
            <span className="text-[#1e3a5f] font-semibold tracking-[0.2em] text-xl uppercase select-none"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              DRAJB Store
            </span>
          </div>

          <h1 className="text-3xl font-medium text-gray-800 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
            {mode === "login" ? "Bienvenido" : "Crear cuenta"}
          </h1>
          <p className="text-gray-400 text-base mb-10">
            {mode === "login" ? "Ingresa tus datos para continuar" : "Completa el formulario para registrarte"}
          </p>

          <div className="flex gap-8 border-b border-gray-200 mb-10">
            {(["login", "register"] as const).map((m) => (
              <button key={m} onClick={() => { setMode(m); setError(""); }}
                className={`pb-4 text-base tracking-wide transition-all duration-200 border-b-2 -mb-px hover:scale-105 ${
                  mode === m
                    ? "border-[#1e3a5f] text-[#1e3a5f] font-medium"
                    : "border-transparent text-gray-400 hover:text-gray-600"
                }`}>
                {m === "login" ? "Iniciar sesión" : "Registrarse"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {mode === "register" && (
              <>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className={labelClass}>Nombre</label>
                    <input name="firstName" value={form.firstName} onChange={handleChange} required placeholder="Juan" className={inputClass} />
                  </div>
                  <div className="flex-1">
                    <label className={labelClass}>Apellido</label>
                    <input name="lastName" value={form.lastName} onChange={handleChange} required placeholder="Pérez" className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Teléfono</label>
                  <input name="phone" value={form.phone} onChange={handleChange} required placeholder="8888-8888" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Dirección</label>
                  <input name="address" value={form.address} onChange={handleChange} required placeholder="San José, Costa Rica" className={inputClass} />
                </div>
              </>
            )}

            <div>
              <label className={labelClass}>Correo electrónico</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="correo@ejemplo.com" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Contraseña</label>
              <input name="password" type="password" value={form.password} onChange={handleChange} required placeholder="••••••••" className={inputClass} />
            </div>

            {error && (
              <p className="text-red-500 text-sm bg-red-50 border border-red-100 px-4 py-3 rounded-md">{error}</p>
            )}

            <button type="submit" disabled={loading}
              className="mt-2 w-full py-4 bg-[#1e3a5f] hover:bg-[#16304f] text-white text-base font-medium tracking-wider rounded-md transition-all duration-200 hover:shadow-lg hover:shadow-[#1e3a5f]/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? "Cargando..." : mode === "login" ? "Entrar" : "Crear cuenta"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
