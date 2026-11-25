/**
 * Structure and copy for the VS Code-inspired Technical & Career workspace.
 * Content for Profile, Skills, Projects, Architecture and Research has not been
 * supplied yet, so those files show empty states.
 */
import type { ExperienceId } from './experience'

export type FileId =
  | 'welcome'
  | 'experience'
  | 'indus'
  | 'peltown'
  | 'profile'
  | 'skills'
  | 'projects'
  | 'architecture'
  | 'research'
  | 'readme'

export interface WorkspaceFile {
  id: FileId
  /** Name shown on tabs and in the Explorer. */
  name: string
  kind: 'md' | 'ts' | 'folder' | 'view'
  /** Language shown in the status bar. */
  language: string
}

export const files: Record<FileId, WorkspaceFile> = {
  welcome: { id: 'welcome', name: 'Welcome', kind: 'view', language: 'Welcome' },
  experience: { id: 'experience', name: 'Experience', kind: 'view', language: 'Overview' },
  indus: { id: 'indus', name: 'Indus Towers.ts', kind: 'ts', language: 'TypeScript' },
  peltown: { id: 'peltown', name: 'Peltown.ts', kind: 'ts', language: 'TypeScript' },
  profile: { id: 'profile', name: 'Profile.md', kind: 'md', language: 'Markdown' },
  skills: { id: 'skills', name: 'Skills.ts', kind: 'ts', language: 'TypeScript' },
  projects: { id: 'projects', name: 'Projects', kind: 'folder', language: 'Folder' },
  architecture: { id: 'architecture', name: 'Architecture', kind: 'folder', language: 'Folder' },
  research: { id: 'research', name: 'Research', kind: 'folder', language: 'Folder' },
  readme: { id: 'readme', name: 'README.md', kind: 'md', language: 'Markdown' },
}

export const initialTabs: FileId[] = ['welcome', 'experience', 'indus', 'peltown']

export const experienceFileIds: ExperienceId[] = ['indus', 'peltown']

/** Explorer tree. `children` makes a folder; a folder with an `open` id also opens a tab. */
export interface TreeNode {
  id: FileId
  label: string
  children?: FileId[]
}
export const tree: TreeNode[] = [
  { id: 'profile', label: 'Profile.md' },
  { id: 'skills', label: 'Skills.ts' },
  { id: 'experience', label: 'Experience/', children: ['indus', 'peltown'] },
  { id: 'projects', label: 'Projects/' },
  { id: 'architecture', label: 'Architecture/' },
  { id: 'research', label: 'Research/' },
  { id: 'readme', label: 'README.md' },
]

export interface Placeholder {
  title: string
  message: string
}
export const placeholders: Partial<Record<FileId, Placeholder>> = {
  profile: { title: 'Profile', message: 'My profile write-up is being put together. It will appear here.' },
  skills: { title: 'Skills', message: 'Technical skills will be listed here once they are added.' },
  projects: { title: 'Projects', message: 'Projects and case studies will be added here.' },
  architecture: { title: 'Architecture', message: 'System design and architecture notes will be added here.' },
  research: { title: 'Research', message: 'Research and learning notes will be added here.' },
  readme: { title: 'README', message: 'A guide to this workspace will appear here.' },
}

export interface TerminalCommand {
  name: string
  description: string
  open?: FileId
}
export const terminalCommands: TerminalCommand[] = [
  { name: 'help', description: 'show available commands' },
  { name: 'profile', description: 'open my profile', open: 'profile' },
  { name: 'skills', description: 'open technical skills', open: 'skills' },
  { name: 'experience', description: 'open experience overview', open: 'experience' },
  { name: 'indus', description: 'open Indus Towers experience', open: 'indus' },
  { name: 'peltown', description: 'open Peltown experience', open: 'peltown' },
  { name: 'projects', description: 'open projects', open: 'projects' },
  { name: 'architecture', description: 'open system design and architecture', open: 'architecture' },
  { name: 'research', description: 'open research and learning', open: 'research' },
  { name: 'clear', description: 'clear terminal history' },
]
