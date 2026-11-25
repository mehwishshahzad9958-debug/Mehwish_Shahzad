import { createContext } from 'react'

/** The editor pane element, so the photo viewer can open inside the workspace. */
export const EditorHost = createContext<HTMLElement | null>(null)
