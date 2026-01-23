'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  return redirect('/login')
}

export async function createBlock(formData: FormData) {
  const supabase = await createClient()
  
  // 1. Verificar usuario
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  // 2. Sacar datos del formulario
  const title = formData.get('title') as string
  const url = formData.get('url') as string
  const type = formData.get('type') as string

  // 3. Guardar en Supabase
  await supabase.from('blocks').insert({
    user_id: user.id,
    title,
    url,
    type,
    content: {}, // JSON vacío por ahora
    position: 0, // Después arreglamos el orden
  })

  // 4. Refrescar la pantalla para ver el bloque nuevo
  revalidatePath('/admin')
}

export async function incrementClick(blockId: string) {
  const supabase = await createClient()
  
  // 1. Leemos el valor actual
  const { data: block } = await supabase
    .from('blocks')
    .select('clicks')
    .eq('id', blockId)
    .single()
    
  if (block) {
    // 2. Sumamos 1
    await supabase
        .from('blocks')
        .update({ clicks: block.clicks + 1 })
        .eq('id', blockId)
  }
}

export async function deleteBlock(blockId: string) {
  const supabase = await createClient()
  
  // 1. Verificar usuario
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'No autorizado' }

  // 2. Borrar el bloque (solo si pertenece al usuario)
  const { error } = await supabase
    .from('blocks')
    .delete()
    .eq('id', blockId)
    .eq('user_id', user.id)

  if (error) {
    return { error: 'Error al eliminar el bloque' }
  }

  // 3. Refrescar la página
  revalidatePath('/admin')
  return { success: true }
}

export async function updateBlock(blockId: string, data: { title: string; url: string; type: string }) {
  const supabase = await createClient()
  
  // 1. Verificar usuario
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'No autorizado' }

  // 2. Actualizar el bloque (solo si pertenece al usuario)
  const { error } = await supabase
    .from('blocks')
    .update({
      title: data.title,
      url: data.url,
      type: data.type,
    })
    .eq('id', blockId)
    .eq('user_id', user.id)

  if (error) {
    return { error: 'Error al actualizar el bloque' }
  }

  // 3. Refrescar la página
  revalidatePath('/admin')
  return { success: true }
}

export async function reorderBlocks(orderedIds: string[]) {
  const supabase = await createClient()
  
  // 1. Verificar usuario
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'No autorizado' }

  // 2. Actualizar posición de cada bloque
  const updates = orderedIds.map((id, index) => 
    supabase
      .from('blocks')
      .update({ position: index })
      .eq('id', id)
      .eq('user_id', user.id)
  )

  const results = await Promise.all(updates)
  const hasError = results.some(r => r.error)

  if (hasError) {
    return { error: 'Error al reordenar los bloques' }
  }

  // 3. Refrescar la página
  revalidatePath('/admin')
  return { success: true }
}