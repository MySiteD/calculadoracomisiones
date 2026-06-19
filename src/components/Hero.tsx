import React from "react";
import { Sparkles, ArrowDown, ShieldCheck } from "lucide-react";

export default function Hero() {
  const handleScrollToCalc = (e: React.MouseEvent) => {
    e.preventDefault();
    const doc = document.getElementById("inicio");
    if (doc) {
      const topOffset = doc.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth"
      });
    }
  };

  return (
    <section 
      id="hero-section"
      className="relative pt-36 pb-16 md:pt-44 md:pb-24 overflow-hidden text-center"
    >
      {/* Background radial soft light blobs for depth */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-indigo-500/10 to-blue-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 md:px-6 relative max-w-4xl">
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 dark:bg-indigo-950/40 dark:border-indigo-900/40 text-indigo-700 dark:text-indigo-450 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm pulse-glow">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-500" />
          <span>Simulador & Comparación de Comisiones 2026</span>
        </div>

        {/* Display Typography Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-tight max-w-4xl mx-auto">
          ¿Qué terminal móvil te deja el mayor <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-800 dark:from-indigo-400 dark:to-indigo-300">margen de dinero neto</span>?
        </h1>

        {/* Supporting Subtitle */}
        <p className="mt-6 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Compara al instante las tasas reales de procesamiento bruto, las retenciones por IVA del 16%, y los recargos adicionales por cobros con Meses Sin Intereses (MSI) en México. Toma el control financiero de tu negocio.
        </p>

        {/* Actions Layout */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#inicio"
            onClick={handleScrollToCalc}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs tracking-wider uppercase rounded-xl transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 shadow-lg shadow-indigo-600/15"
          >
            Comenzar Simulación Ahora
            <ArrowDown className="w-4 h-4 text-white" />
          </a>
          <a
            href="#asesor-ai"
            onClick={(e) => {
              e.preventDefault();
              const doc = document.getElementById("asesor-ai");
              if (doc) {
                window.scrollTo({
                  top: doc.getBoundingClientRect().top + window.scrollY - 100,
                  behavior: "smooth"
                });
              }
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs tracking-wider uppercase rounded-xl transition-all duration-300 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:-translate-y-0.5 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 animate-pulse" />
            Asesórate con Inteligencia Artificial
          </a>
        </div>

        {/* Feature indicators */}
        <div className="mt-12 pt-8 border-t border-slate-200/80 dark:border-slate-800/85 max-w-lg mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            Cálculos de ley 100% exactos (con IVA)
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            Tasas de Ley vigentes a 2026
          </span>
        </div>
      </div>
    </section>
  );
}
