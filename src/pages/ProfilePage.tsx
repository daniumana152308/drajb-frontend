import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../config/config";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const inputClass = "w-full bg-white border border-gray-200 rounded-xl px-5 py-4 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed";
const labelClass = "block text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-2";

export default function ProfilePage() {
  const { user, login: setAuth } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: "",
    address: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!form.firstName || !form.lastName || !form.email) { setError("Nombre, apellido y correo son obligatorios."); return; }
    if (!form.password) { setError("Debes ingresar tu contraseña para guardar los cambios."); return; }
    setLoading(true); setError(""); setSuccess("");
    try {
      const res = await fetch(`${API_URL}/clients/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName: form.firstName, lastName: form.lastName, email: form.email, phone: form.phone, address: form.address, password: form.password }),
      });
      if (!res.ok) { const msg = await res.text(); throw new Error(msg || "Error al actualizar"); }
      setAuth({ id: user.id, firstName: form.firstName, lastName: form.lastName, email: form.email });
      setSuccess("Datos actualizados correctamente.");
      setEditing(false);
      setForm({ ...form, password: "" });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error inesperado");
    } finally { setLoading(false); }
  };

  const handleCancel = () => {
    setEditing(false); setError(""); setSuccess("");
    setForm({ firstName: user?.firstName || "", lastName: user?.lastName || "", email: user?.email || "", phone: form.phone, address: form.address, password: "" });
  };

  return (
    <div className="min-h-screen w-full flex flex-col overflow-x-hidden">
      <Navbar />

      <main className="flex-1 w-full flex flex-col px-8 sm:px-12 md:px-16 lg:px-24 py-10 sm:py-12 md:py-16">

        <div className="mb-8 sm:mb-10 text-center">
          <p className="text-orange-500/60 text-xs tracking-[0.3em] uppercase mb-2 font-bold">✦ Cuenta ✦</p>
          <h1 className="text-gray-900 font-black leading-none"
            style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(2.5rem, 7vw, 6rem)', letterSpacing: '0.05em' }}>
            Mi Perfil
          </h1>
        </div>

        <div className="w-full max-w-3xl mx-auto">

          {/* Profile card */}
          <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-orange-500 rounded-2xl p-6 sm:p-8 mb-6 sm:mb-8 flex items-center gap-4 sm:gap-6 relative overflow-hidden shadow-xl shadow-blue-500/20">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.12),transparent_60%)]" />
            <div className="absolute inset-0 opacity-[0.05]"
              style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 30px, white 30px, white 31px), repeating-linear-gradient(90deg, transparent, transparent 30px, white 30px, white 31px)' }} />
            <div className="relative w-16 h-16 rounded-xl bg-white/25 border-2 border-white/40 flex items-center justify-center text-white font-black text-2xl select-none flex-shrink-0"
              style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
            <div className="relative">
              <p className="text-white font-black text-xl" style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}>
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-white/55 text-sm mt-1 font-medium">{user?.email}</p>
            </div>
          </div>

          {success && (
            <div className="text-emerald-700 text-sm bg-emerald-50 border border-emerald-200 px-5 py-4 rounded-xl mb-6 font-semibold">
              ✓ {success}
            </div>
          )}
          {error && (
            <div className="text-red-600 text-sm bg-red-50 border border-red-200 px-5 py-4 rounded-xl mb-6 font-semibold">
              {error}
            </div>
          )}

          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="flex justify-between items-center px-6 sm:px-8 py-5 sm:py-6 border-b border-gray-100">
              <h2 className="text-gray-800 font-black text-base sm:text-lg"
                style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}>
                Datos personales
              </h2>
              {!editing && (
                <button onClick={() => setEditing(true)}
                  className="text-xs text-blue-600 hover:text-blue-700 font-bold tracking-widest uppercase hover:underline underline-offset-4 hover:scale-105 transition-all duration-200 min-h-[44px] flex items-center border border-blue-200 hover:border-blue-400 px-3 rounded-lg hover:bg-blue-50">
                  Editar
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="px-6 sm:px-8 py-6 sm:py-8 flex flex-col gap-5 sm:gap-6">
              <div className="flex flex-col sm:flex-row gap-5">
                <div className="flex-1">
                  <label className={labelClass}>Nombre</label>
                  <input name="firstName" value={form.firstName} onChange={handleChange} disabled={!editing} placeholder="Juan" className={inputClass} />
                </div>
                <div className="flex-1">
                  <label className={labelClass}>Apellido</label>
                  <input name="lastName" value={form.lastName} onChange={handleChange} disabled={!editing} placeholder="Pérez" className={inputClass} />
                </div>
              </div>

              <div>
                <label className={labelClass}>Correo electrónico</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} disabled={!editing} placeholder="correo@ejemplo.com" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Teléfono</label>
                <input name="phone" value={form.phone} onChange={handleChange} disabled={!editing} placeholder="8888-8888" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Dirección</label>
                <input name="address" value={form.address} onChange={handleChange} disabled={!editing} placeholder="San José, Costa Rica" className={inputClass} />
              </div>

              {editing && (
                <div>
                  <label className={labelClass}>
                    Contraseña <span className="text-red-500 normal-case tracking-normal font-medium">(requerida para guardar)</span>
                  </label>
                  <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="••••••••" className={inputClass} />
                </div>
              )}

              {editing && (
                <div className="flex flex-col sm:flex-row gap-4 pt-3 border-t border-gray-100 mt-2">
                  <button type="submit" disabled={loading}
                    className="flex-1 py-4 min-h-[44px] bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-500 hover:to-orange-400 text-white text-sm font-black tracking-widest rounded-xl hover:shadow-lg hover:shadow-blue-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.1em' }}>
                    {loading ? "Guardando..." : "Guardar cambios"}
                  </button>
                  <button type="button" onClick={handleCancel}
                    className="flex-1 py-4 min-h-[44px] border-2 border-gray-200 text-gray-500 text-sm font-bold tracking-widest rounded-xl hover:border-gray-300 hover:text-gray-700 hover:scale-[1.02] transition-all duration-200">
                    Cancelar
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
