// Context for the lightbox: useLightbox().open(items, index), items = [{ src, cap } | { video }].
import { createContext, useContext } from 'react'

export const LightboxContext = createContext({ open: () => {} })
export const useLightbox = () => useContext(LightboxContext)
