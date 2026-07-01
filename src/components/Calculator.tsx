import React, { useState, useEffect } from "react";
import { providers } from "../data";
import BrandLogo from "./BrandLogo";
import { CalculationResult } from "../types";
import { trackSimulate } from "../utils/analytics";
import { trackCalculation } from "../lib/firebase";
import { jsPDF } from "jspdf";
import { motion, AnimatePresence } from "motion/react";
import { 
  TrendingUp, 
  Percent, 
  Coins, 
  HelpCircle, 
  Cpu, 
  Database, 
  Activity, 
  ArrowRight,
  Sparkles,
  Info,
  ShieldAlert,
  Download,
  History,
  Columns,
  Plus,
  X,
  Check,
  Settings,
  Save,
  Share2,
  Copy,
  Mail,
  MessageSquare
} from "lucide-react";

interface HistoryEntry {
  id: string;
  amount: string;
  paymentMethod: string;
  msiMonths: string;
  timestamp: string;
}

// Interactive custom tooltip component to display detailed financial explanations
function Tooltip({ content }: { content: string }) {
  const [visible, setVisible] = useState(false);

  return (
    <span 
      className="relative inline-flex items-center ml-1.5 select-none"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onClick={(e) => {
        e.stopPropagation();
        setVisible(!visible);
      }}
    >
      <HelpCircle className="w-3.5 h-3.5 text-slate-400 hover:text-indigo-650 transition-colors cursor-help shrink-0" />
      {visible && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-52 sm:w-60 bg-slate-910 bg-[#0f172a] border border-slate-800 text-white text-[10px] sm:text-[11px] leading-relaxed p-3 rounded-xl shadow-2xl font-bold text-center pointer-events-none transition-all duration-200">
          {content}
          <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[#0f172a]" />
        </span>
      )}
    </span>
  );
}

export default function Calculator() {
  const [amount, setAmount] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("regular");
  const [msiMonths, setMsiMonths] = useState<string>("3");
  const [results, setResults] = useState<CalculationResult[]>([]);
  const [calcCount, setCalcCount] = useState<number>(0);
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [selectedComparison, setSelectedComparison] = useState<string[]>([]);
  const [isConfiguring, setIsConfiguring] = useState<boolean>(false);
  const [configSavedToast, setConfigSavedToast] = useState<boolean>(false);
  const [isShareOpen, setIsShareOpen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    const savedCount = localStorage.getItem("calcCount");
    if (savedCount) {
      setCalcCount(parseInt(savedCount, 10));
    } else {
      setCalcCount(0);
    }

    const savedHistory = localStorage.getItem("calculator_history");
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Error parsing history from local storage:", e);
      }
    }
  }, []);

  const handleExportPDF = () => {
    if (!results || results.length === 0) return;

    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Color palette (Professional Slate & Indigo theme)
      const primaryColor = [79, 70, 229]; // Indigo
      const grayDark = [15, 23, 42]; // Slate 900
      const grayLight = [248, 250, 252]; // Slate 50
      const borderCol = [226, 232, 240]; // Slate 200
      const textMuted = [100, 116, 139]; // Slate 500

      // Page Dimensions
      const pageWidth = doc.internal.pageSize.getWidth ? doc.internal.pageSize.getWidth() : doc.internal.pageSize.width; 
      const pageHeight = doc.internal.pageSize.getHeight ? doc.internal.pageSize.getHeight() : doc.internal.pageSize.height;

      // Header Banner (Slate-900 background)
      doc.setFillColor(grayDark[0], grayDark[1], grayDark[2]);
      doc.rect(0, 0, pageWidth, 42, "F");

      // Title & Subtitle
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(255, 255, 255);
      doc.text("CAJA DE HERRAMIENTAS Y MAS", 15, 16);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(199, 210, 254); // Light indigo text
      doc.text("Reporte Comparativo de Comisiones y Retornos Netos", 15, 23);

      const currentDateString = new Date().toLocaleString("es-MX", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184); // Muted gray-blue
      doc.text(`Fecha de simulacion: ${currentDateString}`, 15, 30);

      // Decorative divider below header
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.rect(0, 42, pageWidth, 2.5, "F");

      let currentY = 53;

      // Simulation Parameters Box (Slate-50 with border)
      doc.setFillColor(grayLight[0], grayLight[1], grayLight[2]);
      doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
      doc.setLineWidth(0.3);
      doc.roundedRect(15, currentY, pageWidth - 30, 24, 3, 3, "FD");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(grayDark[0], grayDark[1], grayDark[2]);
      doc.text("DATOS DE LA SIMULACION", 20, currentY + 6);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.text(`Monto Cobrado Simulado:`, 20, currentY + 12);
      doc.setFont("helvetica", "bold");
      doc.text(`$${parseFloat(amount).toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN`, 65, currentY + 12);

      doc.setFont("helvetica", "normal");
      doc.text(`Metodo de Procesamiento:`, 20, currentY + 18);
      doc.setFont("helvetica", "bold");
      const schemeText = paymentMethod === "msi" ? `Meses Sin Intereses (${msiMonths} Meses)` : "Regular / Debito y Credito (1 Exhibicion)";
      doc.text(schemeText, 65, currentY + 18);

      currentY += 34;

      // Table Header Label
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(grayDark[0], grayDark[1], grayDark[2]);
      doc.text("COMPARATIVA DE PROVEEDORES DE TPV", 15, currentY);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
      doc.text("(Resultados ordenados de mayor a menor beneficio de retorno liquido)", 15, currentY + 4);

      currentY += 8;

      // Drawing Table Header Row
      doc.setFillColor(241, 245, 249); // slate-100
      doc.rect(15, currentY, pageWidth - 30, 8, "F");
      doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
      doc.line(15, currentY, pageWidth - 15, currentY);
      doc.line(15, currentY + 8, pageWidth - 15, currentY + 8);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(grayDark[0], grayDark[1], grayDark[2]);
      doc.text("Proveedor", 18, currentY + 5.5);
      doc.text("Tasa Efec.", 65, currentY + 5.5);
      doc.text("Comision Brut.", 90, currentY + 5.5);
      doc.text("IVA desgl.", 115, currentY + 5.5);
      doc.text("Deposito Neto", 140, currentY + 5.5);
      doc.text("Dif. vs Mejor", 172, currentY + 5.5);

      currentY += 8;

      const winnerPayout = results[0]?.netPayout || 0;

      // Draw rows
      results.forEach((r, index) => {
        // Row Background
        if (index === 0) {
          doc.setFillColor(239, 246, 255); // very light blue for the winner
        } else if (index % 2 === 1) {
          doc.setFillColor(250, 250, 250); 
        } else {
          doc.setFillColor(255, 255, 255);
        }
        doc.rect(15, currentY, pageWidth - 30, 9.5, "F");

        // Set text colors & font style
        if (index === 0) {
          doc.setTextColor(37, 99, 235); // Blue
          doc.setFont("helvetica", "bold");
        } else {
          doc.setTextColor(grayDark[0], grayDark[1], grayDark[2]);
          doc.setFont("helvetica", "normal");
        }

        // Draw small color block representing bullet
        try {
          const rgb = r.color.startsWith("#") 
            ? [
                parseInt(r.color.slice(1, 3), 16),
                parseInt(r.color.slice(3, 5), 16),
                parseInt(r.color.slice(5, 7), 16)
              ]
            : [79, 70, 229];
          doc.setFillColor(rgb[0], rgb[1], rgb[2]);
          doc.rect(18, currentY + 3.2, 2.5, 2.5, "F");
        } catch (e) {
          doc.setFillColor(100, 116, 139);
          doc.rect(18, currentY + 3.2, 2.5, 2.5, "F");
        }

        // Reassert font settings
        if (index === 0) {
          doc.setTextColor(37, 99, 235);
          doc.setFont("helvetica", "bold");
        } else {
          doc.setTextColor(grayDark[0], grayDark[1], grayDark[2]);
          doc.setFont("helvetica", "normal");
        }

        doc.setFontSize(8);
        doc.text(r.name, 22, currentY + 6);
        doc.text(`${(r.usedRate * 100).toFixed(2)}%`, 65, currentY + 6);
        doc.text(`$${r.commission.toFixed(2)}`, 90, currentY + 6);
        doc.text(`$${r.iva.toFixed(2)}`, 115, currentY + 6);

        if (index === 0) {
          doc.setFont("helvetica", "bold");
        }
        doc.text(`$${r.netPayout.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 140, currentY + 6);

        // Difference vs the top winner
        const difference = r.netPayout - winnerPayout;
        if (index === 0) {
          doc.setFont("helvetica", "bold");
          doc.setTextColor(16, 185, 129); // green
          doc.text("Tarifa Optima", 172, currentY + 6);
        } else {
          doc.setTextColor(239, 68, 68); // red
          doc.text(`-$${Math.abs(difference).toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 172, currentY + 6);
        }

        // Draw horizontal line separator
        doc.setDrawColor(241, 245, 249);
        doc.setLineWidth(0.2);
        doc.line(15, currentY + 9.5, pageWidth - 15, currentY + 9.5);

        currentY += 9.5;
      });

      currentY += 8;

      // Disclaimer Box
      doc.setFillColor(254, 253, 237); // Light amber background
      doc.setDrawColor(254, 240, 138); // Soft yellow border
      doc.roundedRect(15, currentY, pageWidth - 30, 26, 2, 2, "FD");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(133, 77, 14); // Dark gold
      doc.text("AVISO LEGAL Y EXCLUSION DE RESPONSABILIDAD:", 18, currentY + 5);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(113, 63, 18);
      const splitDisclaimer1 = "Este reporte es un simulador de caracter estimativo e informativo basado en las tasas publicas de los agregadores";
      const splitDisclaimer2 = "en Mexico a junio de 2026. Por mandato de ley, las comisiones gravan 16% de IVA, el cual desglosamos aqui para";
      const splitDisclaimer3 = "reflejar tu liquidez neta real. Caja de Herramientas y Mas no garantiza la exactitud absoluta de los valores ni";
      const splitDisclaimer4 = "se hace responsable por cambios de tarifas o politicas de los proveedores, ni por decisiones tomadas con este reporte.";
      doc.text(splitDisclaimer1, 18, currentY + 10);
      doc.text(splitDisclaimer2, 18, currentY + 14);
      doc.text(splitDisclaimer3, 18, currentY + 18);
      doc.text(splitDisclaimer4, 18, currentY + 22);

      // Footer
      const footerY = pageHeight - 24;
      doc.setDrawColor(226, 232, 240);
      doc.line(15, footerY - 4, pageWidth - 15, footerY - 4);
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
      
      // Social Networks list
      doc.text("Facebook: facebook.com/share/1aBs1jun2w/", 15, footerY + 1);
      doc.text("YouTube: youtube.com/@cajadeherramientasymas", 110, footerY + 1);
      doc.text("TikTok: @cajadeherramientasymas", 15, footerY + 5.5);
      doc.text("Gmail: cajadeherramientasymas@gmail.com", 110, footerY + 5.5);

      // Copyright / Brand info
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.text("Hecho de forma independiente con Caja de Herramientas y Mas.", 15, footerY + 13);
      doc.text("cajadeherramientasymas.com", pageWidth - 15, footerY + 13, { align: "right" });

      const sanitizedAmount = parseFloat(amount).toFixed(0);
      doc.save(`comparador_comisiones_${sanitizedAmount}_mxn.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const runCalculation = (amountVal: string, methodVal: string, msiVal: string) => {
    const parsedAmount = parseFloat(amountVal);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setResults([]);
      setHasCalculated(true);
      return;
    }

    // Trace simulation event with Google Analytics
    trackSimulate(parsedAmount, methodVal, methodVal === "msi" ? msiVal : undefined);

    // Increment calculations count in real-time Firestore database
    trackCalculation();

    // Process calculations
    const isMsi = methodVal === "msi";
    const computedResults: CalculationResult[] = providers.map((p) => {
      let activeRate = p.baseRate;
      if (isMsi) {
        const extraMsiRate = p.msiRates[msiVal] || 0;
        activeRate = p.baseRate + extraMsiRate;
      }

      const commission = parsedAmount * activeRate;
      const iva = commission * 0.16;
      const totalCommission = commission + iva;
      const netPayout = parsedAmount - totalCommission;

      return {
        name: p.name,
        usedRate: activeRate,
        commission,
        iva,
        totalCommission,
        netPayout,
        color: p.color,
        textColor: p.textColor,
        badgeBg: p.badgeBg,
      };
    }).sort((a, b) => b.netPayout - a.netPayout);

    setResults(computedResults);
    setHasCalculated(true);
    
    // Auto-select top 3 for the side-by-side comparison OR load custom local defaults
    let initialComparison: string[] = [];
    const savedConfig = localStorage.getItem("default_providers_comparison");
    if (savedConfig) {
      try {
        const parsed = JSON.parse(savedConfig) as string[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          initialComparison = parsed.filter(name => computedResults.some(res => res.name === name));
        }
      } catch (e) {
        console.error("Error loading user default TPVs:", e);
      }
    }

    if (initialComparison.length === 0) {
      initialComparison = computedResults.slice(0, 3).map(r => r.name);
    }
    setSelectedComparison(initialComparison);

    // Save calculation metrics
    const newCount = calcCount + 1;
    setCalcCount(newCount);
    localStorage.setItem("calcCount", newCount.toString());

    // Add to history
    const newEntry: HistoryEntry = {
      id: Date.now().toString(),
      amount: amountVal,
      paymentMethod: methodVal,
      msiMonths: isMsi ? msiVal : "0",
      timestamp: new Date().toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" }),
    };

    setHistory((prevHistory) => {
      const filtered = prevHistory.filter(
        (h) => !(h.amount === amountVal && h.paymentMethod === methodVal && (methodVal !== "msi" || h.msiMonths === msiVal))
      );
      const updated = [newEntry, ...filtered].slice(0, 5);
      localStorage.setItem("calculator_history", JSON.stringify(updated));
      return updated;
    });

    // Scroll to results cleanly
    setTimeout(() => {
      const el = document.getElementById("comparador-resultados");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    runCalculation(amount, paymentMethod, msiMonths);
  };

  const loadHistoryEntry = (entry: HistoryEntry) => {
    setAmount(entry.amount);
    setPaymentMethod(entry.paymentMethod);
    if (entry.paymentMethod === "msi") {
      setMsiMonths(entry.msiMonths);
    }
    runCalculation(entry.amount, entry.paymentMethod, entry.msiMonths);
  };

  const getShareUrl = () => {
    const baseUrl = window.location.origin + window.location.pathname;
    const params = new URLSearchParams();
    if (amount) params.set("amount", amount);
    if (paymentMethod) params.set("method", paymentMethod);
    if (paymentMethod === "msi" && msiMonths) params.set("msi", msiMonths);
    return `${baseUrl}?${params.toString()}`;
  };

  const getShareMessage = () => {
    const formattedAmount = parseFloat(amount).toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const methodStr = paymentMethod === "regular" ? "Tarjeta de Débito/Crédito regular" : `Meses sin Intereses (${msiMonths} meses)`;
    const bestProvider = results[0];
    let msg = `¡Hola! Estaba calculando comisiones de TPV en México y encontré la mejor opción:\n\n`;
    msg += `• Monto: $${formattedAmount} MXN\n`;
    msg += `• Método de pago: ${methodStr}\n`;
    if (bestProvider) {
      const formattedPayout = bestProvider.netPayout.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      msg += `• Mejor opción: ${bestProvider.name} (Retorno neto: $${formattedPayout} MXN)\n`;
    }
    msg += `\nVer simulación completa en Caja de Herramientas y Más:\n${getShareUrl()}`;
    return msg;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(getShareUrl()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlAmount = params.get("amount");
    const urlMethod = params.get("method");
    const urlMsi = params.get("msi");

    if (urlAmount) {
      setAmount(urlAmount);
      const method = urlMethod || "regular";
      const msi = urlMsi || "3";
      setPaymentMethod(method);
      setMsiMonths(msi);
      runCalculation(urlAmount, method, msi);
    }
  }, []);

  const toggleComparison = (providerName: string) => {
    setSelectedComparison((prev) => {
      if (prev.includes(providerName)) {
        return prev.filter((name) => name !== providerName);
      }
      if (prev.length >= 3) {
        // limit to 3, swap first
        return [...prev.slice(1), providerName];
      }
      return [...prev, providerName];
    });
  };

  return (
    <section id="inicio" className="py-16 relative overflow-hidden">
      {/* Gentle Section Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[110px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-10 w-[400px] h-[400px] bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        
        {/* Main Dashboard Card */}
        <div id="simulador-card" className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 md:p-10 shadow-xl shadow-slate-100 dark:shadow-none relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-xl pointer-events-none" />
          
          <div className="text-center max-w-sm mx-auto mb-8">
            <span className="text-xs font-bold text-indigo-700 tracking-wider uppercase bg-indigo-50 border border-indigo-100 px-3 py-1.2 rounded-full shadow-sm">
              Simulador Interactivo
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight mt-4">
              Ingresa el monto de tu cobro
            </h2>
            <p className="text-xs text-slate-500 mt-1.5 font-medium">
              Compara de manera equitativa e inmediata el costo de las pasarelas.
            </p>
          </div>

          <form onSubmit={handleCalculate} className="space-y-6">
            
            {/* Massive Amount Input Wrapper */}
            <div className="space-y-2">
              <div className="flex items-center">
                <label htmlFor="amount" className="block text-xs font-bold text-slate-500 uppercase tracking-wide">
                  Monto del Cobro a Simular (MXN)
                </label>
                <Tooltip content="Monto Bruto: El importe original de tu venta sobre el cual se calcularán las retenciones de comisión e IVA." />
              </div>
              <div className="flex items-center bg-slate-50 border border-slate-250/80 focus-within:border-indigo-500 focus-within:bg-white focus-within:shadow-[0_0_20px_rgba(99,102,241,0.08)] rounded-xl px-5 py-4 transition-all duration-300">
                <span className="text-slate-400 text-3xl font-extrabold mr-3">$</span>
                <input
                  type="number"
                  step="any"
                  id="amount"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-transparent w-full border-none outline-none text-slate-900 text-3xl md:text-4xl font-extrabold focus:ring-0 placeholder-slate-300"
                  required
                  min="0.01"
                />
              </div>
            </div>

            {/* Selectors rows */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Payment scheme */}
              <div className="space-y-2">
                <div className="flex items-center">
                  <label htmlFor="paymentMethod" className="block text-xs font-bold text-slate-500 uppercase tracking-wide">
                    Esquema de Procesamiento
                  </label>
                  <Tooltip content="Esquema: Define si el cobro se realiza de manera ordinaria o si deseas diferirlo en plazos de Meses Sin Intereses (MSI)." />
                </div>
                <div className="relative">
                  <select
                    id="paymentMethod"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl py-3.5 px-4 font-semibold text-xs md:text-sm tracking-wide focus:border-indigo-500 focus:bg-white focus:outline-none cursor-pointer shadow-sm"
                  >
                    <option value="regular">Venta Estándar (Débito o Crédito una sola exhibición)</option>
                    <option value="msi">Meses Sin Intereses (Financiamiento MSI)</option>
                  </select>
                </div>
              </div>

              {/* Plazo MSI months */}
              {paymentMethod === "msi" && (
                <div className="space-y-2 animate-fadeIn">
                  <div className="flex items-center">
                    <label htmlFor="msiMonths" className="block text-xs font-bold text-indigo-700 uppercase tracking-wide">
                      Surcharge de MSI (Elegir Plazo)
                    </label>
                    <Tooltip content="Surcharge: Es la sobrecomisión de financiamiento que cobran los agregadores por diferir cobros a mensualidades (MSI)." />
                  </div>
                  <select
                    id="msiMonths"
                    value={msiMonths}
                    onChange={(e) => setMsiMonths(e.target.value)}
                    className="w-full bg-slate-50 border border-indigo-200 text-slate-800 rounded-xl py-3.5 px-4 font-semibold text-xs md:text-sm tracking-wide focus:border-indigo-500 focus:bg-white focus:outline-none cursor-pointer shadow-sm"
                  >
                    <option value="3">3 Meses Sin Intereses (MSI)</option>
                    <option value="6">6 Meses Sin Intereses (MSI)</option>
                    <option value="9">9 Meses Sin Intereses (MSI)</option>
                    <option value="12">12 Meses Sin Intereses (MSI)</option>
                  </select>
                </div>
              )}
            </div>

            {/* Simulated executor trigger button */}
            <button
              type="submit"
              id="btn-simulate"
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs md:text-sm tracking-widest uppercase py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/15 active:scale-[0.98] shadow-md cursor-pointer"
            >
              Simular y Comparar Costos
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </form>

          {/* History Section */}
          {history.length > 0 && (
            <div className="mt-6 pt-6 border-t border-slate-100/80 animate-fadeIn">
              <div className="flex items-center justify-between mb-3.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
                  <History className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  Historial de simulaciones recientes
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setHistory([]);
                    localStorage.removeItem("calculator_history");
                  }}
                  className="text-[10px] font-bold text-rose-500 hover:text-rose-700 transition-colors cursor-pointer select-none"
                >
                  Limpiar historial
                </button>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
                {history.map((entry) => {
                  const isMsi = entry.paymentMethod === "msi";
                  return (
                    <button
                      key={entry.id}
                      type="button"
                      onClick={() => loadHistoryEntry(entry)}
                      className="flex flex-col items-start bg-slate-50/50 hover:bg-indigo-50 border border-slate-200/60 hover:border-indigo-300 rounded-xl p-3 transition-all duration-250 text-left cursor-pointer group shadow-sm"
                    >
                      <div className="flex items-center justify-between w-full gap-1">
                        <span className="font-extrabold text-xs text-slate-900 group-hover:text-indigo-950">
                          ${parseFloat(entry.amount).toLocaleString("es-MX", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
                        </span>
                        <span className="text-[8px] text-slate-450 text-slate-400 font-bold shrink-0">
                          {entry.timestamp}
                        </span>
                      </div>
                      <span className="text-[9px] font-bold text-slate-500 mt-1 lines-clamp-1 group-hover:text-indigo-600">
                        {isMsi ? `${entry.msiMonths} MSI` : "1 Exhibición"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Info Alert inside the card */}
          <div className="flex items-start gap-2.5 bg-indigo-50/60 border border-indigo-100/70 rounded-xl p-4 mt-6 text-[11px] text-slate-600 leading-relaxed font-semibold">
            <Info className="w-4 h-4 text-indigo-650 shrink-0 mt-0.5" />
            <span>
              <strong>Dato clave de Ley:</strong> Las tasas que cobran los agregadores de pago independientes en México generan IVA del 16% sobre el monto de la comisión bancaria. Este IVA se desglosa automáticamente en nuestros resultados.
            </span>
          </div>
        </div>

        {/* ====================================
            CALCULATOR RESULTS PANEL 
            ==================================== */}
        {hasCalculated && (
          <div id="comparador-resultados" className="mt-12 space-y-4 pt-4 border-t border-slate-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-2">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-indigo-600" />
                  Análisis comparativo de retorno neto
                </h3>
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  Resultados ordenados de mayor beneficio líquido a menor.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] uppercase font-extrabold text-indigo-700 bg-indigo-50 px-2.5 py-1.5 rounded-lg border border-indigo-100 shadow-sm">
                  Monto simulado: ${parseFloat(amount).toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN
                </span>
                <button
                  type="button"
                  id="btn-export-pdf"
                  onClick={handleExportPDF}
                  className="inline-flex items-center gap-1.5 text-[10px] uppercase font-extrabold text-white bg-indigo-600 hover:bg-indigo-700 transition-all px-3 py-1.5 rounded-lg border border-indigo-650 hover:shadow-md cursor-pointer select-none"
                >
                  <Download className="w-3.5 h-3.5 text-white" />
                  Descargar PDF
                </button>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsShareOpen(!isShareOpen)}
                    className="inline-flex items-center gap-1.5 text-[10px] uppercase font-extrabold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 hover:shadow-md px-3 py-1.5 rounded-lg transition-all cursor-pointer select-none"
                  >
                    <Share2 className="w-3.5 h-3.5 text-slate-500" />
                    Compartir
                  </button>

                  <AnimatePresence>
                    {isShareOpen && (
                      <>
                        <div 
                          className="fixed inset-0 z-40" 
                          onClick={() => setIsShareOpen(false)}
                        />
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: 10 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 bottom-full mb-2 sm:bottom-auto sm:top-full sm:mt-2 z-50 w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xl shadow-slate-100 dark:shadow-none"
                        >
                          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100 dark:border-slate-800">
                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                              Compartir Simulación
                            </span>
                            <button 
                              onClick={() => setIsShareOpen(false)}
                              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="space-y-2">
                            <button
                              onClick={handleCopyLink}
                              className="w-full flex items-center justify-between px-3 py-2 bg-slate-50 hover:bg-indigo-50/60 dark:bg-slate-950/30 dark:hover:bg-indigo-950/30 border border-slate-150 dark:border-slate-800/80 rounded-xl text-left transition-colors cursor-pointer group"
                            >
                              <div className="flex items-center gap-2.5">
                                <Copy className="w-3.5 h-3.5 text-indigo-500" />
                                <span className="text-[11px] font-extrabold text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                                  {copied ? "¡Enlace copiado!" : "Copiar enlace directo"}
                                </span>
                              </div>
                              {copied && <Check className="w-3.5 h-3.5 text-emerald-500" />}
                            </button>

                            <a
                              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(getShareMessage())}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => setIsShareOpen(false)}
                              className="w-full flex items-center gap-2.5 px-3 py-2 bg-slate-50 hover:bg-emerald-50/60 dark:bg-slate-950/30 dark:hover:bg-emerald-950/30 border border-slate-150 dark:border-slate-800/80 rounded-xl text-left transition-colors cursor-pointer group"
                            >
                              <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />
                              <span className="text-[11px] font-extrabold text-slate-700 dark:text-slate-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                                Compartir por WhatsApp
                              </span>
                            </a>

                            <a
                              href={`mailto:?subject=${encodeURIComponent("Simulación de comisiones de TPV en México")}&body=${encodeURIComponent(getShareMessage())}`}
                              onClick={() => setIsShareOpen(false)}
                              className="w-full flex items-center gap-2.5 px-3 py-2 bg-slate-50 hover:bg-sky-50/60 dark:bg-slate-950/30 dark:hover:bg-sky-950/30 border border-slate-150 dark:border-slate-800/80 rounded-xl text-left transition-colors cursor-pointer group"
                            >
                              <Mail className="w-3.5 h-3.5 text-sky-500" />
                              <span className="text-[11px] font-extrabold text-slate-700 dark:text-slate-300 group-hover:text-sky-600 dark:group-hover:text-sky-400">
                                Compartir por Correo
                              </span>
                            </a>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* ==========================================
                SIDE-BY-SIDE COMPARISON PANEL (UP TO 3)
                ========================================== */}
            {selectedComparison.length > 0 && results.length > 0 && (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 md:p-6 mb-8 text-white shadow-xl shadow-indigo-950/20 animate-fadeIn">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                      <Columns className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold tracking-tight uppercase text-indigo-200">
                        Comparativa Lado a Lado
                      </h4>
                      <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                        Análisis cara a cara de tus terminales seleccionadas ({selectedComparison.length} de 3)
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsConfiguring(!isConfiguring)}
                      className={`text-[10px] uppercase font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer select-none flex items-center gap-1.5 border ${
                        isConfiguring 
                          ? "bg-indigo-600 text-white border-indigo-700" 
                          : "text-indigo-400 hover:text-white border-slate-800 hover:border-slate-700 bg-slate-950/40"
                      }`}
                    >
                      <Settings className="w-3.5 h-3.5" />
                      {isConfiguring ? "Cerrar Ajustes" : "Configurar Defaults"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedComparison([]);
                        setIsConfiguring(false);
                      }}
                      className="text-[10px] uppercase font-bold text-slate-400 hover:text-white border border-slate-800 hover:border-slate-750 bg-slate-950/40 px-3 py-1.5 rounded-lg transition-all cursor-pointer select-none"
                    >
                      Limpiar selección
                    </button>
                  </div>
                </div>

                {isConfiguring && (
                  <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 md:p-5 mb-5 space-y-4 animate-fadeIn">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                      <div>
                        <h5 className="text-xs sm:text-sm font-black text-indigo-300">
                          ⚙️ Selecciona tus TPVs Favoritas (Máximo 3)
                        </h5>
                        <p className="text-[10px] text-slate-400 mt-0.5 font-medium">
                          Estas terminales se mostrarán por defecto cuando realices cualquier cálculo de comisiones.
                        </p>
                      </div>
                      <span className="text-[9px] uppercase font-black text-indigo-400 bg-indigo-950/60 border border-indigo-900/40 px-2 py-0.5 rounded shrink-0 self-start sm:self-center">
                        Preferencia local Guardada
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {providers.map((p) => {
                        const isSelected = selectedComparison.includes(p.name);
                        return (
                          <label 
                            key={p.name}
                            className={`flex items-center gap-2 border rounded-xl p-2.5 cursor-pointer transition-all leading-snug select-none ${
                              isSelected 
                                ? "bg-indigo-950/50 border-indigo-500/50 text-white" 
                                : "bg-slate-900/30 border-slate-800/80 hover:border-slate-700 text-slate-400 hover:text-slate-200"
                            }`}
                          >
                            <input 
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => {
                                if (isSelected) {
                                  setSelectedComparison(selectedComparison.filter((n) => n !== p.name));
                                } else {
                                  if (selectedComparison.length >= 3) {
                                    // replace oldest item to respect the 3-items constraint
                                    setSelectedComparison([...selectedComparison.slice(1), p.name]);
                                  } else {
                                    setSelectedComparison([...selectedComparison, p.name]);
                                  }
                                }
                              }}
                              className="w-4 h-4 text-indigo-650 rounded bg-slate-905 border-slate-700 focus:ring-indigo-500 rounded-sm"
                            />
                            <BrandLogo name={p.name} size="xs" />
                            <div className="flex flex-col text-left">
                              <span className="text-xs font-bold leading-tight">{p.name}</span>
                              <span className="text-[9px] text-slate-500">{(p.baseRate * 100).toFixed(1)}% tasa base</span>
                            </div>
                          </label>
                        );
                      })}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          localStorage.setItem("default_providers_comparison", JSON.stringify(selectedComparison));
                          setConfigSavedToast(true);
                          setTimeout(() => {
                            setConfigSavedToast(false);
                            setIsConfiguring(false);
                          }, 2000);
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all px-4 py-2 border border-indigo-750 rounded-xl cursor-pointer select-none"
                      >
                        <Save className="w-3.5 h-3.5" />
                        Guardar como predeterminado
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => {
                          localStorage.removeItem("default_providers_comparison");
                          // Reset to current calculated top 3
                          const topThree = results.slice(0, 3).map(r => r.name);
                          setSelectedComparison(topThree);
                          setConfigSavedToast(true);
                          setTimeout(() => {
                            setConfigSavedToast(false);
                            setIsConfiguring(false);
                          }, 2000);
                        }}
                        className="text-xs font-bold text-slate-405 hover:text-slate-200 hover:underline px-2 py-2 select-none cursor-pointer"
                        title="Restablece la selección inteligente de mayores ventas"
                      >
                        Restablecer a auto-selección
                      </button>

                      {configSavedToast && (
                        <span className="text-xs text-emerald-400 font-extrabold flex items-center gap-1 animate-pulse">
                          <Check className="w-3.5 h-3.5" /> ¡Preferencia Guardada!
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <div className={`grid gap-4 ${
                  selectedComparison.length === 1 
                    ? "grid-cols-1" 
                    : selectedComparison.length === 2 
                      ? "grid-cols-1 md:grid-cols-2" 
                      : "grid-cols-1 md:grid-cols-3"
                }`}>
                  {selectedComparison.map((provName) => {
                    const r = results.find((res) => res.name === provName);
                    if (!r) return null;

                    const provDetails = providers.find((p) => p.name === provName);
                    const bestPayout = results[0]?.netPayout || 0;
                    const isBest = r.netPayout === bestPayout;
                    const diff = r.netPayout - bestPayout;

                    return (
                      <div 
                        key={r.name}
                        className="bg-slate-950/60 border border-slate-800/80 hover:border-indigo-500/35 rounded-2xl p-4 md:p-5 flex flex-col justify-between transition-all duration-300 group relative shadow-inner"
                      >
                        {/* Remove from comparison button */}
                        <button
                          type="button"
                          onClick={() => toggleComparison(r.name)}
                          className="absolute top-3.5 right-3.5 text-slate-400 hover:text-white hover:bg-slate-800/70 p-1 rounded-lg transition-all cursor-pointer select-none"
                          title="Eliminar de la comparación"
                        >
                          <X className="w-4 h-4" />
                        </button>

                        <div>
                          {/* Header */}
                          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800/85">
                            <span 
                              className="w-2.5 h-2.5 rounded-full shrink-0" 
                              style={{ backgroundColor: r.color }}
                            />
                            <div>
                              <h5 className="font-extrabold text-base text-slate-100 group-hover:text-white leading-tight">{r.name}</h5>
                              <span className="text-[9px] font-extrabold uppercase bg-slate-900 text-slate-400 px-2 py-0.5 rounded border border-slate-800/60 mt-1 inline-block">
                                {isBest ? "★ Recomendado" : "Opción Alternativa"}
                              </span>
                            </div>
                          </div>

                          {/* Key Metric: Net Deposit */}
                          <div className="py-4 text-center bg-slate-900/50 border border-slate-805/70 rounded-xl my-4">
                            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                              Depósito Neto Recibido
                            </span>
                            <p className="text-2xl md:text-3xl font-black text-white mt-1">
                              ${r.netPayout.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                            
                            {/* Difference tag */}
                            {isBest ? (
                              <span className="text-[10px] text-emerald-400 font-extrabold mt-1.5 inline-flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                                <Check className="w-3 h-3" /> ¡Mejor opción!
                              </span>
                            ) : (
                              <span className="text-[10px] text-rose-400 font-bold mt-1.5 inline-flex items-center gap-1 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                                Pierdes ${Math.abs(diff).toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                              </span>
                            )}
                          </div>

                          {/* Breakdown list */}
                          <div className="space-y-2 text-xs">
                            <div className="flex justify-between items-center bg-slate-900/35 p-2 rounded border border-slate-850/50">
                              <span className="text-slate-450 text-slate-400 font-semibold">Monto Venta:</span>
                              <span className="font-bold text-slate-250 text-slate-200">${parseFloat(amount).toLocaleString("es-MX", { minimumFractionDigits: 2 })}</span>
                            </div>
                            <div className="flex justify-between items-center bg-slate-900/35 p-2 rounded border border-slate-850/50">
                              <span className="text-slate-450 text-slate-400 font-semibold">Tasa Efectiva:</span>
                              <span className="font-bold text-slate-250 text-slate-200">{(r.usedRate * 100).toFixed(2)}%</span>
                            </div>
                            <div className="flex justify-between items-center bg-slate-900/35 p-2 rounded border border-slate-850/50">
                              <span className="text-slate-450 text-slate-400 font-semibold">Comisión base:</span>
                              <span className="font-bold text-slate-350 text-slate-300">${r.commission.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                            <div className="flex justify-between items-center bg-slate-900/35 p-2 rounded border border-slate-850/50">
                              <span className="text-slate-450 text-slate-400 font-semibold">IVA Retenido (16%):</span>
                              <span className="font-bold text-indigo-300">${r.iva.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                            <div className="flex justify-between items-center bg-indigo-950/20 p-2 rounded border border-indigo-900/30 font-black text-indigo-200 pt-2.5 mt-1">
                              <span>Costo del servicio:</span>
                              <span>${r.totalCommission.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                          </div>
                        </div>

                        {/* Benefits/Acceptance */}
                        {provDetails && provDetails.benefits && (
                          <div className="mt-4 pt-4 border-t border-slate-800/80">
                            <span className="text-[10px] uppercase font-bold text-indigo-300 tracking-wider block mb-2 font-black">
                              Beneficios clave:
                            </span>
                            <ul className="space-y-1.5">
                              {provDetails.benefits.slice(0, 3).map((b, bIdx) => (
                                <li key={bIdx} className="text-[10px] text-slate-300 font-semibold flex items-start gap-1.5">
                                  <span className="text-indigo-400 font-bold shrink-0">•</span>
                                  <span className="leading-tight">{b}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {results.length === 0 ? (
              <div className="text-center py-10 bg-red-50 border border-red-200 text-red-700 rounded-xl font-bold text-xs">
                Introduce un monto válido mayor a $0 para calcular los resultados.
              </div>
            ) : (
              <div className="space-y-4">
                {results.map((r, idx) => {
                  const isWinner = idx === 0;
                  const isLoser = idx === results.length - 1;

                  return (
                    <div 
                      key={r.name}
                      id={`result-row-${r.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className={`relative bg-white border rounded-2xl p-5 md:p-6 transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                        isWinner 
                          ? "border-indigo-600 bg-indigo-50/20 shadow-md ring-2 ring-indigo-605/10 shadow-slate-100" 
                          : "border-slate-200 hover:border-slate-350 shadow-sm"
                      }`}
                    >
                      {/* Left: Brand Metadata */}
                      <div className="flex flex-col items-start gap-2.5">
                        <div className="flex flex-wrap items-center gap-3">
                          <BrandLogo name={r.name} size="sm" />
                          <h4 className="text-slate-900 text-lg font-black leading-none">{r.name}</h4>
                          
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleComparison(r.name);
                            }}
                            className={`inline-flex items-center gap-1 text-[9px] font-extrabold uppercase px-2 py-1 rounded transition-all select-none cursor-pointer ${
                              selectedComparison.includes(r.name)
                                ? "bg-indigo-600 text-white border-indigo-605"
                                : "bg-slate-50 text-slate-500 border-slate-200 hover:border-slate-305 hover:bg-slate-100"
                            }`}
                          >
                            {selectedComparison.includes(r.name) ? (
                              <>
                                <Check className="w-2.5 h-2.5 text-white" />
                                Comparando ({selectedComparison.indexOf(r.name) + 1}/3)
                              </>
                            ) : (
                              <>
                                <Plus className="w-2.5 h-2.5 text-slate-400" />
                                Comparar
                              </>
                            )}
                          </button>

                          {/* Badges */}
                          {isWinner && (
                            <span className="text-[9px] font-extrabold uppercase bg-emerald-50 text-emerald-700 tracking-wider px-2 py-0.5 rounded border border-emerald-200">
                              ★ Mejor Retorno
                            </span>
                          )}
                          {isLoser && (
                            <span className="text-[9px] font-extrabold uppercase bg-red-50 text-red-700 tracking-wider px-2 py-0.5 rounded border border-red-200">
                              Costo Más Alto
                            </span>
                          )}
                        </div>

                        {/* Breakdown Metrics */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-500 mt-1 font-semibold">
                          <div className="flex items-center gap-1">
                            <Percent className="text-slate-400 w-3.5 h-3.5" />
                            <span>Tasa Efectiva: <strong className="text-slate-700">{(r.usedRate * 100).toFixed(2)}%</strong></span>
                            <Tooltip content="Tasa Efectiva: Porcentaje bruto real descontado por la terminal (Tasa base + recargo MSI del plazo elegido, antes de impuestos)." />
                          </div>
                          <div className="flex items-center gap-1">
                            <Coins className="text-slate-400 w-3.5 h-3.5" />
                            <span>Comisión bruta: <strong className="text-slate-700">${r.commission.toFixed(2)}</strong></span>
                            <Tooltip content="Comisión Bruta: Cargo por procesamiento original antes de aplicar el 16% de IVA sobre las comisiones." />
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-slate-400 text-[10px] font-bold">IVA desglosado:</span>
                            <span className="text-slate-700 font-bold">${r.iva.toFixed(2)}</span>
                            <Tooltip content="IVA Desglosado: El 16% de IVA exigegible por ley que se calcula únicamente sobre la comisión bruta de la terminal, no sobre la venta del negocio." />
                          </div>
                        </div>
                      </div>

                      {/* Right: Net deposit value */}
                      <div className="w-full md:w-auto text-left md:text-right border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 min-w-[190px] flex md:flex-col justify-between md:justify-center items-center md:items-end">
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                            Depósito Neto Proyectado
                          </span>
                          <Tooltip content="Depósito Neto: Dinero total líquido que recibirás en tu banco una vez retenidos el costo de operación y su IVA correspondiente." />
                        </div>
                        <span className={`text-2xl font-black tracking-tight block ${isWinner ? 'text-indigo-650' : 'text-slate-800'}`}>
                          ${r.netPayout.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ====================================
            PORTAL LIVE METRIC STATISTICS CARD 
            ==================================== */}
        <div id="stats-dashboard-row" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 bg-white border border-slate-205/65 rounded-2xl p-6 shadow-sm shadow-slate-100">
          <div className="text-center p-3">
            <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 mb-2 shadow-sm">
              <Cpu className="w-4 h-4" />
            </div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Simulaciones Locales</p>
            <p className="text-xl md:text-2xl font-extrabold text-slate-900 mt-1" id="stat-calc-counter">
              {calcCount}
            </p>
          </div>
          
          <div className="text-center p-3 border-t sm:border-t-0 sm:border-x border-slate-100">
            <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 mb-2 shadow-sm">
              <Database className="w-4 h-4" />
            </div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Proveedores Analizados</p>
            <p className="text-xl md:text-2xl font-extrabold text-slate-900 mt-1">
              {providers.length}
            </p>
          </div>

          <div className="text-center p-3 border-t sm:border-t-0 border-slate-100">
            <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 mb-2 shadow-sm">
              <Activity className="w-4 h-4" />
            </div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Nivel de Precisión Legal</p>
            <p className="text-xl md:text-2xl font-extrabold text-slate-900 mt-1">
              99.9%
            </p>
          </div>
        </div>

        {/* ====================================
            AVISO LEGAL Y DESCARGO DE RESPONSABILIDAD
            ==================================== */}
        <div id="legal-disclaimer-container" className="mt-8 bg-slate-50/80 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-4xl mx-auto shadow-xs">
          <div className="flex gap-4">
            <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 shrink-0 shadow-2xs">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2 sm:gap-0">
                <ShieldAlert className="w-4 h-4 text-slate-500 block sm:hidden shrink-0" />
                <h4 className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">
                  Aviso Legal y de Exclusión de Responsabilidad (Disclaimer)
                </h4>
              </div>
              <p>
                Los cálculos, comparativas de comisiones y resultados proyectados en esta plataforma son generados con fines <strong>estrictamente informativos, pedagógicos, de simulación y referencia orientativa</strong>. El usuario reconoce y acepta que las tasas, comisiones adicionales, recargos por meses sin intereses (MSI), e impuestos de las terminales de pago cambian con frecuencia según las políticas internas de cada proveedor y las condiciones del mercado.
              </p>
              <p>
                Este simulador no constituye ni debe interpretarse como asesoría financiera, fiscal, contable, mercantil, contractual o jurídica personalizada. La plataforma y sus creadores quedan <strong>exentos de cualquier tipo de responsabilidad civil, penal, administrativa o comercial</strong> ante decisiones de negocio tomadas a partir de estos simuladores, pérdidas financieras, errores de captura, interpretaciones incorrectas de tasas efectivas, o cualquier infracción administrativa o fiscal imputable al usuario o terceros relacionados con la comparación de estos datos.
              </p>
              <p className="text-[11px] font-medium text-slate-600 dark:text-slate-400">
                Para decisiones comerciales definitivas y validez jurídica, el usuario asume la total obligación de verificar y contrastar los datos, comisiones y contratos directamente en los portales oficiales y contratos vigentes de cada marca proveedora autorizada.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
