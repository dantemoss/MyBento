import { createClient } from "@/utils/supabase/server";
import { updateProfile } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Buscamos los datos actuales para rellenar el formulario
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id)
    .single();

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-zinc-900 border-zinc-800 text-zinc-100">
        <CardHeader>
          <CardTitle>Configuración de Perfil</CardTitle>
          <CardDescription>
            Actualizá tu información pública.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={updateProfile} className="space-y-6">
            
            {/* Foto de Perfil */}
            <div className="space-y-2">
                <Label htmlFor="avatar">Foto de Perfil</Label>
                <div className="flex items-center gap-4">
                    {profile?.avatar_url && (
                        <img 
                            src={profile.avatar_url} 
                            alt="Avatar actual" 
                            className="w-16 h-16 rounded-full object-cover border border-zinc-700"
                        />
                    )}
                    <Input 
                        id="avatar" 
                        name="avatar" 
                        type="file" 
                        accept="image/*"
                        className="bg-zinc-950 border-zinc-800 file:text-zinc-400 text-zinc-300" 
                    />
                </div>
            </div>

            {/* Nombre Completo */}
            <div className="space-y-2">
              <Label htmlFor="fullName">Nombre Completo</Label>
              <Input 
                id="fullName" 
                name="fullName" 
                defaultValue={profile?.full_name || ""} 
                placeholder="Ej: Dante Moss"
                className="bg-zinc-950 border-zinc-800" 
              />
            </div>

            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username">Nombre de Usuario</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-zinc-500 text-sm">mybento.vercel.app/</span>
                <Input 
                    id="username" 
                    name="username" 
                    defaultValue={profile?.username || ""} 
                    className="pl-40 bg-zinc-950 border-zinc-800" 
                />
              </div>
              <p className="text-xs text-zinc-500">Cuidado: Si cambiás esto, tu link viejo va a dejar de funcionar.</p>
            </div>

            <div className="pt-4 flex justify-end gap-4">
                <Button type="submit">Guardar Cambios</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}