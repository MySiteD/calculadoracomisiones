import React, { useEffect } from "react";
import { Sparkles, ShieldCheck, Landmark, Smartphone } from "lucide-react";
import { trackNewVisitor } from "../lib/firebase";

export default function Hero() {
  // Track new visitor once on component mount to feed real-time Firestore stats
  useEffect(() => {
    trackNewVisitor();
  }, []);

  return (
    <section 
      id="hero-section"
      className="relative pt-28 pb-6 md:pt-32 md:pb-8 overflow-hidden bg-gradient-to-b from-white to-slate-50/80 dark:from-slate-950 dark:to-slate-950 border-b border-slate-100 dark:border-slate-900 transition-colors duration-300"
    >
      {/* Background soft glowing elements */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[200px] bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-full blur-[90px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[200px] bg-gradient-to-r from-amber-500/5 to-orange-500/5 rounded-full blur-[90px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 md:px-6 max-w-5xl relative text-center">
        
        {/* Minimal category badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50/80 dark:bg-indigo-950/50 border border-indigo-200/60 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-300 text-[11px] font-extrabold uppercase tracking-wider mb-3 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
          <span>Calculadora de Comisiones TPV México 2026 · Fintech & Bancos</span>
        </div>

        {/* High-Conversion Direct Heading */}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight max-w-3xl mx-auto">
          ¿Qué terminal te deja <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-800 dark:from-indigo-400 dark:to-indigo-300">mayor ganancia neta</span> por cada venta?
        </h1>

        {/* Concise Subtitle */}
        <p className="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-semibold">
          Compara en tiempo real cuánto recibes libre de comisión y del <strong>16% de IVA</strong> en <strong>13 terminales</strong> (Clip, Mercado Pago, Ualá Bis, Zettle, SumUp, BBVA, Santander Getnet, Banorte, Citibanamex y HSBC).
        </p>

        {/* Quick Trust Pills */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[11px] font-bold text-slate-500 dark:text-slate-400">
          <span className="inline-flex items-center gap-1.5 bg-white dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-200/70 dark:border-slate-800 shadow-2xs">
            <Smartphone className="w-3.5 h-3.5 text-indigo-500" />
            8 Agregadores Fintech ($0 renta)
          </span>
          <span className="inline-flex items-center gap-1.5 bg-white dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-200/70 dark:border-slate-800 shadow-2xs">
            <Landmark className="w-3.5 h-3.5 text-blue-600" />
            5 Bancos Tradicionales
          </span>
          <span className="inline-flex items-center gap-1.5 bg-white dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-200/70 dark:border-slate-800 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            IVA del 16% y MSI Desglosados
          </span>
        </div>

      </div>
    </section>
  );
}
