import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { login, register } from "../services/Api";

const inputClass = "w-full bg-white/70 border border-gray-200 rounded-xl px-5 py-4 text-base text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200";
const labelClass = "block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 text-center";

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
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-6 sm:px-8 py-12">

      <div className="w-full max-w-md text-center">

        {/* Brand */}
        <div className="mb-8">
          <span
            className="font-extrabold uppercase select-none bg-gradient-to-r from-blue-700 to-orange-500 bg-clip-text text-transparent tracking-widest"
            style={{ fontSize: 'clamp(1.8rem, 6vw, 2.5rem)' }}>
            DRAJB Store
          </span>
          <p className="text-gray-500 text-sm mt-2 font-medium">Diseño que te define.</p>
        </div>

        {/* Stats */}
        <div className="flex justify-center items-center gap-8 mb-8">
          {[
            { num: "+30", label: "Diseños", color: "text-blue-700" },
            { num: "6",   label: "Tallas",  color: "text-orange-500" },
            { num: "100%",label: "Algodón", color: "text-blue-700" },
          ].map(({ num, label, color }, i, arr) => (
            <div key={label} className="flex items-center gap-8">
              <div className="text-center">
                <p className={`font-black text-2xl leading-none ${color}`}>{num}</p>
                <p className="text-gray-400 text-[10px] tracking-widest uppercase mt-1 font-semibold">{label}</p>
              </div>
              {i < arr.length - 1 && <div className="w-px h-8 bg-gray-300" />}
            </div>
          ))}
        </div>

        {/* Glass card */}
        <div className="bg-white/75 backdrop-blur-xl border border-white/80 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-blue-500/10">

          <h1 className="text-2xl font-black text-gray-900 text-center mb-1">
            {mode === "login" ? "Bienvenido" : "Crear cuenta"}
          </h1>
          <p className="text-gray-400 text-sm text-center mb-7 font-medium">
            {mode === "login" ? "Ingresa tus datos para continuar" : "Completa el formulario para registrarte"}
          </p>

          {/* Mode toggle */}
          <div className="flex gap-2 mb-7 bg-gray-100/80 rounded-xl p-1">
            {(["login", "register"] as const).map((m) => (
              <button key={m} onClick={() => { setMode(m); setError(""); }}
                className={`flex-1 py-2.5 text-sm font-bold tracking-wide transition-all duration-200 rounded-lg ${
                  mode === m
                    ? "bg-gradient-to-r from-blue-600 to-orange-500 text-white shadow-md shadow-blue-500/25"
                    : "text-gray-500 hover:text-gray-700"
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
              <p className="text-red-600 text-sm bg-red-50 border border-red-200 px-4 py-3 rounded-xl text-center font-medium">{error}</p>
            )}

            <button type="submit" disabled={loading}
              className="mt-2 w-full py-4 min-h-[44px] bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-500 hover:to-orange-400 text-white text-base font-extrabold tracking-wide rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/25 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? "Cargando..." : mode === "login" ? "Entrar" : "Crear cuenta"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
