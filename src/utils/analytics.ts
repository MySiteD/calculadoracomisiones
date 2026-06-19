declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Envía un evento personalizado a Google Analytics 4 de manera segura (con tolerancia a bloqueadores de anuncios).
 */
export function trackEvent(name: string, params?: Record<string, any>) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    try {
      window.gtag("event", name, params);
    } catch (error) {
      console.error("[Analytics Error] Failed to send event to GA4", error);
    }
  }
}

/**
 * Registra cuando un usuario da clic en el botón "Simular y Comparar Costos"
 */
export function trackSimulate(amount: number, paymentMethod: string, msiMonths?: string) {
  trackEvent("simulate_click", {
    amount,
    payment_method: paymentMethod,
    msi_months: msiMonths || "none",
    monto_formateado: `$${amount.toLocaleString("es-MX")}`
  });
}

/**
 * Registra cuando un usuario da clic en un enlace de recomendado/referido con beneficio
 */
export function trackReferralClick(referralId: string, referralName: string, referralLink: string) {
  trackEvent("referral_click", {
    referral_id: referralId,
    referral_name: referralName,
    referral_url: referralLink
  });
}
