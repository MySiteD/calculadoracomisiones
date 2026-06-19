import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Calculator from "./components/Calculator";
import AiAdvisor from "./components/AiAdvisor";
import ComisionesInfo from "./components/ComisionesInfo";
import Promociones from "./components/Promociones";
import Referidos from "./components/Referidos";
import Footer from "./components/Footer";

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

      {/* Layout Content */}
      <main className="relative pb-1" id="landing-container">
        
        {/* Hero Section */}
        <Hero />

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

      </main>

      {/* Structured Footer */}
      <Footer />
      
    </div>
  );
}
