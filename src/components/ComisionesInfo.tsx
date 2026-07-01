import { providers } from "../data";
import { Calculator, Percent, Info, ExternalLink, HelpCircle } from "lucide-react";
import BrandLogo from "./BrandLogo";

export default function ComisionesInfo() {
  return (
    <section id="comisiones" className="py-20 relative bg-transparent overflow-hidden transition-colors duration-300">
      {/* Soft emerald/cyan glowing ambient halos */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[550px] h-[350px] bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        
        {/* Header Title Grid */}
        <div className="text-center max-w-md mx-auto mb-10">
          <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 tracking-wider uppercase bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 px-3 py-1.5 rounded-full">
            Estructura & Desglose
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-3">
            ¿Cómo se calculan las comisiones?
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 font-semibold">
            Antes de contratar cualquier terminal, conoce exactamente qué estás pagando en México.
          </p>
        </div>

        {/* Practical Example card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/85 dark:border-slate-800 rounded-3xl p-6 sm:p-8 mb-10 shadow-xl shadow-slate-100/50 dark:shadow-none">
          <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2.5 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            La Ley del Impuesto al Valor Agregado (IVA)
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-350 leading-relaxed mb-6 font-medium">
            Cuando procesas un cobro digital con un agregador fintech o bancario en México, la retención consta de dos factores obligatorios regulados por ley: la tasa contractual del proveedor más el 16% del IVA aplicado exclusivamente al costo de esa tasa (no al total de tu venta).
          </p>

          {/* Desglose en 2 columnas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-4 sm:p-5">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded bg-indigo-50 mb-3 text-indigo-650 shadow-sm">
                <Percent className="w-4 h-4" />
              </span>
              <h4 className="text-sm font-bold text-slate-900">1. Tasa Base contractual</h4>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-semibold">
                Es la tasa fija porcentual que cobra la compañía por el procesamiento electrónico y licencias de la TPV.
              </p>
              <span className="inline-block text-[10px] font-extrabold text-slate-550 bg-slate-100 mt-3 px-2 py-0.5 rounded border border-slate-200">
                Rango promedio: 2.9% — 3.6%
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-4 sm:p-5">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded bg-indigo-50 mb-3 text-indigo-650 shadow-sm">
                <Info className="w-4 h-4" />
              </span>
              <h4 className="text-sm font-bold text-slate-900">2. IVA sobre la Comisión</h4>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-semibold">
                El impuesto IVA (16%) se calcula únicamente sobre la comisión bruta generada, no de la venta total.
              </p>
              <span className="inline-block text-[10px] font-extrabold text-indigo-700 bg-indigo-50 mt-3 px-2 py-0.5 rounded border border-indigo-100">
                Tasa federal: 16% de IVA sobre costo
              </span>
            </div>
          </div>

          {/* Casos prácticos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-indigo-50/10 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30 rounded-2xl p-5 text-left">
              <h4 className="text-xs font-black text-indigo-755 dark:text-indigo-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded bg-indigo-500" />
                Ejemplo A: Comisión Regular (Un solo pago)
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3.5 leading-relaxed">
                Cobro tradicional con tarjeta en una sola exhibición. Supongamos un cargo de <strong>$1,000.00 MXN</strong> con tasa promedio del 3.50%.
              </p>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 font-semibold border-t border-indigo-100/40 dark:border-indigo-900/10 pt-3">
                <li className="flex justify-between border-b border-indigo-50/40 dark:border-indigo-900/10 pb-1.5">
                  <span className="text-slate-600 dark:text-slate-400 font-medium">Comisión base (3.50%):</span>
                  <strong className="text-slate-950 dark:text-white">$35.00 MXN</strong>
                </li>
                <li className="flex justify-between border-b border-indigo-50/40 dark:border-indigo-900/10 pb-1.5">
                  <span className="text-slate-600 dark:text-slate-400 font-medium">IVA de comisión ($35.00 * 0.16):</span>
                  <strong className="text-slate-950 dark:text-white">$5.60 MXN</strong>
                </li>
                <li className="flex justify-between font-bold text-slate-950 dark:text-white pt-1 pb-1">
                  <span>Costo Neto del Servicio:</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">$40.60 MXN</span>
                </li>
                <li className="flex justify-between text-slate-500 dark:text-slate-450 text-[10px] pt-1.5 italic font-bold border-t border-indigo-200/20 dark:border-indigo-800/10">
                  <span>Dinero Neto Depositado:</span>
                  <span className="font-black text-slate-950 dark:text-white bg-emerald-500/10 dark:bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-600 dark:text-emerald-450">$959.40 MXN</span>
                </li>
              </ul>
            </div>

            <div className="bg-indigo-50/10 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30 rounded-2xl p-5 text-left">
              <h4 className="text-xs font-black text-indigo-755 dark:text-indigo-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded bg-amber-500 animate-pulse" />
                Ejemplo B: Tasa con MSI (Diferido a 12 m.)
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3.5 leading-relaxed">
                Cobro diferido a <strong>12 meses</strong>. Supongamos un cargo de <strong>$1,000.00 MXN</strong> (tasa base de 3.50% + sobretasa de financiamiento MSI de 13.50%).
              </p>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 font-semibold border-t border-indigo-100/40 dark:border-indigo-900/10 pt-3">
                <li className="flex justify-between border-b border-indigo-50/40 dark:border-indigo-900/10 pb-1.5">
                  <span className="text-slate-600 dark:text-slate-400 font-medium">Comisión base (3.50%):</span>
                  <strong className="text-slate-950 dark:text-white">$35.00 MXN</strong>
                </li>
                <li className="flex justify-between border-b border-indigo-50/40 dark:border-indigo-900/10 pb-1.5">
                  <span className="text-slate-600 dark:text-slate-400 font-medium">Sobrecomisión MSI (13.50%):</span>
                  <strong className="text-slate-950 dark:text-white">$135.00 MXN</strong>
                </li>
                <li className="flex justify-between border-b border-indigo-50/40 dark:border-indigo-900/10 pb-1.5">
                  <span className="text-slate-600 dark:text-slate-400 font-medium">IVA 16% s/comisiones [($35 + $135) * 0.16]:</span>
                  <strong className="text-slate-950 dark:text-white">$27.20 MXN</strong>
                </li>
                <li className="flex justify-between font-bold text-slate-950 dark:text-white pt-1 pb-1">
                  <span>Costo Neto del Servicio:</span>
                  <span className="text-indigo-650 dark:text-indigo-400 font-extrabold">$197.20 MXN</span>
                </li>
                <li className="flex justify-between text-slate-500 dark:text-slate-450 text-[10px] pt-1.5 italic font-bold border-t border-indigo-200/20 dark:border-indigo-800/10">
                  <span>Dinero Neto Depositado:</span>
                  <span className="font-black text-slate-950 dark:text-white bg-amber-500/10 dark:bg-amber-500/20 px-2 py-0.5 rounded text-amber-600 dark:text-amber-450">$802.80 MXN</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Warning Indicator */}
        <div className="flex items-center gap-2.5 bg-amber-50 border border-amber-200/60 rounded-xl p-4 text-xs text-amber-900 mb-10 leading-relaxed font-semibold shadow-sm">
          <HelpCircle className="w-5 h-5 text-amber-600 shrink-0" />
          <span>
            <strong>Próximas integraciones:</strong> Los proveedores analizados en esta guía corresponden al sector tecnológico no bancario (agregadores). Muy pronto incorporaremos terminales bancarios tradicionales de BBVA, Santander y Banamex.
          </span>
        </div>

        {/* List of analyzed providers */}
        <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          <Percent className="w-4 h-4 text-indigo-650 dark:text-indigo-450" />
          Proveedores analizados de forma transparente (de menor a mayor comisión)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[...providers]
            .sort((a, b) => a.baseRate - b.baseRate)
            .map((p) => {
              const isLowest = p.name === "Ualá Bis";
              return (
                <div 
                  key={p.name}
                  id={`card-info-${p.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-800 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:translate-y-[-2px] shadow-sm shadow-slate-100/50 dark:shadow-none"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-slate-900 dark:text-white font-black text-sm md:text-base flex items-center gap-2.5">
                        <BrandLogo name={p.name} size="sm" />
                        {p.name}
                      </h4>
                      {isLowest && (
                        <span className="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50 animate-pulse">
                          ★ Tasa Más Baja
                        </span>
                      )}
                    </div>

                    {/* Prominent Rate Display Area */}
                    <div className="mb-4 bg-slate-50/70 dark:bg-slate-950/40 rounded-xl p-3 border border-slate-100 dark:border-slate-800/60 flex items-center justify-between shadow-3xs">
                      <div className="flex flex-col">
                        <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
                          Tasa de Cobro
                        </span>
                        <span className="text-xs text-slate-550 dark:text-slate-400 font-bold">
                          Por transacción
                        </span>
                      </div>
                      <div className="text-right">
                        <span className={`text-3xl font-black tracking-tight ${isLowest ? 'text-emerald-600 dark:text-emerald-400' : 'text-indigo-600 dark:text-indigo-400'}`}>
                          {(p.baseRate * 100).toFixed(2)}%
                        </span>
                        <span className="block text-[8px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest mt-0.5">
                          + IVA del costo
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4 font-semibold">
                      {p.description}
                    </p>
                    
                    {/* Bullet points for benefits */}
                    <ul className="space-y-1.5 mt-2 mb-4">
                      {p.benefits.map((b) => (
                        <li key={b} className="text-[11px] text-slate-600 dark:text-slate-300 flex items-center gap-1.5 font-bold">
                          <span className="w-1 h-1 rounded-full bg-indigo-500" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-slate-100 dark:border-slate-800/80 pt-3.5 flex justify-end">
                    <a
                      href={p.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[10px] uppercase font-bold text-slate-400 hover:text-indigo-650 dark:hover:text-indigo-400"
                    >
                      Sitio oficial
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
        </div>

      </div>
    </section>
  );
}
