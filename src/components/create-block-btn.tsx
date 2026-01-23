"use client"

import { useState } from "react"
import { createBlock } from "@/app/admin/actions"
import { Button } from "@/components/ui/button"
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

export function CreateBlockBtn() {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    try {
      await createBlock(formData)
      toast.success("Bloque creado correctamente")
      setOpen(false)
    } catch {
      toast.error("Error al crear el bloque")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-white text-black hover:bg-zinc-200 rounded-full font-medium">
          <Plus className="w-4 h-4 mr-2" />
          Agregar Bloque
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px] bg-zinc-950 border-zinc-800 text-zinc-100">
        <DialogHeader>
          <DialogTitle>Nuevo Bloque</DialogTitle>
          <DialogDescription>
            Agregá un enlace, video o contenido a tu perfil.
          </DialogDescription>
        </DialogHeader>
        
        {/* FORMULARIO */}
        <form action={handleSubmit} className="grid gap-4 py-4">
          
          {/* Selector de Tipo */}
          <div className="grid gap-2">
            <Label htmlFor="type">Tipo de Bloque</Label>
            <select 
              name="type" 
              id="type"
              disabled={isLoading}
              className="flex h-9 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-300 disabled:opacity-50"
            >
              <option value="link">Enlace Simple</option>
              <option value="github">Github Repo</option>
              <option value="youtube">Video YouTube</option>
              <option value="header">Título de Sección</option>
            </select>
          </div>

          {/* Título */}
          <div className="grid gap-2">
            <Label htmlFor="title">Título del Botón</Label>
            <Input id="title" name="title" placeholder="Ej: Mi Portfolio" className="bg-zinc-900 border-zinc-800" required disabled={isLoading} />
          </div>

          {/* URL */}
          <div className="grid gap-2">
            <Label htmlFor="url">URL de destino</Label>
            <Input id="url" name="url" placeholder="https://..." className="bg-zinc-900 border-zinc-800" required disabled={isLoading} />
          </div>

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