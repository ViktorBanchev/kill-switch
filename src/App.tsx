import { EvidenceInputList } from "./components/EvidenceInputList";
import type { EvidenceItem } from "./types/engine";

const items: EvidenceItem[] = [{
  id: 'sdfa',
  description: 'dasda',
  weight: 3,
},
{
  id: 'sddsafa',
  description: 'dasda',
  weight: 4
},
{
  id: 'sd53352fa',
  description: 'dasda',
  weight: 2
}
];

export default function App() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-100">
      <h2 className="text-3xl font-bold tracking-tight">kill-switch</h2>
      <EvidenceInputList title="nz" subtitle="subtitle" placeholder="nzsda" items={items} variant="facts" onAdd={() => console.log('nz')} onRemove={() => console.log('nz')} />
    </main>
  )
}