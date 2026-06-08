import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../config/config";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const inputClass = "w-full bg-white border border-gray-200 rounded-md px-5 py-4 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:border-[#1e3a5f] focus:ring-1 focus:ring-[#1e3a5f]/10 transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed";
const labelClass = "block text-xs font-medium text-gray-400 uppercase tracking-[0.2em] mb-2";

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
    <div className="min-h-screen w-full bg-[#f7f7f5] flex flex-col overflow-x-hidden">
      <Navbar />

      <main className="flex-1 w-full flex flex-col px-6 sm:px-8 md:px-16 lg:px-24 py-10 sm:py-12 md:py-16">

        <div className="mb-8 sm:mb-10">
          <p className="text-xs text-gray-400 tracking-[0.25em] uppercase mb-2">Cuenta</p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-gray-800" style={{ fontFamily: 'Playfair Display, serif' }}>
            Mi Perfil
          </h1>
        </div>

        <div className="w-full max-w-3xl">

          <div className="bg-[#1e3a5f] rounded-lg p-6 sm:p-8 mb-6 sm:mb-8 flex items-center gap-4 sm:gap-6">
            <div className="w-16 h-16 rounded-md bg-white/10 border border-white/20 flex items-center justify-center text-white font-semibold text-2xl select-none flex-shrink-0"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
            <div>
              <p className="text-white font-medium text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-white/40 text-sm mt-1">{user?.email}</p>
            </div>
          </div>

          {success && (
            <div className="text-green-700 text-sm bg-green-50 border border-green-100 px-5 py-4 rounded-md mb-6">
              {success}
            </div>
          )}
          {error && (
            <div className="text-red-500 text-sm bg-red-50 border border-red-100 px-5 py-4 rounded-md mb-6">
              {error}
            </div>
          )}

          <div className="bg-white border border-gray-100 rounded-lg overflow-hidden">
            <div className="flex justify-between items-center px-6 sm:px-8 py-5 sm:py-6 border-b border-gray-100">
              <h2 className="text-gray-700 font-medium text-base sm:text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>Datos personales</h2>
              {!editing && (
                <button onClick={() => setEditing(true)}
                  className="text-xs text-[#1e3a5f] font-medium tracking-widest uppercase hover:underline underline-offset-4 hover:scale-105 transition-all duration-200 min-h-[44px] flex items-center">
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
                    Contraseña <span className="text-red-400 normal-case tracking-normal">(requerida para guardar)</span>
                  </label>
                  <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="••••••••" className={inputClass} />
                </div>
              )}

              {editing && (
                <div className="flex flex-col sm:flex-row gap-4 pt-3 border-t border-gray-100 mt-2">
                  <button type="submit" disabled={loading}
                    className="flex-1 py-4 min-h-[44px] bg-[#1e3a5f] text-white text-sm font-medium tracking-wide rounded-md hover:bg-[#16304f] hover:shadow-lg hover:shadow-[#1e3a5f]/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                    {loading ? "Guardando..." : "Guardar cambios"}
                  </button>
                  <button type="button" onClick={handleCancel}
                    className="flex-1 py-4 min-h-[44px] border border-gray-200 text-gray-400 text-sm tracking-wide rounded-md hover:border-gray-300 hover:text-gray-600 hover:scale-[1.02] transition-all duration-200">
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