"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { updateBlock, deleteBlock } from "@/app/admin/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Loader2, Trash2, Eye, EyeOff, Sparkles } from "lucide-react"
import { toast } from "sonner"
import { BrandIcon, isPlatformSupported, type PlatformKey } from "@/components/brand-icon"
import { detectPlatform, getPlatformConfig } from "@/lib/platforms"
import { cn } from "@/lib/utils"
import type { Block } from "@/lib/types"

interface EditBlockSheetProps {
  block: Block
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditBlockSheet({ block, open, onOpenChange }: EditBlockSheetProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [title, setTitle] = useState(block.title || "")
  const [url, setUrl] = useState(block.url || "")
  const [isActive, setIsActive] = useState(block.is_active)
  const [isHighlighted, setIsHighlighted] = useState(block.is_highlighted)

  // Resetear el estado cuando cambia el bloque
  useEffect(() => {
    setTitle(block.title || "")
    setUrl(block.url || "")
    setIsActive(block.is_active)
    setIsHighlighted(block.is_highlighted)
  }, [block])

  // Detectar plataforma
  const detectedPlatform = url ? detectPlatform(url) : "link"
  const platformConfig = getPlatformConfig(detectedPlatform)
  const useBrandIcon = isPlatformSupported(detectedPlatform)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await updateBlock(block.id, {
        title,
        url,
        type: detectedPlatform,
        is_active: isActive,
        is_highlighted: isHighlighted,
      })

      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success("Bloque actualizado correctamente")
        onOpenChange(false)
        router.refresh()
      }
    } catch (error) {
      console.error("Error al actualizar bloque:", error)
      toast.error("Error inesperado al actualizar el bloque")
    } finally {
      setIsLoading(false)
    }
  }

  async function handleDelete() {
    setIsDeleting(true)

    try {
      const result = await deleteBlock(block.id)

      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success("Bloque eliminado correctamente")
        onOpenChange(false)
        router.refresh()
      }
    } catch (error) {
      console.error("Error al eliminar bloque:", error)
      toast.error("Error inesperado al eliminar el bloque")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="right" 
        className="w-full sm:max-w-md bg-zinc-900/95 backdrop-blur-xl border-l border-zinc-800/50 flex flex-col p-0 max-h-screen overflow-hidden"
      >
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-zinc-800/50 flex-shrink-0">
          <SheetTitle className="text-zinc-100 text-xl">Editar Bloque</SheetTitle>
          <SheetDescription className="text-zinc-400">
            Modificá el título, URL y configuración de visibilidad.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 px-6 py-4 space-y-4 overflow-y-auto">
            {/* Preview del icono detectado */}
            {url && detectedPlatform !== "link" && (
              <div 
                className="flex items-center gap-3 p-3 rounded-xl border backdrop-blur-sm"
                style={{ 
                  backgroundColor: platformConfig.bgColor || 'rgba(113, 113, 122, 0.1)',
                  borderColor: platformConfig.color || 'rgba(113, 113, 122, 0.3)'
                }}
              >
                {useBrandIcon ? (
                  <BrandIcon 
                    platform={detectedPlatform as PlatformKey} 
                    className="w-5 h-5 flex-shrink-0"
                    style={{ color: platformConfig.color }}
                  />
                ) : (
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    className="w-5 h-5 flex-shrink-0"
                    style={{ color: platformConfig.color }}
                  >
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                  </svg>
                )}
                <div className="flex-1">
                  <p className="text-sm font-medium text-zinc-100">{platformConfig.name}</p>
                  <p className="text-xs text-zinc-400">Plataforma detectada</p>
                </div>
              </div>
            )}

            {/* Título */}
            <div className="space-y-2">
              <Label htmlFor="edit-title" className="text-zinc-200">
                Título del botón
              </Label>
              <Input
                id="edit-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej: Mi Portfolio"
                className="bg-zinc-950/50 border-zinc-800 text-zinc-100 placeholder:text-zinc-600"
                required
                disabled={isLoading}
              />
            </div>

            {/* URL */}
            <div className="space-y-2">
              <Label htmlFor="edit-url" className="text-zinc-200">
                URL de destino
              </Label>
              <Input
                id="edit-url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://..."
                className="bg-zinc-950/50 border-zinc-800 text-zinc-100 placeholder:text-zinc-600"
                required
                disabled={isLoading}
              />
            </div>

            {/* Divisor */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-800/50" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-zinc-900 px-2 text-zinc-500">Configuración</span>
              </div>
            </div>

            {/* Switch: Visible/Oculto */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-zinc-800/50">
              <div className="flex items-center gap-3 flex-1">
                {isActive ? (
                  <Eye className="w-5 h-5 text-green-500 flex-shrink-0" />
                ) : (
                  <EyeOff className="w-5 h-5 text-zinc-500 flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <Label htmlFor="edit-active" className="text-zinc-200 font-medium cursor-pointer block">
                    Visible
                  </Label>
                  <p className="text-xs text-zinc-500 mt-0.5 truncate">
                    {isActive ? "Público" : "Oculto"}
                  </p>
                </div>
              </div>
              <Switch
                id="edit-active"
                checked={isActive}
                onCheckedChange={setIsActive}
                disabled={isLoading}
                className="flex-shrink-0"
              />
            </div>

            {/* Switch: Destacar */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-zinc-800/50">
              <div className="flex items-center gap-3 flex-1">
                <Sparkles className={cn(
                  "w-5 h-5 flex-shrink-0",
                  isHighlighted ? "text-yellow-500" : "text-zinc-500"
                )} />
                <div className="flex-1 min-w-0">
                  <Label htmlFor="edit-highlighted" className="text-zinc-200 font-medium cursor-pointer block">
                    Destacar
                  </Label>
                  <p className="text-xs text-zinc-500 mt-0.5 truncate">
                    {isHighlighted ? "Doble ancho" : "Normal"}
                  </p>
                </div>
              </div>
              <Switch
                id="edit-highlighted"
                checked={isHighlighted}
                onCheckedChange={setIsHighlighted}
                disabled={isLoading}
                className="flex-shrink-0"
              />
            </div>

            {/* Estadísticas */}
            <div className="p-3 rounded-xl bg-white/5 border border-zinc-800/50">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Clicks</span>
                <span className="text-lg font-semibold text-zinc-100">
                  {block.clicks || 0}
                </span>
              </div>
            </div>
          </div>

          {/* Footer - Solo botón Guardar y icono de eliminar */}
          <SheetFooter className="flex-row items-center justify-between gap-3 px-6 py-4 border-t border-zinc-800/50 bg-zinc-900/80 backdrop-blur-sm flex-shrink-0">
            {/* Botón Guardar - Ocupa todo el espacio */}
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                "Guardar Cambios"
              )}
            </Button>

            {/* Botón Eliminar - Solo icono con hover */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="flex-shrink-0 text-red-400 hover:text-red-300 hover:bg-red-950/50 transition-colors"
                  disabled={isLoading || isDeleting}
                >
                  {isDeleting ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Trash2 className="h-5 w-5" />
                  )}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-zinc-100">
                    ¿Eliminar este bloque?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-zinc-400">
                    Esta acción no se puede deshacer. El bloque &quot;{title}&quot; será eliminado permanentemente.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700">
                    Cancelar
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-red-600 text-white hover:bg-red-700"
                  >
                    Eliminar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
