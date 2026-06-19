import { Facebook, Video, Youtube, Mail } from "lucide-react";

export default function Footer() {
  const socialLinks = [
    { name: "Facebook", href: "https://www.facebook.com/share/1aBs1jun2w/", icon: Facebook, color: "hover:text-[#1877F2] hover:border-[#1877F2]/30 hover:bg-[#1877F2]/5" },
    { name: "TikTok", href: "https://www.tiktok.com/@cajadeherramientasymas", icon: Video, color: "hover:text-[#25F4EE] hover:border-[#25F4EE]/30 hover:bg-[#25F4EE]/5" },
    { name: "Gmail", href: "mailto:cajadeherramientasymas@gmail.com", icon: Mail, color: "hover:text-[#EA4335] hover:border-[#EA4335]/30 hover:bg-[#EA4335]/5" },
    { name: "YouTube", href: "http://www.youtube.com/@cajadeherramientasymas", icon: Youtube, color: "hover:text-[#FF0000] hover:border-red-500/30 hover:bg-red-500/5" },
  ];

  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 md:py-16 font-sans">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        
        {/* Footers grids */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-900 pb-8 mb-8 text-center md:text-left">
          
          {/* Brand block */}
          <div className="space-y-2">
            <h4 className="text-white font-extrabold text-md tracking-tight flex items-center justify-center md:justify-start gap-2">
              Caja de Herramientas y Más
            </h4>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed font-semibold">
              Soluciones de análisis financiero y de comisiones para emprendedores y comercios independientes en México.
            </p>
          </div>

          {/* Social block links */}
          <div className="flex items-center gap-4 flex-wrap justify-center font-bold">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 text-slate-300 text-xs px-3.5 py-2 rounded-xl bg-slate-900/60 border border-slate-800 transition-all duration-300 shadow-sm ${link.color}`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {link.name}
                </a>
              );
            })}
          </div>

        </div>

        {/* Licensing / Credit limits */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-slate-500 font-extrabold tracking-wide uppercase">
          <div className="flex items-center gap-1.5 font-bold">
            <span>🇲🇽 Hecho en México</span>
            <span>·</span>
            <span>Proyecto Independiente</span>
          </div>
          
          <p>© 2026 — Caja de Herramientas y Más. Todos los derechos reservados.</p>
        </div>

      </div>
    </footer>
  );
}
