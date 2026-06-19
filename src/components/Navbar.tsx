import React, { useState, useEffect } from "react";
import { Menu, X, Landmark, Compass, Award, Tag, Sparkles, HelpCircle, Sun, Moon } from "lucide-react";

interface NavbarProps {
  activeSection: string;
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export default function Navbar({ activeSection, theme, toggleTheme }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "inicio", label: "Calculadora", icon: Compass },
    { id: "asesor-ai", label: "Consultor IA", icon: Sparkles },
    { id: "comisiones", label: "Comisiones", icon: Landmark },
    { id: "promociones", label: "Promociones", icon: Tag },
    { id: "referidos", label: "Recursos recomendados", icon: Award },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const doc = document.getElementById(targetId);
    if (doc) {
      const topOffset = doc.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth"
      });
    }
    setIsOpen(false);
  };

  return (
    <header 
      id="main-header"
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl rounded-2xl z-50 transition-all duration-300 border ${
        isScrolled 
          ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-slate-200/80 dark:border-slate-800/80 shadow-[0_15px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_15px_30px_rgba(0,0,0,0.3)] py-3" 
          : "bg-white/65 dark:bg-slate-900/65 backdrop-blur-sm border-slate-200/40 dark:border-slate-800/40 py-4 shadow-sm"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#inicio" 
          onClick={(e) => handleLinkClick(e, "inicio")}
          className="flex items-center gap-2.5 group"
          id="nav-logo"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-indigo-700 p-0.5 shadow-md shadow-indigo-500/10 transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-white dark:bg-slate-950 rounded-[10px] flex items-center justify-center text-xs font-black text-indigo-600 dark:text-indigo-400">
              C
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-sm md:text-base text-slate-900 dark:text-slate-100 tracking-tight leading-none">
              Caja de Herramientas
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-none mt-1 font-medium">
              y más · Control Financiero
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1.5" id="desktop-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleLinkClick(e, item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 ${
                  isActive 
                    ? "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 dark:text-indigo-400 border border-indigo-100/80 dark:border-indigo-900/50" 
                    : "text-slate-600 dark:text-slate-300 border border-transparent hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100/50 dark:hover:bg-slate-800/40"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-450 dark:text-slate-400'}`} />
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Floating Contact/CTA + Theme Toggle */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle Button */}
          <button
            type="button"
            id="toggle-theme-btn"
            onClick={toggleTheme}
            className="p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-705 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-amber-400 transition-all bg-slate-50/50 hover:bg-slate-100 dark:bg-slate-950/60 hover:dark:bg-slate-950 cursor-pointer select-none"
            title={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
          >
            {theme === "dark" ? (
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-slate-600" />
            )}
          </button>

          <a 
            href="#referidos" 
            onClick={(e) => handleLinkClick(e, "referidos")}
            className="hidden md:inline-flex items-center gap-1.5 bg-indigo-600 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-all duration-300 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/15 active:scale-95 shadow-sm"
            id="cta-nav-button"
          >
            <Award className="w-3.5 h-3.5" />
            Ver Descuentos
          </a>

          {/* Mobile menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 lg:hidden transition-colors cursor-pointer"
            aria-label="Toggle Menu"
            id="mobile-menu-toggle"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <div 
        id="mobile-nav-menu"
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-[385px] opacity-100 border-t border-slate-200 dark:border-slate-800 mt-3 pt-3 bg-white dark:bg-slate-900" : "max-h-0 opacity-0 pointer-events-none mt-0"
        }`}
      >
        <div className="px-4 py-2 flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleLinkClick(e, item.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  isActive 
                    ? "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 dark:text-indigo-400" 
                    : "text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800/40"
                }`}
              >
                <Icon className="w-4 h-4 text-slate-450 dark:text-slate-400" />
                {item.label}
              </a>
            );
          })}
          <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <a
              href="#referidos"
              onClick={(e) => handleLinkClick(e, "referidos")}
              className="flex items-center justify-center gap-2 w-full bg-indigo-600 text-white font-bold py-2.5 rounded-xl text-xs"
            >
              <Award className="w-4 h-4" />
              Ver Enlaces de Descuento
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
