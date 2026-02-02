import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import { signOut } from "./actions";
import Link from "next/link";
import { Settings, ExternalLink } from "lucide-react";
import { QRCodeBtn } from "@/components/qr-code-btn";
import { AdminSidebar } from "@/components/admin-sidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();

  // Verificamos sesión en el servidor
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  // Verificar si el usuario tiene perfil con username
  const { data: profile } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .single();

  // Si no tiene username, redirigir a onboarding
  if (!profile?.username) {
    redirect("/onboarding");
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex">
      {/* SIDEBAR */}
      <AdminSidebar />

      {/* CONTENIDO PRINCIPAL */}
      <div className="flex-1 flex flex-col">
        {/* HEADER */}
        <header className="border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-50">
          <div className="px-6 h-16 flex justify-between items-center">
            <div className="flex items-center gap-2 lg:hidden">
              <div className="h-6 w-6 bg-white rounded-md"></div>
              <h1 className="font-bold text-lg tracking-tight">Bion</h1>
            </div>

            <div className="flex items-center gap-4 ml-auto">
              <Link 
                href={`/${profile.username}`} 
                target="_blank"
                className="text-xs text-zinc-500 font-mono hidden sm:flex items-center gap-1 hover:text-zinc-300 transition-colors"
              >
                @{profile.username}
                <ExternalLink className="w-3 h-3" />
              </Link>

              <QRCodeBtn username={profile.username} />

              <Link href="/admin/settings">
                <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white hover:bg-zinc-800">
                  <Settings className="w-5 h-5" />
                </Button>
              </Link>

              <form action={signOut}>
                <Button variant="outline" size="sm" className="h-8 border-zinc-700 hover:bg-zinc-800 text-zinc-300">
                  Salir
                </Button>
              </form>
            </div>
          </div>
        </header>

        {/* CONTENIDO */}
        <main className="flex-1 p-6 py-10 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}