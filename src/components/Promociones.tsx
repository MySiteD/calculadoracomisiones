import { promotions } from "../data";
import { ExternalLink, ShieldAlert, BadgeCheck } from "lucide-react";
import BrandLogo from "./BrandLogo";

export default function Promociones() {
  return (
    <section id="promociones" className="py-24 bg-white dark:bg-slate-900/35 border-y border-slate-100/80 dark:border-slate-900/40 rounded-[3rem] shadow-sm relative overflow-hidden z-10 transition-colors duration-300">
      {/* Warm Golden Coupon Glowing ambient halos */}
      <div className="absolute top-1/4 right-10 w-[400px] h-[400px] bg-amber-500/5 dark:bg-amber-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-10 w-[400px] h-[400px] bg-orange-500/5 dark:bg-orange-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        
        {/* Header Title Section */}
        <div className="text-center max-w-sm mx-auto mb-10">
          <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 tracking-wider uppercase bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 px-3 py-1.5 rounded-full">
            Beneficios activos
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-3">
            Promociones Vigentes
          </h2>
          <p className="text-xs text-slate-505 dark:text-slate-400 mt-1.5 font-semibold">
            Ahorros inmediatos en lectores del consorcio fintech más reconocido de México.
          </p>
        </div>

        {/* Disclaimer card */}
        <div className="flex items-start gap-2.5 bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-100/80 dark:border-indigo-900/30 rounded-xl p-4 mb-8 text-[11px] text-indigo-900 dark:text-indigo-300 leading-relaxed font-semibold shadow-sm">
          <BadgeCheck className="w-4.5 h-4.5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
          <span>
            Las ofertas promocionales son auditadas e implementadas de forma autónoma por los respectivos corporativos oficiales. Los enlaces de referido adjuntos heredan estos beneficios en automático.
          </span>
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {promotions.map((promo) => (
            <div 
              key={promo.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700/80 rounded-3xl p-5 flex flex-col justify-between transition-all duration-300 hover:translate-y-[-2px] shadow-sm shadow-slate-105/50"
            >
              <div>
                <div className="flex items-center gap-2 mb-3.5 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <BrandLogo name={promo.name} size="sm" />
                  <h4 className="text-slate-900 dark:text-white font-extrabold text-xs sm:text-sm">{promo.name}</h4>
                </div>
                
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4 font-semibold">
                  {promo.description}
                </p>
              </div>

              <div>
                <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold mb-3 uppercase tracking-wide">
                  Estatus: <span className="text-indigo-600 dark:text-indigo-400 font-black">{promo.duration}</span>
                </div>
                <a
                  href={promo.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 font-extrabold text-xs py-2.5 px-3 rounded-xl transition-colors cursor-pointer"
                >
                  Ver promoción
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 dark:text-slate-550" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Sponsor/Affiliate warnings */}
        <div className="flex items-start gap-2.5 bg-amber-50 dark:bg-amber-950/15 border border-amber-202/60 dark:border-amber-900/30 rounded-xl p-4 mt-8 text-[11px] text-amber-950 dark:text-amber-400 leading-relaxed font-semibold shadow-sm">
          <ShieldAlert className="w-4.5 h-4.5 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
          <span>
            <strong>Divulgación de Afiliación comercial:</strong> Algunos de los accesos pueden heredar una pequeña afiliación comercial que apoya a mantener el soporte del canal gratuito sin representar jamás un incremento tarifario o recargo extra para ti.
          </span>
        </div>

      </div>
    </section>
  );
}
