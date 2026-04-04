"use client";

import { useEffect, useRef } from "react";
import { GRADIENT_PRESETS, getUnicornProjectId } from "@/lib/background-presets";

declare global {
  interface Window {
    UnicornStudio?: {
      isInitialized: boolean;
      init?: () => void;
      destroy?: () => void;
    };
  }
}

interface ProfileBackgroundProps {
  backgroundType: string | null;
  backgroundConfig: string | null;
  children: React.ReactNode;
}

export function ProfileBackground({
  backgroundType,
  backgroundConfig,
  children,
}: ProfileBackgroundProps) {
  // background_config stores the preset ID; resolve the actual project ID
  const projectId =
    backgroundType === "unicorn" && backgroundConfig
      ? getUnicornProjectId(backgroundConfig)
      : null;

  const isUnicorn = !!projectId;
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    if (!isUnicorn || !projectId) return;

    const initUnicorn = () => {
      if (
        window.UnicornStudio &&
        !window.UnicornStudio.isInitialized &&
        window.UnicornStudio.init
      ) {
        window.UnicornStudio.init();
        window.UnicornStudio.isInitialized = true;
      }
    };

    if (!window.UnicornStudio) {
      window.UnicornStudio = { isInitialized: false };
      const script = document.createElement("script");
      script.async = true;
      script.src =
        "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.1.0-1/dist/unicornStudio.umd.js";
      script.onload = () => {
        if (
          document.readyState === "complete" ||
          document.readyState === "interactive"
        ) {
          initUnicorn();
        } else {
          document.addEventListener("DOMContentLoaded", initUnicorn);
        }
      };
      (document.head || document.body).appendChild(script);
      scriptRef.current = script;
    } else {
      initUnicorn();
    }

    return () => {
      if (scriptRef.current) {
        scriptRef.current.remove();
        scriptRef.current = null;
      }
      if (window.UnicornStudio) {
        window.UnicornStudio.isInitialized = false;
      }
    };
  }, [isUnicorn, projectId]);

  const getBackgroundStyle = (): { background: string } => {
    if (backgroundType === "gradient" && backgroundConfig) {
      const preset = GRADIENT_PRESETS.find((p) => p.id === backgroundConfig);
      if (preset) return { background: preset.style };
    }
    return { background: "#09090b" };
  };

  if (isUnicorn) {
    return (
      <div className="relative min-h-screen">
        <div className="fixed inset-0 z-0" aria-hidden="true">
          <div
            data-us-project={projectId}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div className="relative z-10">{children}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={getBackgroundStyle()}>
      {children}
    </div>
  );
}

