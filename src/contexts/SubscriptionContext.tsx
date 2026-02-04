// =======================================================
// MANDASTRONG STUDIO 2025 — OWNER SUBSCRIPTION OVERRIDE
// Author: Amanda Woolley (MandaStrong)
// FIXES: Gemini Free-Plan Lockout Bug
// =======================================================

import { createContext, useContext } from "react";
import { useAuth } from "./AuthContext";

type Plan =
  | "free"
  | "basic"
  | "pro"
  | "studio";

interface SubscriptionState {
  plan: Plan;
  isOwner: boolean;
  features: {
    maxExport: string;
    aiTools: number;
    storageGB: number | "unlimited";
    commercial: boolean;
  };
}

const OWNER_EMAIL = "woolleya129@gmail.com";

const SubscriptionContext = createContext<SubscriptionState | null>(null);

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  // ---------- OWNER OVERRIDE ----------
  const isOwner = user?.email === OWNER_EMAIL;

  // ---------- STRIPE / DB PLAN (fallback) ----------
  const detectedPlan: Plan =
    isOwner
      ? "studio"
      : (user?.subscription_tier as Plan) || "free";

  // ---------- FEATURE MATRIX ----------
  const FEATURES: Record<Plan, SubscriptionState["features"]> = {
    free: {
      maxExport: "720p",
      aiTools: 50,
      storageGB: 1,
      commercial: false,
    },
    basic: {
      maxExport: "1080p",
      aiTools: 100,
      storageGB: 10,
      commercial: false,
    },
    pro: {
      maxExport: "4K",
      aiTools: 300,
      storageGB: 100,
      commercial: true,
    },
    studio: {
      maxExport: "8K",
      aiTools: 600,
      storageGB: "unlimited",
      commercial: true,
    },
  };

  const value: SubscriptionState = {
    plan: detectedPlan,
    isOwner,
    features: FEATURES[detectedPlan],
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
}

// ---------- HOOK ----------
export function useSubscription() {
  const ctx = useContext(SubscriptionContext);
  if (!ctx) throw new Error("useSubscription must be used inside SubscriptionProvider");
  return ctx;
}
