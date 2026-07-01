import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Quote, 
  Star, 
  Plus, 
  X, 
  Send, 
  MessageSquare, 
  CheckCircle,
  Building2
} from "lucide-react";
import { 
  subscribeToReviews, 
  submitReview, 
  UserReview 
} from "../lib/firebase";

export default function Testimonials() {
  const [reviews, setReviews] = useState<UserReview[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  // Form Fields
  const [formName, setFormName] = useState("");
  const [formBusiness, setFormBusiness] = useState("");
  const [formRating, setFormRating] = useState(5);
  const [formComment, setFormComment] = useState("");

  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Subscribe to Firestore updates for reviews collection
    const unsubscribe = subscribeToReviews((liveReviews) => {
      setReviews(liveReviews);
    });

    return () => {
      unsubscribe();
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, []);

  // Carousel Autoplay implementation
  useEffect(() => {
    if (!isPlaying || reviews.length <= 1) {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
      return;
    }

    autoPlayRef.current = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 6000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isPlaying, reviews.length]);

  const handlePrev = () => {
    setIsPlaying(false);
    setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsPlaying(false);
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formRating < 1 || formRating > 5) return;

    setIsSubmitting(true);
    const success = await submitReview(
      formName.trim(),
      formRating,
      formComment.trim(),
      formBusiness.trim()
    );
    setIsSubmitting(false);

    if (success) {
      setSubmitSuccess(true);
      setFormName("");
      setFormBusiness("");
      setFormRating(5);
      setFormComment("");
      
      // Auto close and refresh view
      setTimeout(() => {
        setSubmitSuccess(false);
        setIsFormOpen(false);
        setActiveIndex(0); // View the newest rating at index 0
      }, 3000);
    }
  };

  if (reviews.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const currentReview = reviews[activeIndex];

  return (
    <section 
      id="testimonios" 
      className="relative py-20 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900 overflow-hidden transition-colors duration-300"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-amber-500/5 dark:bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 max-w-4xl relative">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-[10px] uppercase font-black tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/40 px-3.5 py-1.5 rounded-full border border-indigo-100/50 dark:border-indigo-900/30">
            Opinión y Casos de Éxito
          </span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-4">
            ¿Qué opinan otros comercios?
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 mt-2 max-w-xl mx-auto">
            Testimonios reales de emprendedores mexicanos que optimizaron sus finanzas usando nuestro comparador.
          </p>
        </motion.div>

        {/* Carousel Showcase Wrapper */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative bg-slate-50/50 dark:bg-slate-900/20 border border-slate-200/50 dark:border-slate-800/80 rounded-[2.5rem] p-8 md:p-12 shadow-sm"
        >
          
          {/* Quote Icon watermark */}
          <div className="absolute top-6 right-8 text-slate-200/70 dark:text-slate-800/50 pointer-events-none">
            <Quote className="w-16 h-16 transform rotate-180" />
          </div>

          <div className="min-h-[180px] flex flex-col justify-between">
            {/* Review Content */}
            <div className="transition-all duration-500 animate-fadeIn">
              {/* Star rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star 
                    key={idx} 
                    className={`w-5 h-5 ${idx < currentReview.rating ? "fill-amber-400 text-amber-400" : "text-slate-200 dark:text-slate-750"}`} 
                  />
                ))}
              </div>

              {/* Comment text */}
              <p className="text-base md:text-lg font-bold text-slate-800 dark:text-slate-100 leading-relaxed italic">
                "{currentReview.comment}"
              </p>
            </div>

            {/* Author info & controls */}
            <div className="mt-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-t border-slate-150 dark:border-slate-800 pt-6">
              
              {/* Author profile */}
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400 border border-indigo-100/50 dark:border-indigo-900/30">
                  <Building2 className="w-5.5 h-5.5" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900 dark:text-white">
                    {currentReview.name}
                  </h4>
                  <span className="text-[11px] font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                    {currentReview.businessType}
                  </span>
                </div>
              </div>

              {/* Slider Controls */}
              <div className="flex items-center gap-3">
                
                {/* Previous */}
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 hover:-translate-x-0.5 active:translate-x-0 transition-all cursor-pointer shadow-xs"
                  aria-label="Anterior testimonio"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Indicators dots */}
                <div className="flex gap-1.5 px-1">
                  {reviews.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setIsPlaying(false);
                        setActiveIndex(idx);
                      }}
                      className={`h-2 rounded-full transition-all cursor-pointer ${idx === activeIndex ? "w-6 bg-indigo-600 dark:bg-indigo-400" : "w-2 bg-slate-200 dark:bg-slate-800"}`}
                      aria-label={`Ir al testimonio ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Next */}
                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 hover:translate-x-0.5 active:translate-x-0 transition-all cursor-pointer shadow-xs"
                  aria-label="Siguiente testimonio"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

              </div>

            </div>

          </div>

        </motion.div>

        {/* Submit Review CTA Callout */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold inline-flex items-center gap-2">
            ¿Usas Clip, Mercado Pago, Zettle o Ualá?
            <button
              onClick={() => setIsFormOpen(true)}
              className="text-xs font-black text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1.5 cursor-pointer ml-1 bg-indigo-50 dark:bg-indigo-950/50 px-3 py-1.5 rounded-xl border border-indigo-100/50 dark:border-indigo-900/30 transition-all hover:scale-[1.02]"
            >
              <Plus className="w-3.5 h-3.5" />
              Comparte tu reseña real aquí
            </button>
          </p>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* Interactive Popup Modal Form */}
        {/* ------------------------------------------------------------- */}
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
            <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-6 md:p-8 shadow-2xl relative overflow-hidden">
              
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />

              {/* Close Button */}
              <button 
                onClick={() => setIsFormOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white leading-tight">
                    Cuéntanos tu experiencia
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-450 mt-0.5">
                    Ayuda a otros comercios a tomar decisiones financieras informadas.
                  </p>
                </div>
              </div>

              {submitSuccess ? (
                <div className="py-8 text-center flex flex-col items-center justify-center">
                  <CheckCircle className="w-12 h-12 text-emerald-500 mb-3 animate-bounce" />
                  <h4 className="text-base font-black text-slate-900 dark:text-white">
                    ¡Testimonio publicado!
                  </h4>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-2 max-w-xs leading-relaxed">
                    Tu opinión ha sido grabada directamente en Firestore y se mostrará al instante en el carrusel de opiniones.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  
                  {/* Star Rating picker */}
                  <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 p-3 rounded-2xl border border-slate-150 dark:border-slate-850">
                    <span className="text-xs font-black text-slate-600 dark:text-slate-400">Tu valoración:</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((starVal) => (
                        <button
                          key={starVal}
                          type="button"
                          onClick={() => setFormRating(starVal)}
                          className="p-1 cursor-pointer transform hover:scale-125 transition-transform"
                        >
                          <Star className={`w-6 h-6 ${starVal <= formRating ? "fill-amber-400 text-amber-400" : "text-slate-300 dark:text-slate-700"}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Tu Nombre</label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. Sofía Mendoza"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full px-4 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Nombre de tu Negocio</label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. Cafetería Sonata"
                        value={formBusiness}
                        onChange={(e) => setFormBusiness(e.target.value)}
                        className="w-full px-4 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white font-semibold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Reseña o Comentario</label>
                    <textarea
                      required
                      placeholder="Ej. Súper preciso y claro. Me ayudó a darme cuenta de que Zettle me dejaba mejor rendimiento neto..."
                      value={formComment}
                      onChange={(e) => setFormComment(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white font-semibold resize-none leading-relaxed"
                    />
                  </div>

                  {/* Submission and info */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-snug font-semibold text-center sm:text-left max-w-[240px]">
                      Al enviar, tu reseña se publicará al instante en el carrusel principal de la plataforma.
                    </p>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-extrabold text-[11px] tracking-wider uppercase rounded-xl transition-all cursor-pointer shadow-sm"
                    >
                      {isSubmitting ? "Publicando..." : "Publicar Ahora"}
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </form>
              )}

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
