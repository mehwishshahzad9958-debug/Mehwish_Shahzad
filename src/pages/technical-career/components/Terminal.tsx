import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import { files, terminalCommands, type FileId } from '../../../data/workspace'
import { ChevronIcon } from './Icons'

interface Line {
  kind: 'in' | 'out' | 'err'
  text: string
}

interface Props {
  open: boolean
  onToggle: () => void
  onOpenFile: (id: FileId) => void
}

const welcome: Line[] = [
  { kind: 'out', text: 'Portfolio terminal (simulated). It only opens files in this workspace.' },
  { kind: 'out', text: 'Type "help" to see the commands.' },
]

/** A simulated terminal: matches typed words against a fixed command list. Nothing is executed. */
export default function Terminal({ open, onToggle, onOpenFile }: Props) {
  const [lines, setLines] = useState<Line[]>(welcome)
  const [value, setValue] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [cursor, setCursor] = useState<number | null>(null)
  const logRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const el = logRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines, open])

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase()
    const out: Line[] = [{ kind: 'in', text: raw }]
    if (!cmd) return setLines((l) => [...l, ...out])
    if (cmd === 'clear') return setLines([])
    if (cmd === 'help') {
      terminalCommands.forEach((c) => out.push({ kind: 'out', text: `${c.name.padEnd(13)}${c.description}` }))
    } else {
      const found = terminalCommands.find((c) => c.name === cmd)
      if (found?.open) {
        out.push({ kind: 'out', text: `Opening ${files[found.open].name}…` })
        onOpenFile(found.open)
      } else {
        out.push({ kind: 'err', text: `command not found: ${cmd.slice(0, 40)}. Type "help" to see what's available.` })
      }
    }
    setLines((l) => [...l, ...out])
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (value.trim()) setHistory((h) => [...h, value])
    run(value)
    setValue('')
    setCursor(null)
  }

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return
    e.preventDefault()
    if (!history.length) return
    const next = e.key === 'ArrowUp' ? (cursor === null ? history.length - 1 : Math.max(0, cursor - 1)) : cursor === null ? null : cursor + 1
    if (next === null || next >= history.length) {
      setCursor(null)
      setValue('')
    } else {
      setCursor(next)
      setValue(history[next])
    }
  }

  return (
    <section className={`tc-term${open ? '' : ' is-collapsed'}`} aria-label="Terminal">
      <div className="tc-term__bar">
        <button type="button" className="tc-term__toggle" aria-expanded={open} aria-controls="tc-term-body" onClick={onToggle}>
          <ChevronIcon open={open} />
          <span>TERMINAL</span>
        </button>
        {open && (
          <button type="button" className="tc-term__clear" onClick={() => setLines([])}>
            Clear
          </button>
        )}
      </div>
      <div id="tc-term-body" className="tc-term__body" hidden={!open} onClick={() => inputRef.current?.focus()}>
        <div ref={logRef} className="tc-term__log" role="log" aria-live="polite" aria-label="Terminal output">
          {lines.map((l, i) => (
            <p key={i} className={`tc-term__line is-${l.kind}`}>
              {l.kind === 'in' ? <span className="tc-term__ps">$ </span> : null}
              {l.text}
            </p>
          ))}
        </div>
        <form className="tc-term__form" onSubmit={submit}>
          <label htmlFor="tc-term-input" className="tc-term__ps">$</label>
          <input
            id="tc-term-input"
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKey}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            maxLength={60}
            placeholder='type "help"'
            aria-label="Terminal command"
          />
        </form>
      </div>
    </section>
  )
}
