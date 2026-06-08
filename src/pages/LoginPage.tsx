import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { login, register } from "../services/Api";

const inputClass = "w-full bg-gray-800/60 border border-white/10 rounded-xl px-5 py-4 text-base text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/70 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200";
const labelClass = "block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2";

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
    <div className="min-h-screen w-full flex overflow-x-hidden">

      {/* Left panel — vibrant gradient */}
      <div className="hidden lg:flex w-5/12 bg-gradient-to-br from-purple-700 via-pink-600 to-orange-500 flex-col justify-between px-16 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(255,255,255,0.04) 60px, rgba(255,255,255,0.04) 61px), repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(255,255,255,0.04) 60px, rgba(255,255,255,0.04) 61px)' }} />

        <div className="relative">
          <span
            className="text-white font-black tracking-[0.22em] text-2xl uppercase select-none"
            style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
            DRAJB Store
          </span>
        </div>

        <div className="relative">
          <h2 className="text-white font-black leading-none mb-6 select-none"
            style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(3rem, 5vw, 5.5rem)', letterSpacing: '0.04em' }}>
            Diseño que<br />
            <span className="text-white/60">te define.</span>
          </h2>
          <p className="text-white/50 text-lg leading-relaxed">
            Encuentra camisetas únicas con diseños que reflejan tu estilo. Calidad y forma en cada prenda.
          </p>
        </div>

        <div className="relative flex gap-10">
          {[
            { num: "+30", label: "Diseños" },
            { num: "6", label: "Tallas" },
            { num: "100%", label: "Algodón" },
          ].map(({ num, label }, i, arr) => (
            <div key={label} className="flex gap-10 items-start">
              <div>
                <p className="text-white font-black text-3xl" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>{num}</p>
                <p className="text-white/40 text-xs tracking-widest uppercase mt-1 font-semibold">{label}</p>
              </div>
              {i < arr.length - 1 && <div className="w-px bg-white/20 self-stretch" />}
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — dark glass form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 md:p-12">
        <div className="w-full max-w-lg bg-gray-900/70 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-black/40">

          <div className="lg:hidden text-center mb-8">
            <span
              className="font-black tracking-[0.22em] text-xl uppercase select-none bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"
              style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              DRAJB Store
            </span>
          </div>

          <h1 className="text-3xl font-black text-white mb-1" style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}>
            {mode === "login" ? "Bienvenido" : "Crear cuenta"}
          </h1>
          <p className="text-gray-400 text-sm mb-8">
            {mode === "login" ? "Ingresa tus datos para continuar" : "Completa el formulario para registrarte"}
          </p>

          {/* Mode toggle */}
          <div className="flex gap-2 mb-8 bg-gray-800/60 rounded-xl p-1">
            {(["login", "register"] as const).map((m) => (
              <button key={m} onClick={() => { setMode(m); setError(""); }}
                className={`flex-1 py-2.5 text-sm font-bold tracking-wide transition-all duration-200 rounded-lg ${
                  mode === m
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30"
                    : "text-gray-500 hover:text-gray-300"
                }`}>
                {m === "login" ? "Iniciar sesión" : "Registrarse"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {mode === "register" && (
              <>
                <div className="flex flex-col sm:flex-row gap-4">
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
              <p className="text-rose-400 text-sm bg-rose-500/10 border border-rose-500/20 px-4 py-3 rounded-xl">{error}</p>
            )}

            <button type="submit" disabled={loading}
              className="mt-2 w-full py-4 min-h-[44px] bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 hover:from-purple-500 hover:via-blue-500 hover:to-cyan-400 text-white text-base font-black tracking-widest rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-purple-500/30 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.12em' }}>
              {loading ? "Cargando..." : mode === "login" ? "Entrar" : "Crear cuenta"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
