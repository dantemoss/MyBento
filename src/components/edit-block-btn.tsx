"use client"

import { useState } from "react"
import { updateBlock } from "@/app/admin/actions"
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
import { Pencil, Loader2 } from "lucide-react"
import { toast } from "sonner"

interface Block {
  id: string
  title: string
  url: string
  type: string
}

interface EditBlockBtnProps {
  block: Block
}

export function EditBlockBtn({ block }: EditBlockBtnProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [title, setTitle] = useState(block.title)
  const [url, setUrl] = useState(block.url)
  const [type, setType] = useState(block.type)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    const result = await updateBlock(block.id, { title, url, type })

    if (result?.error) {
      toast.error(result.error)
    } else {
      toast.success("Bloque actualizado correctamente")
      setOpen(false)
    }

    setIsLoading(false)
  }

  // Resetear valores cuando se abre el modal
  function handleOpenChange(isOpen: boolean) {
    if (isOpen) {
      setTitle(block.title)
      setUrl(block.url)
      setType(block.type)
    }
    setOpen(isOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-zinc-500 hover:text-blue-500 hover:bg-blue-500/10"
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] bg-zinc-950 border-zinc-800 text-zinc-100">
        <DialogHeader>
          <DialogTitle>Editar Bloque</DialogTitle>
          <DialogDescription>
            Modificá el título, URL o tipo de tu bloque.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          {/* Selector de Tipo */}
          <div className="grid gap-2">
            <Label htmlFor="type">Tipo de Bloque</Label>
            <select
              name="type"
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
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
            <Input
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Mi Portfolio"
              className="bg-zinc-900 border-zinc-800"
              required
            />
          </div>

          {/* URL */}
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
            />
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full mt-4" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                "Guardar Cambios"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
