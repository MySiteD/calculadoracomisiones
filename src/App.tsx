import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import StatsDashboard from "./components/StatsDashboard";
import Testimonials from "./components/Testimonials";
import Calculator from "./components/Calculator";
import AiAdvisor from "./components/AiAdvisor";
import ComisionesInfo from "./components/ComisionesInfo";
import Promociones from "./components/Promociones";
import Referidos from "./components/Referidos";
import FaqSection from "./components/FaqSection";
import Footer from "./components/Footer";
import CarouselBanner from "./components/CarouselBanner";

export default function App() {
  const [activeSection, setActiveSection] = useState("inicio");
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("caja_theme");
      if (savedTheme === "dark" || savedTheme === "light") {
        return savedTheme as "light" | "dark";
      }
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return systemPrefersDark ? "dark" : "light";
    }
    return "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("caja_theme", theme);
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      const savedTheme = localStorage.getItem("caja_theme");
      if (!savedTheme) {
        setTheme(e.matches ? "dark" : "light");
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["inicio", "asesor-ai", "comisiones", "promociones", "referidos"];
      const scrollPosition = window.scrollY + 180; // Buffer offset for floating header

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Execute initially
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dynamically update SEO, Open Graph and Twitter Cards meta tags based on current active section
  useEffect(() => {
    const metaConfig: Record<string, { title: string; description: string }> = {
      inicio: {
        title: "Calculadora de Comisiones de Terminales en México | Compara Clip, Mercado Pago, Zettle y Ualá",
        description: "Calcula y compara en tiempo real las comisiones con IVA desglosado de terminales de cobro (TPV) en México. Simula Débito, Crédito y Meses sin Intereses (MSI)."
      },
      "asesor-ai": {
        title: "Asesor Financiero con Inteligencia Artificial | Terminales de Pago México",
        description: "Recibe recomendaciones financieras en vivo impulsadas por IA para seleccionar el mejor agregador de pagos para tu comercio en México."
      },
      comisiones: {
        title: "Tasas y Comisiones de Terminales en México 2026 | Clip, Mercado Pago, Zettle",
        description: "Consulta el listado completo de tasas de descuento vigentes a 2026 para todos los proveedores de cobro móvil con tarjeta."
      },
      promociones: {
        title: "Cupones y Promociones Exclusivas de Terminales Móviles",
        description: "Ahorra en la compra de tu lector de tarjetas o terminal Point con ofertas y descuentos especiales para nuevos comercios."
      },
      testimonios: {
        title: "Testimonios y Reseñas de Terminales de Pago en México | Casos Reales",
        description: "Opiniones y valoraciones reales de comercios y emprendedores sobre Clip, Mercado Pago, Zettle, y Ualá."
      },
      referidos: {
        title: "Alianzas y Recursos Recomendados para Negocios Mexicanos",
        description: "Descubre soluciones de ahorro, préstamos en efectivo inmediatos, créditos de negocio y más beneficios exclusivos."
      }
    };

    const currentMeta = metaConfig[activeSection] || metaConfig.inicio;

    // Update standard HTML title
    document.title = currentMeta.title;

    // Update meta description tag
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", currentMeta.description);
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", currentMeta.title);
    }

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute("content", currentMeta.description);
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute("content", `https://calculadoracomisiones-three.vercel.app/#${activeSection}`);
    }

    // Update Twitter Cards tags
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) {
      twTitle.setAttribute("content", currentMeta.title);
    }

    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) {
      twDesc.setAttribute("content", currentMeta.description);
    }

    const twUrl = document.querySelector('meta[name="twitter:url"]');
    if (twUrl) {
      twUrl.setAttribute("content", `https://calculadoracomisiones-three.vercel.app/#${activeSection}`);
    }
  }, [activeSection]);

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-hidden font-sans">
      
      {/* Background soft gradients for high-end professional polish layout */}
      <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none -z-10 overflow-hidden">
        {/* Glow left */}
        <div className="absolute top-[5%] left-[-15%] w-[500px] h-[500px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[100px]" />
        {/* Glow right */}
        <div className="absolute top-[25%] right-[-10%] w-[600px] h-[600px] bg-amber-500/5 dark:bg-amber-500/10 rounded-full blur-[120px]" />
        {/* Glow mid bottom */}
        <div className="absolute bottom-[10%] left-[5%] w-[600px] h-[600px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Floating Navbar */}
      <Navbar activeSection={activeSection} theme={theme} toggleTheme={toggleTheme} />

      {/* Real-time Carousel Banner right below navigation bar */}
      <CarouselBanner />

      {/* Layout Content */}
      <main className="relative pb-1" id="landing-container">
        
        {/* Hero Section */}
        <Hero />

        {/* Real-time Stats & Authority Dashboard */}
        <StatsDashboard />

        {/* Real-time Testimonials Carousel */}
        <Testimonials />

        {/* 1. Calculator Section */}
        <Calculator />

        {/* 2. AI Smart Advisor Section */}
        <AiAdvisor />

        {/* 3. Commission Detail & Provider rates */}
        <ComisionesInfo />

        {/* 4. Active Promotions */}
        <Promociones />

        {/* 5. Recommended referrals and resources allied */}
        <Referidos />

        {/* 6. AI-powered FAQ & Objections Solver Accordion */}
        <FaqSection />

      </main>

      {/* Structured Footer */}
      <Footer />
      
    </div>
  );
}
