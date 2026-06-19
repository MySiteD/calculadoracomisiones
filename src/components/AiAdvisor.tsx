import React, { useState } from "react";
import { Sparkles, ArrowRight, Loader2, RefreshCw, Send, CheckCircle } from "lucide-react";

// Robust, lightweight custom Markdown-to-HTML parser for React 19
const MarkdownRenderer: React.FC<{ text: string }> = ({ text }) => {
  const parseMarkdown = (rawText: string) => {
    // Split by lines
    const lines = rawText.split("\n");
    return lines.map((line, index) => {
      const trimmed = line.trim();

      // Check for bullet items
      if (trimmed.startsWith("*") || trimmed.startsWith("-")) {
        const listContent = trimmed.substring(1).trim();
        return (
          <li key={index} className="ml-5 list-disc text-xs sm:text-sm text-slate-600 dark:text-slate-350 mb-1 leading-relaxed">
            {renderBoldText(listContent)}
          </li>
        );
      }

      // Check for main subheaders
      if (trimmed.startsWith("###")) {
        return (
          <h4 key={index} className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white tracking-tight mt-5 mb-2 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-indigo-650 dark:text-indigo-400 shrink-0" />
            {trimmed.replace(/^###\s*/, "")}
          </h4>
        );
      }
      if (trimmed.startsWith("##")) {
        return (
          <h3 key={index} className="text-base sm:text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-indigo-900 dark:from-indigo-400 dark:to-indigo-300 mt-6 mb-3 border-b border-slate-100 dark:border-slate-800 pb-1">
            {trimmed.replace(/^##\s*/, "")}
          </h3>
        );
      }
      if (trimmed.startsWith("#")) {
        return (
          <h2 key={index} className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-8 mb-4">
            {trimmed.replace(/^#\s*/, "")}
          </h2>
        );
      }

      // Default paragraph
      if (trimmed === "") {
        return <div key={index} className="h-2.5" />;
      }

      return (
        <p key={index} className="text-xs sm:text-sm text-slate-755 dark:text-slate-300 leading-relaxed mb-2.5">
          {renderBoldText(trimmed)}
        </p>
      );
    });
  };

  const renderBoldText = (textSegment: string) => {
    // Basic bold parsing: **bold** -> <strong>bold</strong>
    const parts = textSegment.split(/\*\*([\s\S]+?)\*\*/g);
    return parts.map((part, i) => {
      if (i % 2 === 1) {
        return <strong key={i} className="font-extrabold text-slate-950 dark:text-white underline decoration-indigo-500/30">{part}</strong>;
      }
      return part;
    });
  };

  return <div className="space-y-1 font-sans">{parseMarkdown(text)}</div>;
};

export default function AiAdvisor() {
  const [businessType, setBusinessType] = useState("Tienda de Comestibles");
  const [monthlyVolume, setMonthlyVolume] = useState("$20,000 - $50,000");
  const [avgTicket, setAvgTicket] = useState("$100 - $300");
  const [acceptsMsi, setAcceptsMsi] = useState(false);
  const [preferredPlazo, setPreferredPlazo] = useState("Ninguno");
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setAnalysisResult(null);

    try {
      const response = await fetch("/api/advisor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          businessType,
          monthlyVolume,
          avgTicket,
          acceptsMsi,
          preferredPlazo: acceptsMsi ? preferredPlazo : "Ninguno",
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Ocurrió un error en el servidor.");
      }

      setAnalysisResult(data.analysis);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err?.message || "Incapaz de conectar con el servidor de análisis financiero.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section 
      id="asesor-ai"
      className="py-24 bg-white dark:bg-slate-900/35 border-y border-slate-100/80 dark:border-slate-900/40 rounded-[3rem] shadow-sm relative overflow-hidden z-10 transition-colors duration-300"
    >
      {/* Velvet Smart Glowing ambient halos for interactive AI experience */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-violet-500/5 dark:bg-violet-500/10 rounded-full blur-[90px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: "8s" }} />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-fuchsia-500/5 dark:bg-fuchsia-500/10 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: "12s" }} />

      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        
        {/* Header content section */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 dark:bg-indigo-950/40 dark:border-indigo-900/40 text-indigo-700 dark:text-indigo-400 text-[10px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Mejora interactiva AI
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-3">
            Consultor de Terminales Inteligente
          </h2>
          <p className="text-xs sm:text-sm text-slate-505 dark:text-slate-350 mt-2 font-semibold">
            Nuestro asesor automatizado impulsado por la IA de <strong className="text-indigo-650 dark:text-indigo-400">Gemini 3.5</strong> analizará las comisiones e IVA para optimizar tus márgenes y sugerirte el mejor proveedor.
          </p>
        </div>

        {/* Dynamic Consultation Container layout */}
        <div className="bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-105/50 dark:shadow-[0_15px_30px_rgba(0,0,0,0.30)]">
          {!analysisResult ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* 1. Business Category */}
                <div className="space-y-2">
                  <label htmlFor="businessType" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    ¿Cuál es el giro o modelo de tu negocio?
                  </label>
                  <select
                    id="businessType"
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-xl py-3 px-4 text-xs sm:text-sm tracking-wide focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none shadow-sm"
                  >
                    <option value="Abarrotes y Minisuper" className="dark:bg-slate-900">Abarrotes, Minisuper o Tiendita</option>
                    <option value="Restaurante o Cafetería" className="dark:bg-slate-900">Restaurante, Cafetería o Alimentos</option>
                    <option value="Boutique de Ropa/Moda" className="dark:bg-slate-900">Boutique de Ropa, Calzado o Accesorios</option>
                    <option value="Servicios Profesionales" className="dark:bg-slate-900">Servicios Profesionales o Consultoría</option>
                    <option value="Estética, Barbería o Belleza" className="dark:bg-slate-900">Estética, Barbería o Salón de Belleza</option>
                    <option value="Comercio en Línea / E-commerce" className="dark:bg-slate-900">E-commerce o Ventas Online</option>
                    <option value="Consultorio de Salud o Clínica" className="dark:bg-slate-900">Consultorio Médico, Dental o Salud</option>
                    <option value="Otro Comercio Físico" className="dark:bg-slate-900">Otro Comercio / Negocio Local</option>
                  </select>
                </div>

                {/* 2. Monthly Volume */}
                <div className="space-y-2">
                  <label htmlFor="monthlyVolume" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    Volumen de ventas mensual con tarjetas (MXN)
                  </label>
                  <select
                    id="monthlyVolume"
                    value={monthlyVolume}
                    onChange={(e) => setMonthlyVolume(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-xl py-3 px-4 text-xs sm:text-sm tracking-wide focus:border-indigo-505 focus:bg-white dark:focus:bg-slate-900 focus:outline-none shadow-sm"
                  >
                    <option value="Menos de $10,000 MXN" className="dark:bg-slate-900">Menos de $10,000 MXN</option>
                    <option value="Entre $10,000 y $30,000 MXN" className="dark:bg-slate-900">Entre $10,000 y $30,000 MXN</option>
                    <option value="Entre $30,000 y $80,000 MXN" className="dark:bg-slate-900">Entre $30,000 y $80,000 MXN</option>
                    <option value="Entre $80,000 y $200,000 MXN" className="dark:bg-slate-900">Entre $80,000 y $200,000 MXN</option>
                    <option value="Más de $200,000 MXN" className="dark:bg-slate-900">Más de $200,000 MXN</option>
                  </select>
                </div>

                {/* 3. Average ticket */}
                <div className="space-y-2">
                  <label htmlFor="avgTicket" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    ¿Cuál es el ticket promedio por cliente?
                  </label>
                  <select
                    id="avgTicket"
                    value={avgTicket}
                    onChange={(e) => setAvgTicket(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-205 dark:border-slate-800 text-slate-805 dark:text-slate-200 rounded-xl py-3 px-4 text-xs sm:text-sm tracking-wide focus:border-indigo-505 focus:bg-white dark:focus:bg-slate-900 focus:outline-none shadow-sm"
                  >
                    <option value="Menos de $100 MXN font" className="dark:bg-slate-900">Menos de $100 MXN</option>
                    <option value="Entre $100 y $300 MXN" className="dark:bg-slate-900">Entre $100 y $300 MXN</option>
                    <option value="Entre $300 y $1,000 MXN" className="dark:bg-slate-900">Entre $300 y $1,000 MXN</option>
                    <option value="Más de $1,000 MXN" className="dark:bg-slate-900">Más de $1,000 MXN</option>
                  </select>
                </div>

                {/* 4. MSI Toggle */}
                <div className="space-y-2">
                  <label htmlFor="acceptsMsi" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    ¿Te interesa cobrar a Meses Sin Intereses?
                  </label>
                  <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-805 rounded-xl py-3.5 px-4 shadow-sm">
                    <input
                      type="checkbox"
                      id="acceptsMsi"
                      checked={acceptsMsi}
                      onChange={(e) => setAcceptsMsi(e.target.checked)}
                      className="w-4.5 h-4.5 text-indigo-650 rounded bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-800 focus:ring-indigo-500 cursor-pointer"
                    />
                    <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-bold cursor-pointer select-none" onClick={() => setAcceptsMsi(!acceptsMsi)}>
                      Sí, deseo ofrecer plazos diferidos (MSI)
                    </span>
                  </div>
                </div>
              </div>

              {/* Dynamic Plazo choice */}
              {acceptsMsi && (
                <div className="space-y-2 animate-fadeIn max-w-md">
                  <label htmlFor="preferredPlazo" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    Plazo de financiamiento prioritario
                  </label>
                  <select
                    id="preferredPlazo"
                    value={preferredPlazo}
                    onChange={(e) => setPreferredPlazo(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-indigo-200 dark:border-indigo-900/50 text-slate-800 dark:text-slate-200 rounded-xl py-3 px-4 text-xs sm:text-sm tracking-wide focus:border-indigo-505 focus:bg-white dark:focus:bg-slate-900 focus:outline-none shadow-sm"
                  >
                    <option value="3 Meses" className="dark:bg-slate-900">3 Meses Sin Intereses</option>
                    <option value="6 Meses" className="dark:bg-slate-900">6 Meses Sin Intereses</option>
                    <option value="9 Meses" className="dark:bg-slate-900">9 Meses Sin Intereses</option>
                    <option value="12 Meses" className="dark:bg-slate-900">12 Meses Sin Intereses</option>
                  </select>
                </div>
              )}

              {/* Submit triggers */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  id="btn-ai-consult"
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-100 disabled:text-slate-400 text-white font-extrabold text-xs tracking-widest uppercase py-4 rounded-xl transition-all duration-300 pointer-events-auto shadow-md shadow-indigo-100 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      Generando Diagnóstico Financiero con IA...
                    </>
                  ) : (
                    <>
                      Enviar Datos al Consultor Financiero
                      <Send className="w-3.5 h-3.5 text-white" />
                    </>
                  )}
                </button>
              </div>

              {/* Error boundary notice */}
              {errorMsg && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-xs text-red-600 text-center font-bold">
                  {errorMsg}
                </div>
              )}
            </form>
          ) : (
            <div className="space-y-6">
              
              {/* Reset view triggers */}
              <div className="flex justify-between items-center border-b border-slate-150 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 text-[10px] uppercase font-extrabold tracking-widest bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-1.5 border border-indigo-100 dark:border-indigo-900/40 rounded-lg">
                  <Sparkles className="w-3.5 h-3.5" />
                  Dictamen Final de Consultoría AI
                </div>
                <button
                  onClick={() => setAnalysisResult(null)}
                  className="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-350 hover:text-indigo-600 dark:hover:text-indigo-400 text-xs font-bold bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 py-2 px-4 rounded-xl transition-colors cursor-pointer"
                  id="reset-advisor"
                >
                  <RefreshCw className="w-3 h-3" />
                  Nueva Consulta
                </button>
              </div>

              {/* Analysis contents */}
              <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-inner text-left max-h-[500px] overflow-y-auto custom-scrollbar">
                <MarkdownRenderer text={analysisResult} />
              </div>

              {/* Footers of consultation */}
              <div className="text-center text-[10px] text-slate-500 dark:text-slate-400 font-bold">
                *Este informe es generado por la Inteligencia Artificial analítica en base a las tarifas estándar vigentes a 2026. Gestiona la contratación final directamente con el proveedor de tu elección.
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
