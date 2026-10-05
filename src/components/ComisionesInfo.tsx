import React, { useState } from "react";
import { providers } from "../data";
import { Calculator, Percent, Info, ExternalLink, Landmark, Smartphone, Clock, Coins, ShieldCheck, AlertCircle } from "lucide-react";
import BrandLogo from "./BrandLogo";
import { Provider } from "../types";

export default function ComisionesInfo() {
  const [activeTab, setActiveTab] = useState<"all" | "fintech" | "banco">("all");

  const fintechProviders = [...providers]
    .filter((p) => p.category === "fintech")
    .sort((a, b) => a.baseRate - b.baseRate);

  const bankProviders = [...providers]
    .filter((p) => p.category === "banco")
    .sort((a, b) => a.baseRate - b.baseRate);

  const renderProviderCard = (p: Provider, isLowestInGroup: boolean) => {
    const isBank = p.category === "banco";
    return (
      <div 
        key={p.name}
        id={`card-info-${p.name.toLowerCase().replace(/\s+/g, '-')}`}
        className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-800 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:translate-y-[-2px] shadow-sm shadow-slate-100/50 dark:shadow-none"
      >
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <h4 className="text-slate-900 dark:text-white font-black text-sm md:text-base flex items-center gap-2.5">
              <BrandLogo name={p.name} size="sm" />
              <span>{p.name}</span>
            </h4>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                isBank 
                  ? "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/50" 
                  : "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/50"
              }`}>
                {isBank ? "TPV Bancaria" : "Fintech"}
              </span>
              {isLowestInGroup && (
                <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50">
                  ★ Menor Tasa
                </span>
              )}
            </div>
          </div>

          {/* Prominent Rate Display Area */}
          <div className="mb-4 bg-slate-50/70 dark:bg-slate-950/40 rounded-xl p-3.5 border border-slate-100 dark:border-slate-800/60 shadow-3xs">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
                  {isBank ? "Tasa Promedio / Pyme" : "Comisión Base Estándar"}
                </span>
                <span className="text-[11px] text-slate-600 dark:text-slate-300 font-extrabold mt-0.5">
                  {p.effectiveRateText || `${(p.baseRate * 1.16 * 100).toFixed(2)}% efectiva con IVA`}
                </span>
              </div>
              <div className="text-right shrink-0">
                <span className={`text-2xl sm:text-3xl font-black tracking-tight ${isLowestInGroup ? 'text-emerald-600 dark:text-emerald-400' : 'text-indigo-600 dark:text-indigo-400'}`}>
                  {(p.baseRate * 100).toFixed(2)}%
                </span>
                <span className="block text-[8px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest mt-0.5">
                  + 16% IVA
                </span>
              </div>
            </div>

            {p.rateRangeText && (
              <div className="mt-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-800/60 text-[10px] font-bold text-slate-600 dark:text-slate-350">
                <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">Esquema de tasas: </span>
                {p.rateRangeText}
              </div>
            )}
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4 font-semibold">
            {p.description}
          </p>

          {/* Key Operational Metadata Pills */}
          <div className="space-y-2 mb-4 bg-slate-50/40 dark:bg-slate-950/25 rounded-xl p-3 border border-slate-100 dark:border-slate-800/50 text-[11px]">
            {p.monthlyRentText && (
              <div className="flex items-start gap-2">
                <Coins className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold text-slate-700 dark:text-slate-200">Renta / Costo Fijo: </span>
                  <span className="text-slate-600 dark:text-slate-400 font-semibold">{p.monthlyRentText}</span>
                </div>
              </div>
            )}
            {p.depositTimeText && (
              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold text-slate-700 dark:text-slate-200">Tiempo de depósito: </span>
                  <span className="text-slate-600 dark:text-slate-400 font-semibold">{p.depositTimeText}</span>
                </div>
              </div>
            )}
            {p.minVolumeText && (
              <div className="flex items-start gap-2">
                <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold text-slate-700 dark:text-slate-200">Facturación mínima / Condiciones: </span>
                  <span className="text-slate-600 dark:text-slate-400 font-semibold">{p.minVolumeText}</span>
                </div>
              </div>
            )}
            {p.msiDetailsText && (
              <div className="flex items-start gap-2">
                <Percent className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold text-slate-700 dark:text-slate-200">Meses Sin Intereses (MSI): </span>
                  <span className="text-slate-600 dark:text-slate-400 font-semibold">{p.msiDetailsText}</span>
                </div>
              </div>
            )}
          </div>
          
          {/* Bullet points for benefits */}
          <ul className="space-y-1.5 mt-2 mb-4">
            {p.benefits.map((b) => (
              <li key={b} className="text-[11px] text-slate-600 dark:text-slate-300 flex items-center gap-1.5 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-slate-100 dark:border-slate-800/80 pt-3.5 flex justify-between items-center">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
            {isBank ? "Requiere cuenta empresarial" : "Sin renta mensual forzosa"}
          </span>
          <a
            href={p.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[10px] uppercase font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Sitio oficial
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    );
  };

  return (
    <section id="comisiones" className="py-20 relative bg-transparent overflow-hidden transition-colors duration-300">
      {/* Soft emerald/cyan glowing ambient halos */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[550px] h-[350px] bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        
        {/* Header Title Grid */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 tracking-wider uppercase bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 px-3 py-1.5 rounded-full">
            Estructura & Desglose Oficial en México
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-3">
            Comisiones de Terminales Punto de Venta (TPV)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 font-semibold leading-relaxed">
            Las comisiones en México se dividen en dos esquemas principales: <strong>Agregadores (Fintech / No bancarias)</strong> y <strong>Terminales Bancarias Tradicionales</strong>. Conoce exactamente qué estás pagando antes de contratar.
          </p>
        </div>

        {/* Comparison of the 2 schemes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          <div className="bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-900/40 rounded-3xl p-6 shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Esquema 1</span>
                <h3 className="text-base font-black text-slate-900 dark:text-white">Terminales No Bancarias (Agregadores Fintech)</h3>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed font-semibold mb-3">
              No requieren contratación de cuenta empresarial formal, ni cuotas de ventas mínimas, ni renta mensual ($0 MXN). Su modelo se basa en un costo por transacción fija y la compra previa del equipo.
            </p>
            <div className="flex flex-wrap gap-1.5">
              <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-lg">Clip (3.60% + IVA)</span>
              <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-lg">Mercado Pago (3.50% + IVA)</span>
              <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-lg">Zettle (3.50% + IVA)</span>
              <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-lg">Ualá Bis (2.99% + IVA)</span>
              <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-lg">SumUp (3.20%-3.50% + IVA)</span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-blue-100 dark:border-blue-900/40 rounded-3xl p-6 shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Landmark className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">Esquema 2</span>
                <h3 className="text-base font-black text-slate-900 dark:text-white">Terminales Bancarias Tradicionales</h3>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed font-semibold mb-3">
              Orientadas a negocios establecidos o con mayor volumen de venta. Requieren cuenta de cheques institucional, contrato formal y habitualmente imponen renta de equipo o cuotas por facturación mínima mensual, a cambio de tasas por transacción más bajas.
            </p>
            <div className="flex flex-wrap gap-1.5">
              <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-lg">BBVA México</span>
              <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-lg">Santander (Getnet)</span>
              <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-lg">Citibanamex</span>
              <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-lg">Banorte</span>
              <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-lg">HSBC México</span>
            </div>
          </div>
        </div>

        {/* Practical Example card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/85 dark:border-slate-800 rounded-3xl p-6 sm:p-8 mb-10 shadow-xl shadow-slate-100/50 dark:shadow-none">
          <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2.5 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            Regla de Oro: El IVA del 16% sobre la Comisión (Tasa Efectiva)
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-350 leading-relaxed mb-6 font-medium">
            Para evitar confusiones o discrepancias en los cobros reales, es indispensable considerar que <strong>las tasas publicitadas por las empresas suelen ser antes de IVA</strong>. En México, el IVA del 16% se aplica exclusivamente sobre la comisión cobrada, no sobre el total de la venta.
          </p>

          {/* Desglose en 2 columnas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-50 dark:bg-slate-950/50 border border-slate-200/60 dark:border-slate-800 rounded-xl p-4 sm:p-5">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded bg-indigo-50 dark:bg-indigo-950 mb-3 text-indigo-650 dark:text-indigo-400 shadow-sm">
                <Percent className="w-4 h-4" />
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">1. Tasa Base Publicitada (Antes de IVA)</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed font-semibold">
                Es el porcentaje nominal que anuncia el agregador fintech o el banco según tu giro comercial y tipo de tarjeta (Débito, Crédito o AMEX).
              </p>
              <span className="inline-block text-[10px] font-extrabold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 mt-3 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800">
                Bancos: 0.85% a 3.60% | Fintech: 2.99% a 3.60%
              </span>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950/50 border border-slate-200/60 dark:border-slate-800 rounded-xl p-4 sm:p-5">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded bg-indigo-50 dark:bg-indigo-950 mb-3 text-indigo-650 dark:text-indigo-400 shadow-sm">
                <Info className="w-4 h-4" />
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">2. Comisión Efectiva Descontada (Con IVA)</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed font-semibold">
                Al multiplicar la comisión base por 1.16 obtienes la tasa efectiva real descontada. Por ejemplo, 3.50% + IVA equivale a <strong>4.06% efectivo</strong>, y 3.60% + IVA equivale a <strong>4.18% efectivo</strong>.
              </p>
              <span className="inline-block text-[10px] font-extrabold text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 mt-3 px-2 py-0.5 rounded border border-indigo-100 dark:border-indigo-900">
                Tasa federal: 16% de IVA acreditable ante el SAT
              </span>
            </div>
          </div>

          {/* Casos prácticos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-indigo-50/10 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30 rounded-2xl p-5 text-left">
              <h4 className="text-xs font-black text-indigo-755 dark:text-indigo-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded bg-indigo-500" />
                Ejemplo A: Mercado Pago / Zettle (3.50% + IVA)
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3.5 leading-relaxed">
                Cobro de <strong>$1,000.00 MXN</strong> en una exhibición. La comisión efectiva descontada es de <strong>4.06%</strong> ($40.60 MXN):
              </p>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 font-semibold border-t border-indigo-100/40 dark:border-indigo-900/10 pt-3">
                <li className="flex justify-between border-b border-indigo-50/40 dark:border-indigo-900/10 pb-1.5">
                  <span className="text-slate-600 dark:text-slate-400 font-medium">Comisión base (3.50%):</span>
                  <strong className="text-slate-950 dark:text-white">$35.00 MXN</strong>
                </li>
                <li className="flex justify-between border-b border-indigo-50/40 dark:border-indigo-900/10 pb-1.5">
                  <span className="text-slate-600 dark:text-slate-400 font-medium">IVA de comisión ($35.00 × 16%):</span>
                  <strong className="text-slate-950 dark:text-white">$5.60 MXN</strong>
                </li>
                <li className="flex justify-between font-bold text-slate-950 dark:text-white pt-1 pb-1">
                  <span>Comisión Efectiva Total (4.06%):</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">$40.60 MXN</span>
                </li>
                <li className="flex justify-between text-slate-500 dark:text-slate-450 text-[10px] pt-1.5 italic font-bold border-t border-indigo-200/20 dark:border-indigo-800/10">
                  <span>Dinero Neto Depositado:</span>
                  <span className="font-black text-slate-950 dark:text-white bg-emerald-500/10 dark:bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-600 dark:text-emerald-400">$959.40 MXN</span>
                </li>
              </ul>
            </div>

            <div className="bg-indigo-50/10 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30 rounded-2xl p-5 text-left">
              <h4 className="text-xs font-black text-indigo-755 dark:text-indigo-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded bg-amber-500 animate-pulse" />
                Ejemplo B: Clip (3.60% + IVA) vs TPV Bancaria (2.15% + IVA)
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3.5 leading-relaxed">
                Por cada <strong>$1,000.00 MXN</strong> cobrados, compara el descuento efectivo entre agregador y banca tradicional:
              </p>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 font-semibold border-t border-indigo-100/40 dark:border-indigo-900/10 pt-3">
                <li className="flex justify-between border-b border-indigo-50/40 dark:border-indigo-900/10 pb-1.5">
                  <span className="text-slate-600 dark:text-slate-400 font-medium">Clip (3.60% + IVA = 4.18% efec.):</span>
                  <strong className="text-slate-950 dark:text-white">-$41.76 MXN (Recibes $958.24)</strong>
                </li>
                <li className="flex justify-between border-b border-indigo-50/40 dark:border-indigo-900/10 pb-1.5">
                  <span className="text-slate-600 dark:text-slate-400 font-medium">Ualá Bis (2.99% + IVA = 3.47% efec.):</span>
                  <strong className="text-slate-950 dark:text-white">-$34.68 MXN (Recibes $965.32)</strong>
                </li>
                <li className="flex justify-between font-bold text-slate-950 dark:text-white pt-1 pb-1">
                  <span>BBVA Portátil Pyme (2.15% + IVA = 2.49%):</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">-$24.94 MXN (Recibes $975.06)</span>
                </li>
                <li className="flex justify-between text-slate-500 dark:text-slate-450 text-[10px] pt-1.5 italic font-bold border-t border-indigo-200/20 dark:border-indigo-800/10">
                  <span>Nota sobre Bancos:</span>
                  <span className="font-bold text-amber-600 dark:text-amber-400">Considerar renta mensual o mínimo de ventas</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Percent className="w-4 h-4 text-indigo-650 dark:text-indigo-450" />
            Catálogo Completo de Proveedores y Tasas ({providers.length} analizados)
          </h3>

          <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                activeTab === "all"
                  ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              Todas ({providers.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("fintech")}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                activeTab === "fintech"
                  ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              1. Agregadores Fintech ({fintechProviders.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("banco")}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                activeTab === "banco"
                  ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              2. Bancos Tradicionales ({bankProviders.length})
            </button>
          </div>
        </div>

        {/* Section 1: Fintech Aggregators */}
        {(activeTab === "all" || activeTab === "fintech") && (
          <div className="mb-12">
            <div className="flex items-center gap-2.5 mb-5 pb-2 border-b border-slate-200 dark:border-slate-800">
              <Smartphone className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <div>
                <h4 className="text-base font-black text-slate-900 dark:text-white">
                  1. Terminales No Bancarias (Agregadores Fintech)
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                  Sin cuenta empresarial forzosa, sin cuotas de ventas mínimas y $0 MXN de renta mensual.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fintechProviders.map((p, idx) => renderProviderCard(p, idx === 0))}
            </div>
          </div>
        )}

        {/* Section 2: Traditional Bank Terminals */}
        {(activeTab === "all" || activeTab === "banco") && (
          <div>
            <div className="flex items-center gap-2.5 mb-5 pb-2 border-b border-slate-200 dark:border-slate-800">
              <Landmark className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <div>
                <h4 className="text-base font-black text-slate-900 dark:text-white">
                  2. Terminales Bancarias Tradicionales
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                  Orientadas a negocios establecidos o con mayor volumen. Tasas más bajas diferenciadas por Débito, Crédito y giro comercial.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bankProviders.map((p, idx) => renderProviderCard(p, idx === 0))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
