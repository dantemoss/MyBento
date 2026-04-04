import { createClient } from "@/utils/supabase/server";
import { ThemesForm } from "@/components/themes-form";
import { Palette } from "lucide-react";

export default async function ThemesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("background_type, background_config")
    .eq("id", user?.id)
    .single();

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-zinc-800 border border-zinc-700">
          <Palette className="h-5 w-5 text-zinc-300" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-zinc-100">Apariencia</h1>
          <p className="text-sm text-zinc-500">
            Personalizá el fondo de tu perfil público.
          </p>
        </div>
      </div>

      {/* Card */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
        <ThemesForm
          currentBackgroundType={profile?.background_type ?? null}
          currentBackgroundConfig={profile?.background_config ?? null}
        />
      </div>
    </div>
  );
}
