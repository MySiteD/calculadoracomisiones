import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle, ChevronDown, Sparkles, Send, Copy, Check, MessageSquare, ShieldAlert, FileText, Landmark, RefreshCw } from "lucide-react";

// Predefined frequently asked questions / sales objections in Mexico
interface FaqItem {
  id: string;
  question: string;
  icon: React.ComponentType<any>;
  defaultAnswer?: string; // Optional pre-loaded answer to save API requests, or fetch on demand
  category: "Legal" | "Comisiones" | "Impuestos" | "Negocio";
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "cobro-comision-cliente",
    question: "¿Es legal o recomendable cobrar la comisión de la terminal al cliente final?",
    icon: ShieldAlert,
    category: "Legal",
    defaultAnswer: `### Respuesta Clara y Directa
**No es legal ni recomendable.** Los contratos de afiliación de las TPVs (y las pautas de CONDUSEF) prohíben estrictamente transferir la comisión de forma directa al consumidor (comúnmente llamada recargo del 3% al 5%). Esta práctica desincentiva el uso de pagos electrónicos y puede causar que tu negocio sea multado o le cancelen el servicio.

### Estrategia para Resolver la Objeción
En lugar de cobrar la comisión por separado como una penalización, **absorbe el costo en tu estructura de precios general**. Los clientes valoran más la transparencia y odian sentir que se les cobra extra por pagar con tarjeta. Ofrecer pago con tarjeta incrementa tus ventas totales hasta un 30% y aumenta el ticket de compra, compensando con creces la comisión. Puedes implementar un sutil aumento general o promocionar "Precios con descuento en efectivo" si prefieres diferenciar.

### Speech Recomendado para el Cliente
*"Para tu comodidad, el precio de nuestros productos ya incluye todas las facilidades de pago. Puedes pagar con tarjeta de débito, crédito o efectivo exactamente el mismo precio, sin recargos sorpresa."*`
  },
  {
    id: "comparativa-comisiones",
    question: "¿Por qué terminales como Clip cobran más comisión que opciones como Ualá Bis?",
    icon: Landmark,
    category: "Comisiones",
    defaultAnswer: `### Respuesta Clara y Directa
**Por el valor agregado en soporte, inmediatez y accesibilidad.** Mientras que **Ualá Bis** ofrece una tasa muy baja (2.9% + IVA) para atraer usuarios, requiere un proceso de registro 100% digital y su ecosistema de retiros o dispositivos es más limitado. **Clip** cobra una tasa estándar (3.6% + IVA) porque invierte fuertemente en soporte físico en miles de tiendas de autoservicio, depósitos rápidos de 4 horas (incluso fines de semana), y tiene una de las aplicaciones de punto de venta más amigables y compatibles con cualquier celular.

### Estrategia para Resolver la Objeción
No veas la comisión como un gasto aislado, sino como una **inversión en operatividad**. Si tu negocio requiere liquidez los domingos por la noche o soporte inmediato en caso de fallas, la infraestructura de Clip o Mercado Pago justifica esa diferencia del 0.7%. Si tu volumen es alto y tienes la paciencia de esperar depósitos estándar, Ualá Bis es excelente para maximizar tu margen.

### Speech Recomendado para el Cliente
*"Aceptamos pagos con terminales Clip y Mercado Pago para garantizarte transacciones 100% seguras y un cobro inmediato sin fallas en el sistema, respaldados por la mejor tecnología disponible en México."*`
  },
  {
    id: "funcionamiento-msi",
    question: "¿Cómo funcionan realmente los Meses Sin Intereses (MSI) y quién los paga?",
    icon: FileText,
    category: "Comisiones",
    defaultAnswer: `### Respuesta Clara y Directa
**El banco financia al cliente, y el negocio paga una sobretasa de descuento.** Cuando un cliente compra a MSI (por ejemplo, a 3 meses), el banco le cobra en plazos mensuales a su tarjeta de crédito. Sin embargo, **tú como negocio recibes el dinero de la venta completo en un solo pago** (en tu plazo de depósito habitual), pero se te descuenta la comisión base más una comisión adicional llamada **Sobretasa de MSI** (que varía según el plazo elegido, de 3% a 15%).

### Estrategia para Resolver la Objeción
Los MSI son la herramienta número uno para elevar el ticket promedio (sobre todo en compras mayores a $1,000 MXN). El cliente se anima a llevar un producto más caro porque lo ve como pagos pequeños de bolsillo. Para no perder margen, **calcula la sobretasa y aplícala únicamente a compras mínimas establecidas** (ej: mínimo $1,500 MXN a 3 MSI), o ajusta el precio de lista para que absorba este costo financiero.

### Speech Recomendado para el Cliente
*"¡Claro que sí! Contamos con hasta 3 o 6 Meses Sin Intereses en compras mínimas de $1,200 pesos con todas las tarjetas participantes, para que te lleves lo mejor hoy mismo sin presionar tu presupuesto diario."*`
  },
  {
    id: "comisiones-impuestos-sat",
    question: "¿Las comisiones cobradas por las terminales son deducibles ante el SAT?",
    icon: FileText,
    category: "Impuestos",
    defaultAnswer: `### Respuesta Clara y Directa
**Sí, son 100% deducibles de impuestos.** Al ser un costo indispensable para la operación de tu negocio, el SAT permite deducir tanto la comisión que te cobra el agregador como el **16% de IVA** de dicha comisión. Para hacerlo válido, la plataforma de pago (como Clip, Mercado Pago o Paypal) está obligada a emitirte una factura electrónica (CFDI) mensual con el desglose de todas las retenciones realizadas.

### Estrategia para Resolver la Objeción
Dado que son deducibles, el costo real de recibir tarjeta es menor al porcentaje nominal. Al presentar tus declaraciones fiscales, este gasto disminuye tu base gravable de ISR y puedes acreditar el IVA a tu favor. Asegúrate de registrar tu RFC en la aplicación de tu terminal desde el primer día para que te facturen en automático y tu contador pueda deducir estos costos mensualmente sin complicaciones.

### Speech Recomendado para el Cliente
*"Para tu tranquilidad, todas nuestras operaciones son formales y transparentes. Aceptamos tu tarjeta de débito o crédito y, si lo requieres, podemos emitirte tu factura fiscal de inmediato sin cargos adicionales."*`
  },
  {
    id: "miedo-sat-efectivo",
    question: "Prefiero solo recibir efectivo porque me preocupa que el SAT me vigile y audite. ¿Por qué cambiar?",
    icon: ShieldAlert,
    category: "Negocio",
    defaultAnswer: `### Respuesta Clara y Directa
**Porque el efectivo tiene costos ocultos altísimos y limita tu crecimiento.** Hoy en día, limitar tu negocio a efectivo por miedo al fisco te hace perder entre el **30% y 50% de las ventas potenciales**, ya que la mayoría de los consumidores activos prefieren no cargar efectivo por seguridad y comodidad. Además, mantener efectivo físico en caja te expone a robos, pérdidas, errores al dar cambio ("robos hormiga") y gastos de transportación física del dinero.

### Estrategia para Resolver la Objeción
El SAT en México ya rastrea los flujos de efectivo mediante depósitos en efectivo que superen los límites mensuales permitidos. Formalizar tus cobros con tarjeta de forma controlada te da acceso inmediato a **historial financiero sólido**, el cual puedes usar para calificar a **créditos PyME preferenciales** (que terminales como Mercado Pago otorgan de forma casi instantánea según tus ventas). El crecimiento en ventas compensa por mucho el orden contable necesario.

### Speech Recomendado para el Cliente
*"Aceptamos cobros digitales para tu seguridad y comodidad, evitando que tengas que buscar un cajero o traer efectivo contigo. Puedes pagar con tarjeta o QR de forma ágil e inmediata."*`
  }
];

// Helper to render Markdown cleanly
const MarkdownRenderer: React.FC<{ text: string }> = ({ text }) => {
  const parseMarkdown = (rawText: string) => {
    const lines = rawText.split("\n");
    return lines.map((line, index) => {
      const trimmed = line.trim();

      if (trimmed.startsWith("*") || trimmed.startsWith("-")) {
        const listContent = trimmed.substring(1).trim();
        return (
          <li key={index} className="ml-5 list-disc text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-1 leading-relaxed font-semibold">
            {renderBoldText(listContent)}
          </li>
        );
      }

      if (trimmed.startsWith("###")) {
        return (
          <h4 key={index} className="text-xs sm:text-sm font-extrabold text-indigo-650 dark:text-indigo-400 tracking-tight mt-4 mb-1.5 flex items-center gap-2 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            {trimmed.replace(/^###\s*/, "")}
          </h4>
        );
      }
      if (trimmed.startsWith("##")) {
        return (
          <h3 key={index} className="text-sm sm:text-base font-black text-slate-800 dark:text-white mt-5 mb-2 border-b border-slate-100 dark:border-slate-800 pb-1">
            {trimmed.replace(/^##\s*/, "")}
          </h3>
        );
      }
      if (trimmed.startsWith("#")) {
        return (
          <h2 key={index} className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-6 mb-3">
            {trimmed.replace(/^#\s*/, "")}
          </h2>
        );
      }

      if (trimmed === "") {
        return <div key={index} className="h-2" />;
      }

      return (
        <p key={index} className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-2 font-medium">
          {renderBoldText(trimmed)}
        </p>
      );
    });
  };

  const renderBoldText = (textSegment: string) => {
    const parts = textSegment.split(/\*\*([\s\S]+?)\*\*/g);
    return parts.map((part, i) => {
      if (i % 2 === 1) {
        return <strong key={i} className="font-extrabold text-slate-900 dark:text-white underline decoration-indigo-500/20">{part}</strong>;
      }
      return part;
    });
  };

  return <div className="space-y-1 font-sans">{parseMarkdown(text)}</div>;
};

export default function FaqSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [faqAnswers, setFaqAnswers] = useState<Record<string, string>>(() => {
    // Populate with default pre-calculated answers to avoid unnecessary API requests initially
    const initial: Record<string, string> = {};
    FAQ_ITEMS.forEach(item => {
      if (item.defaultAnswer) {
        initial[item.id] = item.defaultAnswer;
      }
    });
    return initial;
  });

  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [customQuestion, setCustomQuestion] = useState("");
  const [customAnswer, setCustomAnswer] = useState<string | null>(null);
  const [customLoading, setCustomLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleToggle = async (id: string, questionText: string) => {
    if (activeId === id) {
      setActiveId(null);
      return;
    }

    setActiveId(id);

    // If answer doesn't exist, we can fetch from server in real-time
    if (!faqAnswers[id] && !loadingId) {
      setLoadingId(id);
      try {
        const response = await fetch("/api/faq-answer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: questionText })
        });
        const data = await response.json();
        if (data.answer) {
          setFaqAnswers(prev => ({ ...prev, [id]: data.answer }));
        } else if (data.error) {
          setFaqAnswers(prev => ({ ...prev, [id]: `Ocurrió un error: ${data.error}` }));
        }
      } catch (err) {
        console.error("Error fetching FAQ answer:", err);
        setFaqAnswers(prev => ({ ...prev, [id]: "No pudimos conectar con el consultor de IA en este momento. Intenta de nuevo." }));
      } finally {
        setLoadingId(null);
      }
    }
  };

  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuestion.trim() || customLoading) return;

    setCustomLoading(true);
    setCustomAnswer(null);

    try {
      const response = await fetch("/api/faq-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: customQuestion })
      });
      const data = await response.json();
      if (data.answer) {
        setCustomAnswer(data.answer);
      } else {
        setCustomAnswer(`Error: ${data.error || "No se pudo generar una respuesta."}`);
      }
    } catch (err) {
      console.error("Error asking custom question:", err);
      setCustomAnswer("No se pudo obtener respuesta de la IA. Por favor, verifica tu conexión a internet o los secretos del servidor.");
    } finally {
      setCustomLoading(false);
    }
  };

  const handleCopyText = (text: string, id: string) => {
    // Extract only the recommended speech/dialogue if possible, or copy whole text
    let textToCopy = text;
    const speechMatch = text.match(/Speech Recomendado para el Cliente[\s\S]*?\*\"([\s\S]+?)\"\*/i);
    if (speechMatch && speechMatch[1]) {
      textToCopy = `"${speechMatch[1].trim()}"`;
    }

    navigator.clipboard.writeText(textToCopy);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section 
      id="faqs" 
      className="py-16 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-900 transition-colors duration-300"
    >
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 text-indigo-700 dark:text-indigo-400 text-[10px] font-black uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Ventas y Objeciones con Inteligencia Artificial
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
            Preguntas Frecuentes y Objeciones de Venta
          </h2>
          <p className="text-sm text-slate-550 dark:text-slate-400 font-semibold max-w-2xl mx-auto leading-relaxed">
            Resuelve dudas contables, fiscales, miedos de cobro con tarjeta o comisiones y aprende exactamente qué responderle a tus clientes con el apoyo de Gemini.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-3 mb-10" id="faq-accordion">
          {FAQ_ITEMS.map((item) => {
            const IconComponent = item.icon;
            const isOpen = activeId === item.id;
            const answer = faqAnswers[item.id];
            const isLoading = loadingId === item.id;

            return (
              <div 
                key={item.id}
                className={`bg-white dark:bg-slate-900 rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? "border-indigo-300/80 dark:border-indigo-900 shadow-sm shadow-indigo-100/30 dark:shadow-none" 
                    : "border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                {/* Accordion Trigger Header */}
                <button
                  onClick={() => handleToggle(item.id, item.question)}
                  className="w-full text-left p-5 sm:p-6 flex items-start gap-4 justify-between font-bold text-slate-900 dark:text-white focus:outline-none cursor-pointer group"
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-xl transition-all duration-300 ${
                      isOpen 
                        ? "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400" 
                        : "bg-slate-50 dark:bg-slate-950 text-slate-400 group-hover:text-indigo-500"
                    }`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-wider block mb-1">
                        {item.category}
                      </span>
                      <span className="text-sm sm:text-base font-extrabold tracking-tight block">
                        {item.question}
                      </span>
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0 mt-1 transition-transform duration-300 ${isOpen ? "rotate-180 text-indigo-650" : ""}`} />
                </button>

                {/* Accordion Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-6 sm:px-6 sm:pb-8 pt-1 border-t border-slate-50 dark:border-slate-850/50">
                        {isLoading ? (
                          <div className="space-y-3.5 animate-pulse">
                            <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-md w-1/4" />
                            <div className="h-3.5 bg-slate-100 dark:bg-slate-800 rounded-md w-full" />
                            <div className="h-3.5 bg-slate-100 dark:bg-slate-800 rounded-md w-5/6" />
                            <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-md w-1/3 pt-3" />
                            <div className="h-3.5 bg-slate-100 dark:bg-slate-800 rounded-md w-full" />
                          </div>
                        ) : answer ? (
                          <div className="relative">
                            <MarkdownRenderer text={answer} />
                            
                            {/* Copy button specifically for copy-pasting client speech */}
                            <div className="mt-5 pt-4 border-t border-slate-50 dark:border-slate-850/40 flex justify-end">
                              <button
                                onClick={() => handleCopyText(answer, item.id)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider bg-slate-50 hover:bg-indigo-50 dark:bg-slate-950 dark:hover:bg-indigo-950/40 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 border border-slate-150 dark:border-slate-800/80 hover:border-indigo-200 transition-colors cursor-pointer"
                                title="Copiar frase sugerida para usar con el cliente"
                              >
                                {copiedId === item.id ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                                    <span>¡Copiado al portapapeles!</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5" />
                                    <span>Copiar Speech de Venta</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-xs text-slate-400">Hubo un problema al cargar el análisis.</p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Custom AI Objections Box */}
        <div className="bg-gradient-to-r from-indigo-50 to-indigo-50/50 dark:from-indigo-950/10 dark:to-indigo-950/5 border border-indigo-100/70 dark:border-indigo-900/40 rounded-3xl p-6 sm:p-8">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-600/10 shrink-0">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
                ¿Tienes otra duda u objeción? ¡Pregúntale a la IA!
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                Ingresa cualquier objeción de tus clientes (ej. "Me da desconfianza la seguridad" o "Prefiero efectivo") y obtén una estrategia instantánea para salvar la venta.
              </p>
            </div>
          </div>

          <form onSubmit={handleCustomSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={customQuestion}
                onChange={(e) => setCustomQuestion(e.target.value)}
                placeholder="Ej. Mi cliente dice que las terminales cobran comisiones fantasmas o le clonan la tarjeta..."
                className="w-full px-4 py-3.5 pr-12 rounded-2xl border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-800 dark:text-white placeholder:text-slate-400 font-semibold focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-950/50 transition-all shadow-2xs"
                maxLength={200}
                required
              />
              <button
                type="submit"
                disabled={customLoading || !customQuestion.trim()}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 dark:disabled:text-slate-600 cursor-pointer disabled:cursor-not-allowed transition-all"
              >
                {customLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Custom Answer Result Area */}
            <AnimatePresence>
              {customAnswer && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-indigo-100 dark:border-indigo-900/50 p-5 sm:p-6 shadow-xs"
                >
                  <div className="flex items-center justify-between mb-3 border-b border-slate-100 dark:border-slate-850 pb-2">
                    <span className="text-[10px] text-indigo-650 dark:text-indigo-400 font-black uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Análisis del Consultor IA
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyText(customAnswer, "custom-ai")}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider bg-slate-50 hover:bg-indigo-50 dark:bg-slate-950 dark:hover:bg-indigo-950/40 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 border border-slate-150 dark:border-slate-800/80 transition-colors"
                    >
                      {copiedId === "custom-ai" ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-500" />
                          <span>¡Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copiar Speech</span>
                        </>
                      )}
                    </button>
                  </div>
                  <MarkdownRenderer text={customAnswer} />
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>

      </div>
    </section>
  );
}
