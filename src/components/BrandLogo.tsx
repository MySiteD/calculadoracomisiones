import React, { useState } from "react";

interface BrandLogoProps {
  name: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

export default function BrandLogo({ name, size = "md", className = "" }: BrandLogoProps) {
  const normalizedName = name.toLowerCase().trim();
  const [imageError, setImageError] = useState(false);

  // Size mapping
  const sizeClasses = {
    xs: "w-5 h-5 rounded-md text-xs",
    sm: "w-8 h-8 rounded-lg text-sm",
    md: "w-10 h-10 rounded-xl text-base",
    lg: "w-12 h-12 rounded-2xl text-lg",
    xl: "w-14 h-14 rounded-[1.25rem] text-xl"
  };

  const currentSizeClass = sizeClasses[size] || sizeClasses.md;

  // Map normalized brand names to local file names (supporting custom uploaded assets in public/logos/)
  const getLocalLogoPath = () => {
    if (normalizedName.includes("uala") || normalizedName.includes("ualá")) return "uala";
    if (normalizedName.includes("mercado pago") || normalizedName.includes("mercadopago")) return "mercadopago";
    if (normalizedName.includes("zettle") || normalizedName.includes("paypal")) return "zettle";
    if (normalizedName.includes("clip")) return "clip";
    if (normalizedName.includes("netpay")) return "netpay";
    if (normalizedName.includes("sr. pago") || normalizedName.includes("srpago")) return "srpago";
    if (normalizedName.includes("billpocket")) return "billpocket";
    if (normalizedName.includes("nu ") || normalizedName === "nu" || normalizedName.includes("nu méxico")) return "nu";
    if (normalizedName.includes("banorte")) return "banorte";
    if (normalizedName.includes("didi")) return "didi";
    if (normalizedName.includes("plata")) return "plata";
    if (normalizedName.includes("bbva")) return "bbva";
    if (normalizedName.includes("getnet") || normalizedName.includes("santander")) return "getnet";
    if (normalizedName.includes("baubap")) return "baubap";
    return "";
  };

  const brandKey = getLocalLogoPath();
  
  // Custom images are hosted in `/logos/` folder inside the `public` directory
  // (e.g. `/public/logos/clip.svg` is accessible as `/logos/clip.svg` in Vite)
  const localImageUrl = brandKey ? `/logos/${brandKey}.svg` : "";

  // Render high-fidelity, polished, responsive inline SVG vectors as the beautiful out-of-the-box fallback
  const renderFallbackLogo = () => {
    switch (true) {
      case normalizedName.includes("uala") || normalizedName.includes("ualá"):
        return (
          <div 
            className={`flex items-center justify-center bg-[#E20613] text-white shadow-xs font-bold shrink-0 overflow-hidden ${currentSizeClass} ${className}`}
            title="Ualá Bis"
          >
            {/* High-fidelity stylized 'u' vector representing Ualá */}
            <svg viewBox="0 0 100 100" className="w-5/12 h-5/12 fill-current">
              <path d="M50 20C38.9 20 30 28.9 30 40V65C30 73.3 36.7 80 45 80H55C63.3 80 70 73.3 70 65V40C70 28.9 61.1 20 50 20ZM58 65C58 66.7 56.7 68 55 68H45C43.3 68 42 66.7 42 65V40C42 35.6 45.6 32 50 32C54.4 32 58 35.6 58 40V65Z" />
            </svg>
          </div>
        );

      case normalizedName.includes("mercado pago") || normalizedName.includes("mercadopago"):
        return (
          <div 
            className={`flex items-center justify-center bg-[#009EE3] text-white shadow-xs shrink-0 overflow-hidden ${currentSizeClass} ${className}`}
            title="Mercado Pago"
          >
            {/* High-fidelity handshake logo of Mercado Pago */}
            <svg viewBox="0 0 100 100" className="w-6/12 h-6/12 fill-none stroke-current" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M30 60 L15 45 C10 40 10 32 15 27 C20 22 28 22 33 27 L50 44 L67 27 C72 22 80 22 85 27 C90 32 90 40 85 45 L70 60" />
              <path d="M50 44 L35 59 C30 64 22 64 17 59 C12 54 12 46 17 41 L25 33" />
              <path d="M50 44 L65 59 C70 64 78 64 83 59 C88 54 88 46 83 41 L75 33" />
            </svg>
          </div>
        );

      case normalizedName.includes("zettle") || normalizedName.includes("paypal"):
        return (
          <div 
            className={`flex items-center justify-center bg-[#002C9B] text-white shadow-xs shrink-0 overflow-hidden ${currentSizeClass} ${className}`}
            title="Zettle by PayPal"
          >
            {/* Custom stylized Zettle modern layout */}
            <svg viewBox="0 0 100 100" className="w-5/12 h-5/12 fill-current">
              <circle cx="35" cy="35" r="14" className="opacity-80" />
              <circle cx="65" cy="35" r="14" />
              <circle cx="35" cy="65" r="14" />
              <circle cx="65" cy="65" r="14" className="opacity-80" />
              <line x1="35" y1="35" x2="65" y2="65" stroke="currentColor" strokeWidth="10" />
            </svg>
          </div>
        );

      case normalizedName.includes("clip"):
        return (
          <div 
            className={`flex items-center justify-center bg-[#FF5E00] text-white shadow-xs shrink-0 overflow-hidden ${currentSizeClass} ${className}`}
            title="Clip"
          >
            {/* Clean clip signature paperclip loop vector */}
            <svg viewBox="0 0 100 100" className="w-6/12 h-6/12 fill-none stroke-current" strokeWidth="7.5" strokeLinecap="round">
              <path d="M50 20 C65 20, 75 30, 75 45 C75 60, 60 75, 40 75 C25 75, 15 65, 15 50 C15 38, 25 28, 38 28 C48 28, 56 35, 56 45 C56 52, 50 58, 44 58 C38 58, 34 54, 34 48" />
            </svg>
          </div>
        );

      case normalizedName.includes("netpay"):
        return (
          <div 
            className={`flex items-center justify-center bg-[#19A74E] text-white shadow-xs shrink-0 overflow-hidden ${currentSizeClass} ${className}`}
            title="NetPay"
          >
            {/* Dynamic geometric double-triangle 'N' logo */}
            <svg viewBox="0 0 100 100" className="w-5/12 h-5/12 fill-current">
              <path d="M25 20 H38 L62 65 V20 H75 V80 H62 L38 35 V80 H25 Z" />
            </svg>
          </div>
        );

      case normalizedName.includes("sr. pago") || normalizedName.includes("srpago"):
        return (
          <div 
            className={`flex items-center justify-center bg-[#333333] text-white shadow-xs shrink-0 overflow-hidden ${currentSizeClass} ${className}`}
            title="Sr. Pago"
          >
            {/* Iconography of Sr. Pago */}
            <svg viewBox="0 0 100 100" className="w-6/12 h-6/12 fill-current">
              <circle cx="32" cy="40" r="14" fill="none" stroke="currentColor" strokeWidth="6" />
              <circle cx="68" cy="40" r="14" fill="none" stroke="currentColor" strokeWidth="6" />
              <path d="M46 40 H54" stroke="currentColor" strokeWidth="6" />
              <path d="M18 64 C25 58, 42 58, 50 64 C58 58, 75 58, 82 64 C88 68, 70 76, 50 70 C30 76, 12 68, 18 64 Z" />
            </svg>
          </div>
        );

      case normalizedName.includes("billpocket"):
        return (
          <div 
            className={`flex items-center justify-center bg-[#00BCD4] text-white shadow-xs shrink-0 overflow-hidden ${currentSizeClass} ${className}`}
            title="Billpocket"
          >
            {/* Custom stylized 'bp' icon of Billpocket */}
            <svg viewBox="0 0 100 100" className="w-5/12 h-5/12 fill-current">
              <path d="M25 25 H50 C62 25, 70 33, 70 42 C70 51, 62 59, 50 59 H37 V75 H25 V25 Z M37 47 H50 C54 47, 58 45, 58 41 C58 37, 54 35, 50 35 H37 V47 Z" />
              <path d="M72 50 C72 63.8, 60.8 75, 47 75 H75 V50 Z" className="opacity-70" />
            </svg>
          </div>
        );

      case normalizedName.includes("nu ") || normalizedName === "nu" || normalizedName.includes("nu méxico"):
        return (
          <div 
            className={`flex items-center justify-center bg-[#820AD1] text-white shadow-xs shrink-0 overflow-hidden ${currentSizeClass} ${className}`}
            title="Nu México"
          >
            {/* Nu signature continuous ribbon double-loop */}
            <svg viewBox="0 0 100 100" className="w-6/12 h-6/12 fill-none stroke-current" strokeWidth="7" strokeLinecap="round">
              <path d="M25 65 C25 73, 38 73, 38 60 C38 42, 62 42, 62 60 C62 73, 75 73, 75 65" />
              <path d="M25 35 C25 27, 38 27, 38 40 C38 58, 62 58, 62 40 C62 27, 75 27, 75 35" className="opacity-85" />
            </svg>
          </div>
        );

      case normalizedName.includes("banorte"):
        return (
          <div 
            className={`flex items-center justify-center bg-[#EB1C24] text-white shadow-xs font-black shrink-0 overflow-hidden ${currentSizeClass} ${className}`}
            title="Banorte"
          >
            {/* Clean vector geometry of Banorte */}
            <svg viewBox="0 0 100 100" className="w-5/12 h-5/12 fill-current">
              <path d="M25 15 H55 C70 15, 80 25, 80 37 C80 45, 74 52, 66 55 C74 58, 80 66, 80 75 C80 87, 70 95, 55 95 H25 V15 Z M40 45 H55 C60 45, 65 42, 65 37 C65 32, 60 29, 55 29 H40 V45 Z M40 81 H55 C60 81, 65 78, 65 73 C65 68, 60 65, 55 65 H40 V81 Z" />
            </svg>
          </div>
        );

      case normalizedName.includes("didi"):
        return (
          <div 
            className={`flex items-center justify-center bg-[#FF8E00] text-white shadow-xs shrink-0 overflow-hidden ${currentSizeClass} ${className}`}
            title="DiDi"
          >
            {/* High-fidelity smile curve of DiDi Pay */}
            <svg viewBox="0 0 100 100" className="w-6/12 h-6/12 fill-current">
              <path d="M50 20 C30 20, 15 35, 15 55 C15 75, 30 90, 50 90 C70 90, 85 75, 85 55 Z M50 78 C36 78, 27 68, 27 55 C27 42, 36 32, 50 32 C64 32, 73 42, 73 55 C73 68, 64 78, 50 78 Z" />
              <path d="M35 55 A 15 15 0 0 0 65 55" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
            </svg>
          </div>
        );

      case normalizedName.includes("plata"):
        return (
          <div 
            className={`flex items-center justify-center bg-[#10B981] text-white shadow-xs shrink-0 overflow-hidden ${currentSizeClass} ${className}`}
            title="Plata Card"
          >
            {/* Beautiful modern check/shield of Plata Card */}
            <svg viewBox="0 0 100 100" className="w-5/12 h-5/12 fill-none stroke-current" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="50 15, 80 25, 80 55, 50 85, 20 55, 20 25" />
              <polyline points="35 45, 45 55, 65 35" strokeWidth="8" />
            </svg>
          </div>
        );

      case normalizedName.includes("bbva"):
        return (
          <div 
            className={`flex items-center justify-center bg-[#072146] text-white shadow-xs font-bold shrink-0 overflow-hidden ${currentSizeClass} ${className}`}
            title="BBVA"
          >
            {/* Pixel-perfect text representing official BBVA logo */}
            <span className="font-sans font-black tracking-tighter text-[9px] sm:text-xs">BBVA</span>
          </div>
        );

      case normalizedName.includes("getnet") || normalizedName.includes("santander"):
        return (
          <div 
            className={`flex items-center justify-center bg-[#EC0000] text-white shadow-xs font-bold shrink-0 overflow-hidden ${currentSizeClass} ${className}`}
            title="Getnet"
          >
            {/* Modern customized Santander Getnet dynamic curve */}
            <svg viewBox="0 0 100 100" className="w-5/12 h-5/12 fill-current">
              <path d="M50 15C30.7 15 15 30.7 15 50C15 69.3 30.7 85 50 85C66.5 85 80.3 73.5 83.9 58H65.5C62.5 64.1 56.3 68 50 68C40.1 68 32 59.9 32 50C32 40.1 40.1 32 50 32C56.3 32 62.5 35.9 65.5 42H83.9C80.3 26.5 66.5 15 50 15Z" />
            </svg>
          </div>
        );

      case normalizedName.includes("baubap"):
        return (
          <div 
            className={`flex items-center justify-center bg-[#00b894] text-white shadow-xs font-bold shrink-0 overflow-hidden ${currentSizeClass} ${className}`}
            title="Baubap"
          >
            {/* Elegant Baubap-style double growth loop (representing seed, microloans, and secure credit) */}
            <svg viewBox="0 0 100 100" className="w-6/12 h-6/12 fill-none stroke-current" strokeWidth="7.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M50 85 C30 85, 20 70, 20 50 C20 30, 35 15, 50 15 C65 15, 80 30, 80 50" />
              <path d="M50 15 C50 35, 35 50, 20 50" />
              <path d="M50 50 C65 50, 80 65, 80 85" className="opacity-80" />
            </svg>
          </div>
        );

      default:
        return (
          <div 
            className={`flex items-center justify-center bg-indigo-600 text-white shadow-xs font-black shrink-0 overflow-hidden ${currentSizeClass} ${className}`}
            title={name}
          >
            <svg viewBox="0 0 100 100" className="w-5/12 h-5/12 fill-none stroke-current" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
              <rect x="25" y="15" width="50" height="70" rx="8" />
              <rect x="35" y="25" width="30" height="20" rx="2" />
              <circle cx="50" cy="58" r="4" fill="currentColor" />
              <line x1="38" y1="70" x2="62" y2="70" />
            </svg>
          </div>
        );
    }
  };

  // If there's an image error, or we haven't mapped the brand to a static logo, render the high fidelity SVG fallback
  if (imageError || !localImageUrl) {
    return renderFallbackLogo();
  }

  // Otherwise, attempt to load the official high-resolution logo from the locally hosted `/logos/` folder in `public/`
  return (
    <img
      src={localImageUrl}
      alt={`${name} Logo`}
      onError={() => setImageError(true)}
      referrerPolicy="no-referrer"
      className={`object-contain bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 shrink-0 p-1 select-none pointer-events-none ${currentSizeClass} ${className}`}
      title={name}
    />
  );
}
