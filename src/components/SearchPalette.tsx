import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Compass, Tag, Percent, Award, Sparkles, X, ChevronRight, HelpCircle, ArrowRight } from "lucide-react";
import { providers, referidos, promotions } from "../data";
import BrandLogo from "./BrandLogo";

interface SearchItem {
  id: string;
  type: "section" | "provider" | "promotion" | "resource";
  title: string;
  description: string;
  targetId: string;
  providerName?: string;
  badge?: string;
}

export default function SearchPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Define static sections of the app
  const staticSections: SearchItem[] = [
    {
      id: "sec-calc",
      type: "section",
      title: "Calculadora de Comisiones",
      description: "Simula ventas con débito, crédito y desglosa el IVA del 16% de inmediato.",
      targetId: "inicio",
      badge: "Herramienta"
    },
    {
      id: "sec-msi",
      type: "section",
      title: "Cálculo de Meses sin Intereses (MSI)",
      description: "Configura simulaciones de comisiones con diferimiento de pago de 3 a 12 meses.",
      targetId: "inicio",
      badge: "Herramienta"
    },
    {
      id: "sec-advisor",
      type: "section",
      title: "Consultor Financiero IA (Asesor Inteligente)",
      description: "Recibe asesoría automatizada con Inteligencia Artificial para tu tipo de negocio.",
      targetId: "asesor-ai",
      badge: "Asesor"
    },
    {
      id: "sec-rates",
      type: "section",
      title: "Comparador de Tasas Base",
      description: "Consulta el listado completo de tasas de descuento vigentes a junio 2026.",
      targetId: "comisiones",
      badge: "Guía"
    },
    {
      id: "sec-promo",
      type: "section",
      title: "Cupones y Ofertas de Lectores",
      description: "Descuentos en terminales físicas Clip y Mercado Pago Point.",
      targetId: "promociones",
      badge: "Ahorro"
    },
    {
      id: "sec-allies",
      type: "section",
      title: "Tarjetas de Crédito y Cuentas de Ahorro",
      description: "Enlaces de afiliados con cashback y préstamos de efectivo rápidos sin aval.",
      targetId: "referidos",
      badge: "Alianzas"
    }
  ];

  // Dynamic items compiled from data
  const providerItems: SearchItem[] = providers.map((p) => ({
    id: `prov-${p.name.toLowerCase().replace(/\s+/g, "-")}`,
    type: "provider",
    title: p.name,
    description: p.description,
    targetId: `card-info-${p.name.toLowerCase().replace(/\s+/g, "-")}`,
    providerName: p.name,
    badge: "TPV"
  }));

  const promoItems: SearchItem[] = promotions.map((pr) => ({
    id: `promo-${pr.id}`,
    type: "promotion",
    title: `Promoción: Lector ${pr.name}`,
    description: pr.description,
    targetId: "promociones",
    providerName: pr.name,
    badge: "Descuento"
  }));

  const resourceItems: SearchItem[] = referidos.map((ref) => ({
    id: `ref-${ref.id}`,
    type: "resource",
    title: ref.name,
    description: ref.description,
    targetId: `referral-card-${ref.id}`,
    providerName: ref.provider,
    badge: ref.category === "prestamo" ? "Préstamo" : "Cuenta/Tarjeta"
  }));

  // Combine all searchable elements
  const allItems: SearchItem[] = [
    ...staticSections,
    ...providerItems,
    ...promoItems,
    ...resourceItems
  ];

  // Filter items based on query
  const filteredItems = query.trim() === "" 
    ? allItems.slice(0, 5) // Show top suggestions when empty
    : allItems.filter(item => {
        const text = `${item.title} ${item.description} ${item.badge || ""} ${item.providerName || ""}`.toLowerCase();
        return text.includes(query.toLowerCase());
      });

  // Reset active item index on query change
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  // Handle hotkeys (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Scroll to active option if keyboard navigating
  useEffect(() => {
    if (resultsRef.current) {
      const activeElement = resultsRef.current.querySelector('[data-active="true"]');
      if (activeElement) {
        activeElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [activeIndex]);

  const handleSelect = (item: SearchItem) => {
    setIsOpen(false);
    setQuery("");

    setTimeout(() => {
      const element = document.getElementById(item.targetId);
      if (element) {
        const topOffset = element.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({
          top: topOffset,
          behavior: "smooth"
        });

        // Flash target element background slightly as visual feedback
        element.classList.add("ring-2", "ring-indigo-500/40", "transition-all", "duration-1000");
        setTimeout(() => {
          element.classList.remove("ring-2", "ring-indigo-500/40");
        }, 1500);
      }
    }, 150);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems[activeIndex]) {
        handleSelect(filteredItems[activeIndex]);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  // Icon selector based on type
  const getItemIcon = (item: SearchItem) => {
    switch (item.type) {
      case "section":
        return <Compass className="w-4 h-4 text-indigo-500" />;
      case "promotion":
        return <Tag className="w-4 h-4 text-amber-500" />;
      case "resource":
        return <Award className="w-4 h-4 text-emerald-500" />;
      case "provider":
        return item.providerName ? (
          <BrandLogo name={item.providerName} size="xs" />
        ) : (
          <Percent className="w-4 h-4 text-indigo-500" />
        );
      default:
        return <Search className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <>
      {/* Search trigger button in Navbar */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-2 bg-slate-50/70 hover:bg-slate-100/80 dark:bg-slate-950/40 dark:hover:bg-slate-950 border border-slate-200/60 dark:border-slate-800/80 rounded-xl transition-all cursor-pointer group"
        title="Buscar (Ctrl+K)"
        id="navbar-search-trigger"
      >
        <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300" />
        <span className="hidden xl:inline text-[11px] font-bold text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 tracking-wide pr-1">
          Buscar herramienta o tasa...
        </span>
        <span className="hidden md:inline xl:hidden text-[11px] font-bold text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 tracking-wide pr-1">
          Buscar...
        </span>
        <span className="hidden md:inline px-1.5 py-0.5 text-[9px] font-black text-slate-400 dark:text-slate-500 bg-slate-200/50 dark:bg-slate-850/70 rounded-md">
          ⌘K
        </span>
      </button>

      {/* Palette Overlay Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4">
            {/* Backdrop blur backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs"
            />

            {/* Command palette card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[70vh]"
            >
              {/* Header input row */}
              <div className="flex items-center px-4 py-3 border-b border-slate-150 dark:border-slate-800 gap-3">
                <Search className="w-5 h-5 text-indigo-500 shrink-0" />
                <input
                  ref={inputRef}
                  autoFocus
                  type="text"
                  placeholder="Escribe para buscar... (ej. Clip, Nu, IVA, asesor, descuento)"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent text-sm font-semibold text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 border-none outline-none focus:ring-0 py-1"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors cursor-pointer shrink-0"
                  title="Cerrar (Esc)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Suggestions & Results Panel */}
              <div 
                ref={resultsRef} 
                className="overflow-y-auto flex-1 divide-y divide-slate-100 dark:divide-slate-850"
              >
                {filteredItems.length > 0 ? (
                  <div className="p-2.5">
                    {/* Category Label */}
                    <div className="px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1.5 flex items-center justify-between">
                      <span>{query.trim() === "" ? "Búsquedas sugeridas" : "Resultados de búsqueda"}</span>
                      <span className="text-[8px] font-semibold">{filteredItems.length} encontrados</span>
                    </div>

                    <div className="space-y-0.5">
                      {filteredItems.map((item, index) => {
                        const isActive = index === activeIndex;
                        return (
                          <div
                            key={item.id}
                            data-active={isActive ? "true" : "false"}
                            onClick={() => handleSelect(item)}
                            onMouseEnter={() => setActiveIndex(index)}
                            className={`flex items-start gap-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer select-none ${
                              isActive 
                                ? "bg-indigo-50/60 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 border border-indigo-100/30 dark:border-indigo-900/30" 
                                : "bg-transparent text-slate-700 dark:text-slate-300 border border-transparent"
                            }`}
                          >
                            <div className="mt-0.5 shrink-0">
                              {getItemIcon(item)}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className={`text-[11px] font-black leading-tight truncate ${isActive ? "text-indigo-700 dark:text-indigo-300" : "text-slate-800 dark:text-white"}`}>
                                  {item.title}
                                </span>
                                {item.badge && (
                                  <span className={`inline-flex px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${
                                    isActive 
                                      ? "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400" 
                                      : "bg-slate-100 dark:bg-slate-850 text-slate-500 dark:text-slate-400"
                                  }`}>
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <p className={`text-[10px] leading-normal font-medium mt-0.5 truncate ${isActive ? "text-indigo-600/80 dark:text-indigo-400/80" : "text-slate-450 dark:text-slate-400"}`}>
                                {item.description}
                              </p>
                            </div>

                            {isActive && (
                              <ChevronRight className="w-3.5 h-3.5 text-indigo-500 shrink-0 self-center animate-pulse" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="py-12 px-4 text-center">
                    <HelpCircle className="w-8 h-8 text-slate-300 dark:text-slate-650 mx-auto mb-2.5" />
                    <h5 className="text-xs font-black text-slate-800 dark:text-white">
                      No se encontraron resultados para "{query}"
                    </h5>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 max-w-xs mx-auto mt-1 leading-normal font-semibold">
                      Prueba con términos más amplios como "Clip", "IVA", "Asesor" o "Cuenta".
                    </p>
                  </div>
                )}
              </div>

              {/* Keyboard shortcuts footer */}
              <div className="px-4 py-2 bg-slate-50 dark:bg-slate-950/40 border-t border-slate-150 dark:border-slate-850 flex items-center justify-between text-[9px] font-black text-slate-400 dark:text-slate-500 select-none">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded shadow-xs">↑↓</kbd> Navegar
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded shadow-xs">Enter</kbd> Ir a sección
                  </span>
                </div>
                <div>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded shadow-xs">Esc</kbd> Cerrar
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
