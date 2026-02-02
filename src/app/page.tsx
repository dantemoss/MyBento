"use client"

import Link from "next/link"
import { ArrowRight, Zap, Box, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  RetroGrid,
  DotPattern,
  LetterPullUp,
  ShimmerButton,
  BentoGrid,
  BentoCard,
} from "@/components/magic-ui"

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-white dark:bg-black text-black dark:text-white font-sans overflow-hidden">
      {/* Patrones de fondo */}
      <div className="absolute inset-0 -z-10">
        <RetroGrid />
        <DotPattern className="[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]" />
      </div>

      {/* Navbar Minimalista */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between px-6 md:px-8 py-6 max-w-7xl mx-auto w-full relative z-10"
      >
        <div className="text-2xl font-bold tracking-tighter">Bion</div>
        <Link href="/login">
          <Button variant="ghost" className="text-sm font-medium">
            Entrar
          </Button>
        </Link>
      </motion.nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 md:py-20 text-center max-w-6xl mx-auto relative z-10">
        {/* Título Principal con LetterPullUp */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1] mb-8">
            <LetterPullUp words="Tu identidad merece luz propia" delay={0.2} />
          </h1>
        </motion.div>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg md:text-xl lg:text-2xl text-zinc-600 dark:text-zinc-400 mb-12 max-w-3xl leading-relaxed"
        >
          Bion: El espacio para tus links con alma
        </motion.p>

        {/* CTA Principal con ShimmerButton */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-24"
        >
          <Link href="/login">
            <ShimmerButton className="h-14 px-10 rounded-xl text-base font-semibold bg-black dark:bg-white text-white dark:text-black">
              Empezar ahora — es gratis
              <ArrowRight className="ml-2 w-5 h-5" />
            </ShimmerButton>
          </Link>
        </motion.div>

        {/* Sección Bento Grid */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-5xl mx-auto"
        >
          <BentoGrid className="md:auto-rows-[20rem]">
            <BentoCard
              name="Velocidad de elite"
              description="Configurá tu perfil en 30 segundos. Sin complicaciones, sin esperas. Tu identidad digital lista en un instante."
              icon={<Zap className="w-8 h-8 text-zinc-700 dark:text-zinc-300" />}
              delay={0.1}
              className="md:col-span-1"
            />
            <BentoCard
              name="Diseño Modular"
              description="Layouts que se adaptan a tu vibra. Elegí el estilo que mejor te represente y deja que el diseño hable por vos."
              icon={<Box className="w-8 h-8 text-zinc-700 dark:text-zinc-300" />}
              delay={0.2}
              className="md:col-span-2"
            />
            <BentoCard
              name="Estética Curada"
              description="Presets de colores que no tienen los demás. Cada detalle pensado para que tu identidad brille y conecte con quien realmente sos."
              icon={<Sparkles className="w-8 h-8 text-zinc-700 dark:text-zinc-300" />}
              delay={0.3}
              className="md:col-span-1"
            />
          </BentoGrid>
        </motion.section>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-12 text-center text-sm text-zinc-400 border-t border-zinc-200 dark:border-zinc-800 mt-20 relative z-10"
      >
        Bion — Hecho por un Admin, para el mundo
      </motion.footer>
    </div>
  )
}
