"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createBlock } from "@/app/admin/actions"
import { Button } from "@/components/ui/button"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { detectPlatform, getPlatformConfig } from "@/lib/platforms"
import { BrandIcon, isPlatformSupported, type PlatformKey } from "@/components/brand-icon"

export function CreateBlockBtn() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [url, setUrl] = useState("")
  const [blockType, setBlockType] = useState<"link" | "header">("link")

  // Detectar plataforma en tiempo real
  const detectedPlatform = blockType === "header" ? "header" : detectPlatform(url)
  const platformConfig = getPlatformConfig(detectedPlatform)

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    try {
      // Agregar el tipo detectado al formData
      formData.set("type", detectedPlatform)
      const result = await createBlock(formData)
      
      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success("Bloque creado correctamente")
        setOpen(false)
        setUrl("")
        setBlockType("link")
        // Forzar actualización de los datos
        router.refresh()
      }
    } catch (error) {
      console.error("Error al crear el bloque:", error)
      toast.error("Error inesperado al crear el bloque")
    } finally {
      setIsLoading(false)
    }
  }

  function handleOpenChange(isOpen: boolean) {
    setOpen(isOpen)
    if (!isOpen) {
      setUrl("")
      setBlockType("link")
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <ShimmerButton
          shimmerColor="#ffffff"
          background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          className="shadow-2xl"
        >
          <Plus className="w-4 h-4 mr-2" />
          Agregar Bloque
        </ShimmerButton>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px] bg-zinc-950 border-zinc-800 text-zinc-100">
        <DialogHeader>
          <DialogTitle>Nuevo Bloque</DialogTitle>
          <DialogDescription>
            Agregá un enlace, video o contenido a tu perfil.
          </DialogDescription>
        </DialogHeader>
        
        <form action={handleSubmit} className="grid gap-4 py-4">
          
          {/* Selector de Tipo */}
          <div className="grid gap-2">
            <Label htmlFor="blockType">Tipo de Bloque</Label>
            <select 
              id="blockType"
              value={blockType}
              onChange={(e) => setBlockType(e.target.value as "link" | "header")}
              disabled={isLoading}
              className="flex h-9 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-300 disabled:opacity-50"
            >
              <option value="link">Enlace</option>
              <option value="header">Título de Sección</option>
            </select>
          </div>

          {/* Título */}
          <div className="grid gap-2">
            <Label htmlFor="title">
              {blockType === "header" ? "Texto del Título" : "Título del Botón"}
            </Label>
            <Input 
              id="title" 
              name="title" 
              placeholder={blockType === "header" ? "Ej: Mis Redes" : "Ej: Mi Portfolio"} 
              className="bg-zinc-900 border-zinc-800" 
              required 
              disabled={isLoading} 
            />
          </div>

          {/* URL - Solo si no es header */}
          {blockType !== "header" && (
            <div className="grid gap-2">
              <Label htmlFor="url">URL de destino</Label>
              <Input 
                id="url" 
                name="url" 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://..." 
                className="bg-zinc-900 border-zinc-800" 
                required 
                disabled={isLoading} 
              />
              
              {/* Preview de plataforma detectada */}
              {url && detectedPlatform !== "link" && (
                <div 
                  className="flex items-center gap-2 p-2 rounded-lg border mt-1"
                  style={{ 
                    backgroundColor: platformConfig.bgColor,
                    borderColor: platformConfig.color 
                  }}
                >
                  {isPlatformSupported(detectedPlatform) ? (
                    <BrandIcon 
                      platform={detectedPlatform as PlatformKey} 
                      className="w-4 h-4 text-white" 
                    />
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                    </svg>
                  )}
                  <span className="text-sm text-zinc-300">
                    Detectado: <span className="font-medium text-white">{platformConfig.name}</span>
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Hidden input para type */}
          <input type="hidden" name="type" value={detectedPlatform} />
          {blockType === "header" && <input type="hidden" name="url" value="" />}

          <DialogFooter>
            <Button type="submit" className="w-full mt-4" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                "Guardar Bloque"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}