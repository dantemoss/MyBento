import { createClient } from "@/utils/supabase/server";
import { CreateBlockBtn } from "@/components/create-block-btn";
import { AdminDashboardClient } from "./dashboard-client";

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // 1. Buscamos los bloques del usuario
  const { data: blocks } = await supabase
    .from("blocks")
    .select("*")
    .eq("user_id", user?.id)
    .order("position", { ascending: true });

  return (
    <div className="space-y-8">
      {/* Título y Botón de Acción */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Dashboard</h2>
          <p className="text-zinc-400">Administrá tus enlaces y contenido.</p>
        </div>
        <CreateBlockBtn />
      </div>

      {/* Dashboard Client con selector de variantes */}
      <AdminDashboardClient initialBlocks={blocks || []} />
    </div>
  )
}