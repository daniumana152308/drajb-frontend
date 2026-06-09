export default function Footer() {
    return (
        <footer className="bg-blue-950 border-t border-blue-900 mt-auto">
            <div className="w-full px-8 md:px-16 lg:px-24 py-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">

                    <div>
                        <span
                            className="font-black tracking-[0.22em] text-base uppercase select-none bg-gradient-to-r from-blue-300 to-orange-400 bg-clip-text text-transparent"
                            style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                            DRAJB Store
                        </span>
                        <p className="text-blue-200/30 text-xs mt-1 tracking-wide">Camisetas con diseño único.</p>
                    </div>

                    <div className="flex items-center gap-6 sm:gap-8">
                        {[
                            { label: "Facebook", href: "https://facebook.com", color: "hover:text-blue-400" },
                            { label: "Instagram", href: "https://instagram.com", color: "hover:text-pink-400" },
                            { label: "Twitter", href: "https://twitter.com", color: "hover:text-sky-400" },
                        ].map(({ label, href, color }) => (
                            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                                className={`text-blue-200/25 ${color} text-sm tracking-widest uppercase font-semibold transition-all duration-200 hover:scale-110 min-h-[44px] flex items-center`}>
                                {label}
                            </a>
                        ))}
                    </div>

                    <p className="text-blue-200/20 text-xs tracking-wide">
                        © 2026 Aplicación Web. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}
