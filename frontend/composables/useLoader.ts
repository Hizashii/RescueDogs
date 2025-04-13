import { useState } from '#imports'

export function useLoader() {
  return useState<boolean>('isLoading', () => false)
}
