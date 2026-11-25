/**
 * Line drawings used by the hero animation and the category pages.
 * Each symbol is drawn inside a 200 x 200 box. A symbol is a list of SVG path
 * strings; `accent` paths are drawn in a lighter colour.
 */
import type { MotifId } from './categories'

export interface SymbolDef {
  main: string[]
  accent: string[]
}

export const symbols: Record<MotifId, SymbolDef> = {
  // Laptop with code brackets
  code: {
    main: [
      'M42 128 V72 Q42 64 50 64 H150 Q158 64 158 72 V128',
      'M24 128 H176 L168 144 H32 Z',
    ],
    accent: ['M84 88 L68 100 L84 112', 'M116 88 L132 100 L116 112', 'M106 84 L94 116'],
  },
  // Paintbrush with a ribbon of paint
  brush: {
    main: [
      'M154 34 L106 96',
      'M106 96 C92 98 84 108 84 122 C70 122 62 132 60 148 C78 148 96 144 104 132 C114 122 114 106 106 96 Z',
    ],
    accent: ['M34 168 C56 154 78 178 100 164 S144 152 168 166'],
  },
  // Microphone with sound waves
  wave: {
    main: [
      'M80 38 H120 V100 A20 20 0 0 1 80 100 Z',
      'M64 90 V100 A36 36 0 0 0 136 100 V90',
      'M100 136 V164',
      'M76 164 H124',
    ],
    accent: ['M148 80 Q160 100 148 120', 'M164 66 Q188 100 164 134', 'M52 80 Q40 100 52 120', 'M36 66 Q12 100 36 134'],
  },
  // Compass
  compass: {
    main: [
      'M156 100 A56 56 0 1 1 44 100 A56 56 0 1 1 156 100',
      'M100 58 L113 100 L100 142 L87 100 Z',
    ],
    accent: ['M100 30 V42', 'M100 158 V170', 'M30 100 H42', 'M158 100 H170'],
  },
}

export const symbolOrder: MotifId[] = ['code', 'brush', 'wave', 'compass']
