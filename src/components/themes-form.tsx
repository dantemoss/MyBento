"use client";

import { useState, useTransition, useEffect, useRef } from "react";
import { CheckCircle2, Sparkles, Loader2, Play, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { GRADIENT_PRESETS, UNICORN_PRESETS } from "@/lib/background-presets";
import { updateBackground } from "@/app/admin/themes/actions";
import { Button } from "@/components/ui/button";

// ─── UnicornStudio live preview ───────────────────────────────────────────────

declare global {
  interface Window {
    UnicornStudio?: { isInitialized: boolean; init?: () => void };
  }
}

function UnicornLivePreview({ projectId }: { projectId: string }) {
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    // Reset state for fresh init on each mount
    if (window.UnicornStudio) {
      window.UnicornStudio.isInitialized = false;
    } else {
      window.UnicornStudio = { isInitialized: false };
    }

    const doInit = () => {
      if (window.UnicornStudio?.init && !window.UnicornStudio.isInitialized) {
        window.UnicornStudio.init();
        window.UnicornStudio.isInitialized = true;
      }
    };

    // Remove any stale script so we always get a fresh execution
    document.querySelector('script[src*="unicornStudio.umd.js"]')?.remove();

    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.1.0-1/dist/unicornStudio.umd.js";
    script.onload = doInit;
    document.head.appendChild(script);
    scriptRef.current = script;

    return () => {
      scriptRef.current?.remove();
      scriptRef.current = null;
      if (window.UnicornStudio) window.UnicornStudio.isInitialized = false;
    };
  }, [projectId]);

  return (
    <div
      data-us-project={projectId}
      style={{ width: "100%", height: "100%" }}
    />
  );
}

// ─── Main form ────────────────────────────────────────────────────────────────

interface ThemesFormProps {
  currentBackgroundType: string | null;
  currentBackgroundConfig: string | null;
}

export function ThemesForm({
  currentBackgroundType,
  currentBackgroundConfig,
}: ThemesFormProps) {
  const [selectedType, setSelectedType] = useState<string>(
    currentBackgroundType ?? "default"
  );
  const [selectedGradient, setSelectedGradient] = useState<string>(
    currentBackgroundType === "gradient"
      ? (currentBackgroundConfig ?? "default")
      : "default"
  );
  const [selectedUnicorn, setSelectedUnicorn] = useState<string | null>(
    currentBackgroundType === "unicorn" ? (currentBackgroundConfig ?? null) : null
  );
  const [showingPreview, setShowingPreview] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSave = () => {
    let bgType = selectedType;
    let bgConfig: string | null = null;

    if (selectedType === "gradient") {
      bgConfig = selectedGradient;
    } else if (selectedType === "unicorn") {
      bgConfig = selectedUnicorn;
    } else {
      bgType = "default";
    }

    setMessage(null);
    startTransition(async () => {
      const result = await updateBackground(bgType, bgConfig);
      if (result.error) {
        setMessage({ type: "error", text: result.error });
      } else {
        setMessage({ type: "success", text: "¡Tema guardado!" });
      }
    });
  };

  const hasChanges =
    selectedType !== (currentBackgroundType ?? "default") ||
    (selectedType === "gradient" &&
      selectedGradient !== (currentBackgroundConfig ?? "default")) ||
    (selectedType === "unicorn" &&
      selectedUnicorn !== (currentBackgroundConfig ?? null));

  return (
    <div className="space-y-8">
      {/* ── Colores y gradientes ─────────────────────────────────── */}
      <section className="space-y-4">
        <div>
          <h2 className="text-base font-semibold text-zinc-100">
            Colores y gradientes
          </h2>
          <p className="text-sm text-zinc-500 mt-0.5">
            Elegí un fondo estático para tu perfil.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {GRADIENT_PRESETS.map((preset) => {
            const isSelected =
              (preset.id === "default"
                ? selectedType === "default"
                : selectedType === "gradient" && selectedGradient === preset.id);

            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => {
                  if (preset.id === "default") {
                    setSelectedType("default");
                    setSelectedGradient("default");
                  } else {
                    setSelectedType("gradient");
                    setSelectedGradient(preset.id);
                  }
                }}
                className={cn(
                  "relative flex flex-col gap-2 rounded-xl border-2 p-2 text-left transition-all duration-150 hover:border-zinc-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400",
                  isSelected
                    ? "border-white shadow-[0_0_0_1px_rgba(255,255,255,0.12)]"
                    : "border-zinc-800"
                )}
              >
                <div
                  className="h-16 w-full rounded-lg"
                  style={{ background: preset.style }}
                />
                <span className="text-xs font-medium text-zinc-300 px-0.5">
                  {preset.name}
                </span>
                {isSelected && (
                  <span className="absolute top-2 right-2">
                    <CheckCircle2 className="h-4 w-4 text-white drop-shadow" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      <div className="border-t border-zinc-800" />

      {/* ── Fondos animados ──────────────────────────────────────── */}
      <section className="space-y-4">
        <div>
          <h2 className="text-base font-semibold text-zinc-100 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-purple-400" />
            Fondos animados
          </h2>
          <p className="text-sm text-zinc-500 mt-0.5">
            Assets interactivos exclusivos de Bion. Hacé clic en una tarjeta
            para seleccionarla o en{" "}
            <span className="text-zinc-400">Vista previa</span> para verla en
            acción.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {UNICORN_PRESETS.map((preset) => {
            const isSelected =
              selectedType === "unicorn" && selectedUnicorn === preset.id;
            const isPreviewing = showingPreview === preset.id;

            return (
              <div
                key={preset.id}
                className={cn(
                  "relative rounded-2xl border-2 overflow-hidden transition-all duration-150",
                  isSelected
                    ? "border-purple-500 shadow-[0_0_0_1px_rgba(168,85,247,0.2)]"
                    : "border-zinc-800 hover:border-zinc-600"
                )}
              >
                {/* Thumbnail / live preview area */}
                <div className="relative h-40 w-full">
                  {isPreviewing ? (
                    <>
                      {/* Live UnicornStudio preview — key forces remount on change */}
                      <div
                        key={`preview-${preset.projectId}`}
                        className="absolute inset-0"
                      >
                        <UnicornLivePreview projectId={preset.projectId} />
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowingPreview(null)}
                        className="absolute top-2 right-2 z-10 rounded-full bg-black/60 p-1 text-zinc-300 hover:text-white transition-colors"
                        aria-label="Cerrar preview"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </>
                  ) : (
                    <>
                      {/* Static thumbnail */}
                      <div
                        className="absolute inset-0"
                        style={{ background: preset.thumbnailGradient }}
                      />
                      {/* Shimmer overlay to hint animation */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => setShowingPreview(preset.id)}
                          className="flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm hover:bg-black/70 transition-colors"
                        >
                          <Play className="h-3 w-3" />
                          Vista previa
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {/* Card footer */}
                <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/80">
                  <div>
                    <p className="text-sm font-semibold text-zinc-100">
                      {preset.name}
                    </p>
                    <p className="text-xs text-zinc-500">{preset.description}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedType("unicorn");
                      setSelectedUnicorn(preset.id);
                    }}
                    className={cn(
                      "flex-shrink-0 rounded-full px-3 py-1 text-xs font-semibold border transition-colors",
                      isSelected
                        ? "border-purple-500 bg-purple-500/20 text-purple-300"
                        : "border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200"
                    )}
                  >
                    {isSelected ? "Seleccionado" : "Seleccionar"}
                  </button>
                </div>

                {isSelected && (
                  <span className="absolute top-2 left-2 z-10">
                    <CheckCircle2 className="h-5 w-5 text-purple-400 drop-shadow" />
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Footer: guardar ──────────────────────────────────────── */}
      <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
        {message ? (
          <p
            className={cn(
              "text-sm",
              message.type === "success" ? "text-emerald-400" : "text-red-400"
            )}
          >
            {message.text}
          </p>
        ) : (
          <span />
        )}
        <Button
          onClick={handleSave}
          disabled={isPending || !hasChanges}
          className="bg-white text-zinc-950 hover:bg-zinc-200 font-semibold min-w-[140px]"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Guardando...
            </>
          ) : (
            "Guardar cambios"
          )}
        </Button>
      </div>
    </div>
  );
}
