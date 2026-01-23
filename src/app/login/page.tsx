import { login, signup } from './actions'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LoginPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-zinc-950 px-4">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Ingresar</TabsTrigger>
          <TabsTrigger value="register">Registrarse</TabsTrigger>
        </TabsList>

        {/* TAB DE LOGIN */}
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Bienvenido de nuevo</CardTitle>
              <CardDescription>
                Ingresá tus credenciales para acceder a tu dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <form>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required placeholder="tu@email.com" />
                </div>
                <div className="space-y-1 mt-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input id="password" name="password" type="password" required />
                </div>
                <div className="pt-4">
                    <Button formAction={login} className="w-full">Iniciar Sesión</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB DE REGISTRO */}
        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle>Crear cuenta</CardTitle>
              <CardDescription>
                Empezá a construir tu perfil personalizado hoy.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <form>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required placeholder="tu@email.com" />
                </div>
                <div className="space-y-1 mt-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input id="password" name="password" type="password" required />
                </div>
                <div className="pt-4">
                    <Button formAction={signup} className="w-full" variant="secondary">Registrarse</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}