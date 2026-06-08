export default function Footer() {
    return (
        <footer className="bg-[#1e3a5f] mt-auto">
            <div className="w-full px-8 md:px-16 lg:px-24 py-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">

                    <div>
                        <span className="text-white font-semibold tracking-[0.15em] text-base uppercase select-none"
                            style={{ fontFamily: 'Playfair Display, serif' }}>
                            DRAJB Store
                        </span>
                        <p className="text-white/30 text-xs mt-1 tracking-wide">Camisetas con diseño.</p>
                    </div>

                    <div className="flex items-center gap-6 sm:gap-8">
                        {[
                            { label: "Facebook", href: "https://facebook.com" },
                            { label: "Instagram", href: "https://instagram.com" },
                            { label: "Twitter", href: "https://twitter.com" },
                        ].map(({ label, href }) => (
                            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                                className="text-white/30 hover:text-white text-sm tracking-widest uppercase transition-all duration-200 hover:scale-110 min-h-[44px] flex items-center">
                                {label}
                            </a>
                        ))}
                    </div>

                    <p className="text-white/25 text-xs tracking-wide text-center">
                        © 2026 Aplicación Web. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}