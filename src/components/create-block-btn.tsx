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
import { Plus } from "lucide-react"

export function CreateBlockBtn() {
  const [open, setOpen] = useState(false)

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
        <form 
          action={async (formData) => {
            await createBlock(formData)
            setOpen(false) // Cerramos el modal al terminar
          }} 
          className="grid gap-4 py-4"
        >
          
          {/* Selector de Tipo */}
          <div className="grid gap-2">
            <Label htmlFor="type">Tipo de Bloque</Label>
            <select 
              name="type" 
              id="type"
              className="flex h-9 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-300"
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
            <Input id="title" name="title" placeholder="Ej: Mi Portfolio" className="bg-zinc-900 border-zinc-800" required />
          </div>

          {/* URL */}
          <div className="grid gap-2">
            <Label htmlFor="url">URL de destino</Label>
            <Input id="url" name="url" placeholder="https://..." className="bg-zinc-900 border-zinc-800" required />
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full mt-4">Guardar Bloque</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}