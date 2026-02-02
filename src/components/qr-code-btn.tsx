"use client"

import { useState } from "react"
import { QRCodeSVG } from "qrcode.react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { QrCode, Download, Copy, Check } from "lucide-react"
import { toast } from "sonner"

interface QRCodeBtnProps {
  username: string
}

export function QRCodeBtn({ username }: QRCodeBtnProps) {
  const [copied, setCopied] = useState(false)
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bion.vercel.app"
  const profileUrl = `${siteUrl}/${username}`

  function handleCopyLink() {
    navigator.clipboard.writeText(profileUrl)
    setCopied(true)
    toast.success("Link copiado al portapapeles")
    setTimeout(() => setCopied(false), 2000)
  }

  function handleDownloadQR() {
    const svg = document.getElementById("qr-code-svg")
    if (!svg) return

    // Crear canvas para convertir SVG a PNG
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const svgData = new XMLSerializer().serializeToString(svg)
    const img = new Image()
    
    img.onload = () => {
      canvas.width = 512
      canvas.height = 512
      ctx?.drawImage(img, 0, 0, 512, 512)
      
      const pngUrl = canvas.toDataURL("image/png")
      const downloadLink = document.createElement("a")
      downloadLink.href = pngUrl
      downloadLink.download = `bion-${username}-qr.png`
      downloadLink.click()
      
      toast.success("QR descargado")
    }
    
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)))
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="border-zinc-700 hover:bg-zinc-800">
          <QrCode className="w-4 h-4 mr-2" />
          QR Code
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-zinc-950 border-zinc-800 text-zinc-100">
        <DialogHeader>
          <DialogTitle>Tu código QR</DialogTitle>
          <DialogDescription>
            Compartí tu perfil escaneando este código.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-6 py-6">
          {/* QR Code */}
          <div className="bg-white p-4 rounded-xl">
            <QRCodeSVG
              id="qr-code-svg"
              value={profileUrl}
              size={200}
              level="H"
              includeMargin={false}
            />
          </div>

          {/* URL */}
          <div className="flex items-center gap-2 w-full">
            <code className="flex-1 bg-zinc-900 px-3 py-2 rounded-lg text-sm text-zinc-400 truncate">
              {profileUrl}
            </code>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopyLink}
              className="shrink-0 hover:bg-zinc-800"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>

          {/* Download Button */}
          <Button onClick={handleDownloadQR} className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Descargar QR (PNG)
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
