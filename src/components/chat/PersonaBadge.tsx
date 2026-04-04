export default function PersonaBadge({ persona }: { persona: string }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 border-b border-indigo-100">
      <span className="text-xs font-medium text-indigo-500 uppercase tracking-wide">Persona</span>
      <span className="text-sm text-indigo-800 truncate">{persona}</span>
    </div>
  );
}
