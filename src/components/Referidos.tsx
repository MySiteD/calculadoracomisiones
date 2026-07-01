import React, { useState } from "react";
import { referidos } from "../data";
import { trackReferralClick } from "../utils/analytics";
import BrandLogo from "./BrandLogo";
import { 
  Award, 
  Smartphone, 
  CreditCard, 
  ShieldCheck, 
  Wallet, 
  CheckCircle2, 
  ExternalLink,
  Layers,
  Heart,
  Coins
} from "lucide-react";

// Helper component to resolve Lucide Icons dynamically
const DynamicIcon = ({ name, color }: { name: string; color: string }) => {
  const props = { className: "w-5 h-5", style: { color } };
  switch (name) {
    case "Smartphone":
      return <Smartphone {...props} />;
    case "CreditCard":
      return <CreditCard {...props} />;
    case "ShieldCheck":
      return <ShieldCheck {...props} />;
    case "Award":
      return <Award {...props} />;
    case "Wallet":
      return <Wallet {...props} />;
    case "Coins":
      return <Coins {...props} />;
    default:
      return <Layers {...props} />;
  }
};

export default function Referidos() {
  const [activeTab, setActiveTab] = useState<"all" | "terminal" | "cuenta" | "prestamo">("all");

  const filteredLinks = referidos.filter(
    (item) => activeTab === "all" || item.category === activeTab
  );

  return (
    <section id="referidos" className="py-20 relative bg-transparent font-sans overflow-hidden transition-colors duration-300">
      {/* Royal Indigo/Purple Referral Glowing ambient halos */}
      <div className="absolute top-1/3 left-1/3 w-[550px] h-[550px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[110px] pointer-events-none -z-10" />
      
      <div className="container mx-auto px-4 md:px-6 max-w-4xl relative">
        
        {/* Header content section */}
        <div className="text-center max-w-lg mx-auto mb-10">
          <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-700 tracking-wider uppercase bg-indigo-50 border border-indigo-100/80 px-3 py-1.5 rounded-full shadow-sm">
            <Award className="w-3 h-3 text-indigo-600 animate-bounce" />
            Recursos aliados & recomendados
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-3">
            Herramientas Recomendadas para tu Negocio
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 font-semibold">
            Accesos directos y seleccionados para equipar tu comercio con tasas de descuento y bonos de bienvenida exclusivos.
          </p>
        </div>

        {/* Immersive Main Promo Alert Hero Row */}
        <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border border-slate-800/80 rounded-3xl p-6 sm:p-8 md:p-10 mb-12 text-white shadow-xl shadow-indigo-950/20 relative overflow-hidden">
          {/* Subtle decorative glowing mesh */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-[60px] pointer-events-none" />
          
          <div className="relative max-w-3xl">
            <span className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full mb-3.5">
              🎁 BENEFICIO DIRECTO COMERCIANTE [MÉXICO]
            </span>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight tracking-tight mb-3">
              Consigue Tasas Preferenciales y Bonos oficiales de Bienvenida
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-semibold mb-6">
              Hemos seleccionado y verificado accesos directos exclusivos con los proveedores financieros más seguros de México. Al registrarte o comprar con estos enlaces de recomendados, recibes de forma directa el <strong className="text-indigo-200">menor precio del mercado</strong> en terminales de cobro y apertura de cuentas de ahorro seguras.
            </p>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-slate-900/40 border border-slate-800/85 p-5 rounded-2xl">
              <span className="text-2xl shrink-0 select-none animate-pulse">🎉</span>
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-indigo-300 uppercase tracking-wider">¿Cómo activar los beneficios?</p>
                <p className="text-xs text-slate-400 leading-relaxed font-semibold">
                  Haz clic en cualquiera de los botones de abajo. Al registrarte o adquirir a través de los enlaces, el sistema aplicará automáticamente tu descuento o bono oficial.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab filters layout */}
        <div className="flex justify-center items-center gap-1.5 mb-10 overflow-x-auto pb-2 custom-scrollbar font-bold">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 text-xs font-bold tracking-wide transition-all border whitespace-nowrap rounded-xl cursor-pointer ${
              activeTab === "all"
                ? "bg-indigo-600 border-indigo-600 text-white font-extrabold shadow-md shadow-indigo-500/10"
                : "bg-slate-50 border-slate-205/60 text-slate-500 hover:text-slate-800 hover:bg-slate-100/50"
            }`}
          >
            Todas las Opciones
          </button>
          
          <button
            onClick={() => setActiveTab("terminal")}
            className={`px-4 py-2 text-xs font-bold tracking-wide transition-all border whitespace-nowrap rounded-xl cursor-pointer ${
              activeTab === "terminal"
                ? "bg-indigo-600 border-indigo-600 text-white font-extrabold shadow-md shadow-indigo-500/10"
                : "bg-slate-50 border-slate-205/60 text-slate-500 hover:text-slate-800 hover:bg-slate-100/50"
            }`}
          >
            Terminales de Pago (TPV)
          </button>
          
          <button
            onClick={() => setActiveTab("cuenta")}
            className={`px-4 py-2 text-xs font-bold tracking-wide transition-all border whitespace-nowrap rounded-xl cursor-pointer ${
              activeTab === "cuenta"
                ? "bg-indigo-600 border-indigo-600 text-white font-extrabold shadow-md shadow-indigo-500/10"
                : "bg-slate-50 border-slate-205/60 text-slate-500 hover:text-slate-800 hover:bg-slate-100/50"
            }`}
          >
            Tarjetas & Cuentas Ahorro
          </button>

          <button
            onClick={() => setActiveTab("prestamo")}
            className={`px-4 py-2 text-xs font-bold tracking-wide transition-all border whitespace-nowrap rounded-xl cursor-pointer ${
              activeTab === "prestamo"
                ? "bg-indigo-600 border-indigo-600 text-white font-extrabold shadow-md shadow-indigo-500/10"
                : "bg-slate-50 border-slate-205/60 text-slate-500 hover:text-slate-800 hover:bg-slate-100/50"
            }`}
          >
            Préstamos de Efectivo
          </button>
        </div>

         {/* Grid links list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filteredLinks.map((item) => {
            const isHighlight = item.id === "mp-terminal" || item.id === "nu-cuenta";
            return (
              <div
                key={item.id}
                id={`referral-card-${item.id}`}
                className={`bg-white dark:bg-slate-900 border rounded-[2rem] p-6 flex flex-col justify-between transition-all duration-350 hover:translate-y-[-4px] relative overflow-hidden group ${
                  isHighlight 
                    ? "border-indigo-200 dark:border-indigo-900 shadow-md hover:shadow-xl hover:shadow-indigo-500/5 dark:shadow-none" 
                    : "border-slate-200/90 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm hover:shadow-md dark:shadow-none"
                }`}
              >
                {/* Visual Accent for Highlighted Cards */}
                {isHighlight && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white text-[9px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-bl-2xl shadow-sm animate-pulse">
                    🔥 Recomendado
                  </div>
                )}

                <div>
                  {/* Brand Header */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <BrandLogo name={item.provider} size="lg" className="group-hover:scale-105 transition-transform duration-300" />
                      <div>
                        <h4 className="text-slate-900 dark:text-white font-extrabold text-sm md:text-base leading-snug tracking-tight">
                          {item.name}
                        </h4>
                        <span className="text-[10px] text-slate-450 dark:text-slate-500 font-bold block mt-0.5">
                          {item.provider}
                        </span>
                      </div>
                    </div>
                    
                    {!isHighlight && (
                      <span className={`text-[9px] uppercase font-black tracking-wider px-2.5 py-1 rounded-lg border ${
                        item.category === "terminal"
                          ? "bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 border-sky-100 dark:border-sky-900/30"
                          : item.category === "prestamo"
                          ? "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-100/60 dark:border-amber-900/40"
                          : "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-indigo-100/60 dark:border-indigo-900/40"
                      }`}>
                        {item.category === "terminal" ? "Terminal TPV" : item.category === "prestamo" ? "Efectivo" : "Ahorro/Crédito"}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-5 font-semibold">
                    {item.description}
                  </p>

                  {/* Benefits lists with Google Bullet Style */}
                  <ul className="mb-6 space-y-2 border-t border-slate-100/70 dark:border-slate-800/60 pt-4">
                    {item.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2 text-[11px] text-slate-600 dark:text-slate-350 font-bold leading-normal">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="border-t border-slate-100/80 dark:border-slate-800/80 pt-4 mt-auto">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackReferralClick(item.id, item.name, item.link)}
                    className="w-full inline-flex items-center justify-center gap-1.5 font-extrabold text-xs py-3 px-4 rounded-xl transition-all duration-300 cursor-pointer text-center group/btn bg-slate-900 dark:bg-slate-800 text-white hover:bg-indigo-600 dark:hover:bg-indigo-650 hover:shadow-md hover:shadow-indigo-500/10"
                  >
                    Obtener Beneficio Especial
                    <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Support Callout banner */}
        <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-3xl p-5 mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-sm">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-500 dark:text-rose-400 flex items-center justify-center shrink-0 shadow-sm border border-rose-100 dark:border-rose-900/30">
              <Heart className="w-5 h-5 text-rose-500 animate-pulse" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold bg-clip-text text-slate-900 dark:text-white">Apoya la sostenibilidad de Caja de Herramientas</h4>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 max-w-sm leading-relaxed font-semibold">
                Utilizar estos enlaces no incrementa cargos de contratación para ti y nos ayuda a mantener el soporte gratuito y auditorías estables.
              </p>
            </div>
          </div>
          
          <button 
            onClick={() => {
              const doc = document.getElementById("main-header");
              if (doc) window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
            }}
            className="text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
          >
            Saber más ↓
          </button>
        </div>

      </div>
    </section>
  );
}
