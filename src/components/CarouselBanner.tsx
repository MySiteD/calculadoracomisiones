import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Percent, TrendingUp, ChevronLeft, ChevronRight, X, ArrowRight } from "lucide-react";

interface BannerItem {
  id: string;
  type: "info" | "promo" | "rate";
  title: string;
  description: string;
  actionText?: string;
  actionTargetId?: string;
  badgeText: string;
  colorClass: {
    bg: string;
    border: string;
    text: string;
    darkBg: string;
    darkBorder: string;
    darkText: string;
    accent: string;
  };
}

const BANNER_ITEMS: BannerItem[] = [
  {
    id: "promo-active",
    type: "promo",
    title: "🔥 Cupón de Descuento Activo",
    description: "Ahorra hasta un 60% en tu lector de tarjetas Point o Clip con los enlaces directos oficiales.",
    actionText: "Aprovechar cupón",
    actionTargetId: "promociones",
    badgeText: "Descuento",
    colorClass: {
      bg: "from-amber-500/8 to-amber-600/5",
      border: "border-amber-200/60",
      text: "text-amber-800",
      darkBg: "dark:from-amber-950/20 dark:to-amber-900/10",
      darkBorder: "dark:border-amber-900/40",
      darkText: "dark:text-amber-300",
      accent: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-400"
    }
  },
  {
    id: "rates-update",
    type: "rate",
    title: "Tasas Verificadas (Junio 2026)",
    description: "Comisiones e IVA del 16% de Clip, Mercado Pago, Zettle y Ualá actualizadas para simulación.",
    actionText: "Ver tablas de comisión",
    actionTargetId: "comisiones",
    badgeText: "Tasas Oficiales",
    colorClass: {
      bg: "from-indigo-500/8 to-indigo-600/5",
      border: "border-indigo-200/60",
      text: "text-indigo-850",
      darkBg: "dark:from-indigo-950/20 dark:to-indigo-900/10",
      darkBorder: "dark:border-indigo-900/40",
      darkText: "dark:text-indigo-300",
      accent: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-400"
    }
  },
  {
    id: "metrics-recalculated",
    type: "info",
    title: "Simulación de Impuestos Avanzada",
    description: "Optimización del cálculo de IVA acreditable e ISR retenido según tu régimen fiscal.",
    actionText: "Ir a la calculadora",
    actionTargetId: "inicio",
    badgeText: "SAT Actualizado",
    colorClass: {
      bg: "from-emerald-500/8 to-emerald-600/5",
      border: "border-emerald-200/60",
      text: "text-emerald-850",
      darkBg: "dark:from-emerald-950/20 dark:to-emerald-900/10",
      darkBorder: "dark:border-emerald-900/40",
      darkText: "dark:text-emerald-300",
      accent: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-400"
    }
  }
];

export default function CarouselBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [direction, setDirection] = useState(1); // 1 = right, -1 = left
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Check local storage to respect user dismissal preference
    const isDismissed = localStorage.getItem("caja_banner_dismissed");
    if (isDismissed === "true") {
      setIsVisible(false);
    }
  }, []);

  // Auto-rotate items every 6 seconds unless hovered
  useEffect(() => {
    if (!isVisible || isHovered) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % BANNER_ITEMS.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isVisible, isHovered]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + BANNER_ITEMS.length) % BANNER_ITEMS.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % BANNER_ITEMS.length);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("caja_banner_dismissed", "true");
  };

  const handleActionClick = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth"
      });
    }
  };

  if (!isVisible) return null;

  const currentMsg = BANNER_ITEMS[currentIndex];
  const colors = currentMsg.colorClass;

  const getIcon = (type: string) => {
    switch (type) {
      case "promo":
        return <Sparkles className="w-4 h-4 text-amber-500 animate-pulse shrink-0" />;
      case "rate":
        return <Percent className="w-3.5 h-3.5 text-indigo-500 shrink-0" />;
      default:
        return <TrendingUp className="w-3.5 h-3.5 text-emerald-500 shrink-0" />;
    }
  };

  return (
    <div 
      className="fixed top-[74px] sm:top-[82px] left-1/2 -translate-x-1/2 w-[92%] max-w-7xl z-40 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      id="top-carousel-banner"
    >
      <div className={`relative w-full rounded-2xl bg-gradient-to-r ${colors.bg} ${colors.darkBg} border ${colors.border} ${colors.darkBorder} backdrop-blur-md px-3 py-2.5 sm:py-2 shadow-[0_4px_16px_rgba(99,102,241,0.04)] transition-all duration-500 flex items-center justify-between gap-2.5 md:gap-4 overflow-hidden`}>
        
        {/* Progress line indicator (auto rotation) */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-slate-200/20 dark:bg-slate-800/30 overflow-hidden">
          <motion.div 
            key={currentIndex}
            initial={{ width: "0%" }}
            animate={isHovered ? { width: "100%" } : { width: "100%" }}
            transition={{ duration: isHovered ? 0 : 6, ease: "linear" }}
            className={`h-full ${
              currentMsg.type === 'promo' ? 'bg-amber-500' : currentMsg.type === 'rate' ? 'bg-indigo-500' : 'bg-emerald-500'
            }`}
          />
        </div>

        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className="p-1 rounded-lg text-slate-400 hover:text-indigo-650 hover:bg-slate-100/50 dark:hover:bg-slate-800/40 transition-colors cursor-pointer shrink-0"
          title="Anterior"
          aria-label="Notificación anterior"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Carousel Content Frame */}
        <div className="flex-1 min-w-0 flex items-center justify-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: direction * 35 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 35 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="flex flex-col sm:flex-row sm:items-center justify-center gap-1.5 sm:gap-3 w-full max-w-4xl"
            >
              {/* Badge + Icon */}
              <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${colors.accent}`}>
                  {getIcon(currentMsg.type)}
                  {currentMsg.badgeText}
                </span>
                <span className="text-[10px] sm:text-xs font-black text-slate-900 dark:text-white shrink-0 hidden xs:inline">
                  {currentMsg.title}
                </span>
              </div>

              {/* Title & Description */}
              <div className="flex-1 min-w-0 text-left sm:text-center md:text-left">
                <p className={`text-[11px] sm:text-xs font-semibold ${colors.text} ${colors.darkText} truncate md:whitespace-normal line-clamp-1 leading-normal`}>
                  <span className="font-extrabold xs:hidden">{currentMsg.title} · </span>
                  {currentMsg.description}
                </p>
              </div>

              {/* Action Trigger Button */}
              {currentMsg.actionText && currentMsg.actionTargetId && (
                <button
                  onClick={() => handleActionClick(currentMsg.actionTargetId!)}
                  className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-all shrink-0 hover:translate-x-0.5 cursor-pointer self-start sm:self-auto"
                >
                  <span>{currentMsg.actionText}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation & Control Panel right side */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Next Button */}
          <button
            onClick={handleNext}
            className="p-1 rounded-lg text-slate-400 hover:text-indigo-650 hover:bg-slate-100/50 dark:hover:bg-slate-800/40 transition-colors cursor-pointer"
            title="Siguiente"
            aria-label="Siguiente notificación"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <span className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800/80 mx-1 hidden sm:inline" />

          {/* Close/Dismiss Button */}
          <button
            onClick={handleDismiss}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-650 dark:hover:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-800/40 transition-colors cursor-pointer"
            title="Cerrar banner"
            aria-label="Cerrar banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
