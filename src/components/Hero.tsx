import React, { useEffect } from "react";
import { Sparkles, ArrowDown, ShieldCheck } from "lucide-react";
import { trackNewVisitor } from "../lib/firebase";
import heroIllustration from "../assets/images/hero_fintech_illustration_1782762122022.jpg";

export default function Hero() {
  // Track new visitor once on component mount to feed real-time Firestore stats
  useEffect(() => {
    trackNewVisitor();
  }, []);

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
      className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900 transition-colors duration-300"
    >
      {/* Background soft glowing elements */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[250px] bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[250px] bg-gradient-to-r from-amber-500/5 to-orange-500/5 rounded-full blur-[110px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 md:px-6 max-w-6xl relative">
        
        {/* Split Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-center lg:text-left">
          
          {/* Left Column: Headline and Call to Actions */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start">
            
            {/* Google-like minimal category badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
              <span>Simulador & Comparador Financiero 2026</span>
            </div>

            {/* Google-inspired Clean Typography Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
              ¿Qué terminal móvil te deja <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-800 dark:from-indigo-400 dark:to-indigo-300">mayor dinero neto</span>?
            </h1>

            {/* Descriptive Subtitle */}
            <p className="mt-6 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed font-semibold">
              Compara al instante las tasas de procesamiento de los proveedores líderes de México. Calcula deducciones de IVA del 16% y recargos por Meses Sin Intereses (MSI) para retener el control completo de tu caja.
            </p>

            {/* Actions Panel */}
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <a
                href="#inicio"
                onClick={handleScrollToCalc}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs tracking-wider uppercase rounded-2xl transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 shadow-md hover:shadow-lg shadow-indigo-600/10 cursor-pointer"
              >
                Iniciar Simulación
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
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs tracking-wider uppercase rounded-2xl transition-all duration-300 hover:bg-slate-50 dark:hover:bg-slate-850 hover:-translate-y-0.5 shadow-sm cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                Asesoría Inteligente IA
              </a>
            </div>

            {/* Legal / Compliance elements */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-xs font-semibold text-slate-500 dark:text-slate-450">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-indigo-500" />
                Cálculos exactos con IVA e ISR
              </span>
              <span className="hidden sm:inline text-slate-300 dark:text-slate-700">|</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-indigo-500" />
                Tasas de ley actualizadas a 2026
              </span>
            </div>

          </div>

          {/* Right Column: Google Product Style Illustration */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md lg:max-w-none p-2 bg-gradient-to-tr from-slate-100 to-indigo-50 dark:from-slate-900 dark:to-indigo-950/20 rounded-[2.5rem] border border-slate-200/60 dark:border-slate-800 shadow-xl overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-[40px] pointer-events-none" />
              <img
                src={heroIllustration}
                alt="Fintech Terminales de Pago Inteligentes México"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover rounded-[2.2rem] transform group-hover:scale-[1.02] transition-transform duration-700 select-none pointer-events-none"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
