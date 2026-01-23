import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import { signOut } from "./actions";
import Link from "next/link";
import { Settings } from "lucide-react";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();

  // Verificamos sesión en el servidor
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* HEADER */}
      <header className="border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 bg-white rounded-md"></div> {/* Logo fake */}
            <h1 className="font-bold text-lg tracking-tight">MyBento</h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-zinc-500 font-mono hidden sm:block">
              {user.email}
            </span>

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

      {/* CONTENIDO PRINCIPAL */}
      <main className="max-w-5xl mx-auto p-6 py-10">
        {children}
      </main>
    </div>
  );
}