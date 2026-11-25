/**
 * Visual styling for the homepage career bookshelf. Presentation only: the facts come
 * from professionalJourney.ts. A record without an entry here still gets a book
 * (it falls back to the next palette in `fallbackStyles`).
 */
export type SpineIcon = 'school' | 'abc' | 'smile' | 'chalk' | 'gantt' | 'pencil' | 'tower' | 'code' | 'plus'
export type SpinePattern = 'dots' | 'rules' | 'bars' | 'arcs' | 'grid'

export interface BookStyle {
  bg: string
  fg: string
  /** Colour of the book's side and top faces. */
  side: string
  /** Width, height and depth in px. */
  w: number
  h: number
  d: number
  icon: SpineIcon
  pattern: SpinePattern
  /** Dashed inner frame. */
  frame?: boolean
  /** Spine title font size override (px). */
  fs?: number
}

export const bookStyles: Record<string, BookStyle> = {
  'sughar-public-school': { bg: '#fbe5d5', fg: '#7e3314', side: '#e8c4a8', w: 112, h: 318, d: 52, icon: 'school', pattern: 'dots', frame: true },
  'eureka-english': { bg: '#efe2d2', fg: '#3a2318', side: '#d5c3ac', w: 98, h: 352, d: 46, icon: 'abc', pattern: 'rules', frame: true },
  miles2smile: { bg: '#a8552f', fg: '#fbe5d5', side: '#7f3d1f', w: 106, h: 296, d: 48, icon: 'smile', pattern: 'dots' },
  tamak: { bg: '#2f3a2c', fg: '#f4efe4', side: '#222b20', w: 150, h: 384, d: 64, icon: 'chalk', pattern: 'rules', frame: true, fs: 27 },
  'cce-pmt': { bg: '#5b4146', fg: '#f7e3da', side: '#42302f', w: 104, h: 334, d: 50, icon: 'gantt', pattern: 'bars' },
  'talent-zone-school': { bg: '#f7d9c5', fg: '#5b2a14', side: '#e0b99d', w: 110, h: 306, d: 48, icon: 'pencil', pattern: 'grid', frame: true },
  'indus-towers': { bg: '#3a2318', fg: '#f7e3da', side: '#27160e', w: 128, h: 372, d: 60, icon: 'tower', pattern: 'arcs' },
  peltown: { bg: '#24384f', fg: '#e7eef6', side: '#182739', w: 116, h: 346, d: 54, icon: 'code', pattern: 'grid' },
}

/** Used for any record added later that has no entry above. */
export const fallbackStyles: BookStyle[] = [
  { bg: '#2f3a2c', fg: '#f4efe4', side: '#222b20', w: 112, h: 330, d: 50, icon: 'chalk', pattern: 'rules' },
  { bg: '#a8552f', fg: '#fbe5d5', side: '#7f3d1f', w: 106, h: 310, d: 48, icon: 'smile', pattern: 'dots' },
  { bg: '#5b4146', fg: '#f7e3da', side: '#42302f', w: 108, h: 346, d: 50, icon: 'gantt', pattern: 'bars' },
]

/** Era brackets under the shelf, by start year. Labels describe the span; ranges are computed from the dates. */
export const eras = [
  { until: 2020, label: 'first chapters' },
  { until: 2022, label: 'founding and managing' },
  { until: 9999, label: 'building solutions' },
]

export const ghostStyle: BookStyle = { bg: 'transparent', fg: '#6b5648', side: 'transparent', w: 96, h: 300, d: 40, icon: 'plus', pattern: 'dots' }
