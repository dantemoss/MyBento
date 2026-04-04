'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { UNICORN_PRESETS } from '@/lib/background-presets'

const ALLOWED_BACKGROUND_TYPES = ['default', 'gradient', 'unicorn'] as const
type BackgroundType = typeof ALLOWED_BACKGROUND_TYPES[number]

function isValidBackgroundType(value: string): value is BackgroundType {
  return ALLOWED_BACKGROUND_TYPES.includes(value as BackgroundType)
}

export async function updateBackground(backgroundType: string, backgroundConfig: string | null) {
  const supabase = await createClient()

  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'No autorizado' }

    if (!isValidBackgroundType(backgroundType)) {
      return { error: 'Tipo de fondo inválido' }
    }

    // Para unicorn: el config debe ser un preset ID conocido de la librería
    if (backgroundType === 'unicorn') {
      if (!backgroundConfig) return { error: 'Seleccioná un fondo animado de la librería' }
      const isKnownPreset = UNICORN_PRESETS.some((p) => p.id === backgroundConfig)
      if (!isKnownPreset) return { error: 'El fondo seleccionado no es válido' }
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('username')
      .eq('id', user.id)
      .single()

    const { error } = await supabase
      .from('profiles')
      .update({
        background_type: backgroundType,
        background_config: backgroundType === 'default' ? null : (backgroundConfig ?? null),
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id)

    if (error) {
      console.error('Error al actualizar el fondo:', error)
      return { error: 'Error al guardar el tema. Intentá nuevamente.' }
    }

    revalidatePath('/admin/themes')
    if (profile?.username) {
      revalidatePath(`/${profile.username}`)
    }

    return { success: true }
  } catch (err) {
    console.error('Error inesperado:', err)
    return { error: 'Error inesperado. Intentá nuevamente.' }
  }
}
