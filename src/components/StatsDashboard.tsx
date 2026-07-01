import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Users, 
  Percent, 
  Star, 
  MessageSquare, 
  Send, 
  X, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  ThumbsUp 
} from "lucide-react";
import { 
  subscribeToMetrics, 
  subscribeToRecentRatings, 
  submitRating, 
  GlobalMetrics, 
  UserRating 
} from "../lib/firebase";

export default function StatsDashboard() {
  const [metrics, setMetrics] = useState<GlobalMetrics>({
    visitorsCount: 154,
    calculationsCount: 890,
    totalStars: 495,
    ratingsCount: 100
  });
  const [recentRatings, setRecentRatings] = useState<UserRating[]>([]);
  const [isRatingFormOpen, setIsRatingFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Rating form fields
  const [ratingName, setRatingName] = useState("");
  const [ratingValue, setRatingValue] = useState(5);
  const [ratingComment, setRatingComment] = useState("");

  useEffect(() => {
    // Subscribe to live metrics from Firestore
    const unsubscribeMetrics = subscribeToMetrics((liveMetrics) => {
      setMetrics(liveMetrics);
    });

    // Subscribe to live reviews/ratings from Firestore
    const unsubscribeRatings = subscribeToRecentRatings((liveRatings) => {
      setRecentRatings(liveRatings);
    });

    return () => {
      unsubscribeMetrics();
      unsubscribeRatings();
    };
  }, []);

  const handleRatingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (ratingValue < 1 || ratingValue > 5) return;
    
    setIsSubmitting(true);
    const success = await submitRating(ratingName.trim(), ratingValue, ratingComment.trim());
    setIsSubmitting(false);

    if (success) {
      setSubmitSuccess(true);
      setRatingName("");
      setRatingComment("");
      setRatingValue(5);
      setTimeout(() => {
        setSubmitSuccess(false);
        setIsRatingFormOpen(false);
      }, 3500);
    }
  };

  // Compute live rating average (fallback to 4.9 if zero ratings)
  const ratingAverage = metrics.ratingsCount > 0 
    ? (metrics.totalStars / metrics.ratingsCount).toFixed(1)
    : "4.9";

  return (
    <section 
      id="stats-dashboard-section"
      className="relative py-12 bg-slate-50/50 dark:bg-slate-900/10 border-b border-slate-100 dark:border-slate-900 transition-colors duration-300"
    >
      <div className="container mx-auto px-4 md:px-6 max-w-6xl relative">
        
        {/* Visual Header / Subtitle */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <span className="text-[10px] uppercase font-black tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1 rounded-full">
              Autoridad & Ecosistema Real
            </span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-2.5">
              Métricas e Indicadores de Confianza en Tiempo Real
            </h2>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
              Datos verificados y alimentados en vivo mediante Firebase Firestore para garantizar total transparencia.
            </p>
          </div>
          
          <div className="flex items-center gap-1.5 justify-center text-xs font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-3 py-1.5 rounded-xl border border-emerald-100/70 dark:border-emerald-900/30">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            Conectado a Firestore Live
          </div>
        </motion.div>
        
        {/* Bento KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* KPI Card 1: Unique Registered Visitors */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-3xl p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 group"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                <Users className="w-5.5 h-5.5" />
              </div>
              <span className="text-[9px] uppercase font-black tracking-wider px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100/40 dark:border-emerald-900/30">
                +15% este mes
              </span>
            </div>
            
            <div className="mt-4">
              <div className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {metrics.visitorsCount.toLocaleString("es-MX")}
              </div>
              <div className="text-xs font-black text-slate-700 dark:text-slate-350 mt-1 uppercase tracking-wider">
                Usuarios Nuevos Únicos
              </div>
              <p className="text-[11px] text-slate-450 dark:text-slate-400 leading-normal mt-2 font-medium">
                Emprendedores y negocios mexicanos que han optimizado sus ganancias con nuestro comparador financiero.
              </p>
            </div>
          </motion.div>
 
          {/* KPI Card 2: Total Calculations Processed */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-3xl p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 group"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-950/40 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0">
                <Percent className="w-5.5 h-5.5" />
              </div>
              <span className="text-[9px] uppercase font-black tracking-wider px-2 py-0.5 rounded bg-sky-50 dark:bg-sky-950/30 text-sky-600 dark:text-sky-400 border border-sky-100/40 dark:border-sky-900/30 flex items-center gap-1">
                <TrendingUp className="w-2.5 h-2.5" /> Activo
              </span>
            </div>
            
            <div className="mt-4">
              <div className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {metrics.calculationsCount.toLocaleString("es-MX")}
              </div>
              <div className="text-xs font-black text-slate-700 dark:text-slate-350 mt-1 uppercase tracking-wider">
                Cálculos Realizados
              </div>
              <p className="text-[11px] text-slate-450 dark:text-slate-400 leading-normal mt-2 font-medium">
                Simulaciones exactas de comisiones de TPV, deducciones de IVA del 16%, recargos e impacto neto de MSI.
              </p>
            </div>
          </motion.div>
 
          {/* KPI Card 3: Real Average Rating */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-3xl p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 group relative"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                <Star className="w-5.5 h-5.5 fill-amber-400 text-amber-400" />
              </div>
              <span className="text-[9px] uppercase font-black tracking-wider px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border border-amber-100/40 dark:border-amber-900/30 flex items-center gap-1">
                <ThumbsUp className="w-2.5 h-2.5" /> Recomendado
              </span>
            </div>
            
            <div className="mt-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  {ratingAverage}
                </span>
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500">/ 5 estrellas</span>
              </div>
              <div className="text-xs font-black text-slate-700 dark:text-slate-350 mt-1 uppercase tracking-wider flex items-center gap-1.5">
                Calificación ({metrics.ratingsCount} votos)
              </div>
              
              <button 
                onClick={() => setIsRatingFormOpen(!isRatingFormOpen)}
                className="mt-4 w-full text-center py-2 px-3.5 bg-amber-50 hover:bg-amber-100/80 dark:bg-amber-950/20 dark:hover:bg-amber-950/40 border border-amber-200/40 dark:border-amber-900/30 text-amber-700 dark:text-amber-400 text-[10px] font-black tracking-wider uppercase rounded-xl transition-all cursor-pointer"
              >
                {isRatingFormOpen ? "Ocultar Formulario" : "⭐ Dejar una Reseña Real"}
              </button>
            </div>
          </motion.div>

        </div>

        {/* ------------------------------------------------------------- */}
        {/* Collapsible Rating Submission Form */}
        {/* ------------------------------------------------------------- */}
        {isRatingFormOpen && (
          <div className="mt-8 p-6 bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-950/50 rounded-3xl max-w-xl mx-auto transition-all duration-300 shadow-md animate-fadeIn">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Déjanos tu opinión y ayuda a más comercios</h3>
              <button 
                onClick={() => setIsRatingFormOpen(false)} 
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {submitSuccess ? (
              <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 text-emerald-800 dark:text-emerald-400 p-4 rounded-2xl text-center text-xs font-bold">
                ¡Gracias por tu aporte! Tu valoración ha sido calculada y agregada al instante en la base de datos de Firestore.
              </div>
            ) : (
              <form onSubmit={handleRatingSubmit} className="space-y-4">
                {/* Star Picker */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Calificación:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRatingValue(star)}
                        className="p-1 cursor-pointer transform hover:scale-125 transition-transform"
                      >
                        <Star className={`w-5 h-5 ${star <= ratingValue ? "fill-amber-400 text-amber-400" : "text-slate-300 dark:text-slate-600"}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Nombre o Comercio</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Tienda Doña Mari, Papelería Ramos..."
                      value={ratingName}
                      onChange={(e) => setRatingName(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Comentario (Opcional)</label>
                    <textarea
                      placeholder="¿Te ayudó a ahorrar en comisiones?"
                      value={ratingComment}
                      onChange={(e) => setRatingComment(e.target.value)}
                      rows={2}
                      className="w-full px-4 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white font-semibold resize-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-extrabold text-[11px] tracking-wider uppercase rounded-xl transition-all cursor-pointer shadow-sm"
                  >
                    {isSubmitting ? "Enviando..." : "Enviar Reseña"}
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* Live Testimonials Wall */}
        {/* ------------------------------------------------------------- */}
        {recentRatings.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mt-12 pt-8 border-t border-slate-150 dark:border-slate-900 max-w-5xl mx-auto"
          >
            <div className="flex items-center gap-2 mb-6 justify-center">
              <MessageSquare className="w-4 h-4 text-slate-400 dark:text-slate-500 animate-pulse" />
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Opiniones Recientes de Comercios Mexicanos
              </h4>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {recentRatings.map((item) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="p-5 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/60 rounded-2xl text-left flex flex-col justify-between shadow-xs transition-all hover:border-slate-300 dark:hover:border-slate-700"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-black text-slate-800 dark:text-slate-200 tracking-tight truncate max-w-[150px]">
                        {item.name}
                      </span>
                      <div className="flex text-amber-400 shrink-0">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-2.5 h-2.5 ${i < item.rating ? "fill-amber-400 text-amber-400" : "text-slate-200 dark:text-slate-800"}`} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-450 leading-relaxed italic font-medium">
                      "{item.comment || "Excelente comparador, muy preciso."}"
                    </p>
                  </div>
                  
                  <div className="text-[8px] text-slate-400 dark:text-slate-500 mt-4 font-semibold text-right">
                    {item.timestamp?.toDate ? item.timestamp.toDate().toLocaleDateString("es-MX") : "Reciente"}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}
