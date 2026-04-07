export default function EngagementScore({ score }: { score: number }) {
  const color =
    score >= 70 ? "#00F5A0" : score >= 40 ? "#FFB547" : "#FF6B6B";
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 rounded-full bg-gray-100 overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${score}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-xs font-semibold" style={{ color }}>{score}</span>
    </div>
  );
}
