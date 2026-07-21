import type { DietType } from "../lib/api";
import { DIET_LABELS } from "../lib/content";

export function DietBadge({ dietType }: { dietType: DietType }) {
  const info = DIET_LABELS[dietType] ?? DIET_LABELS["VEG"]!;

  return (
    <span className={`diet-badge ${info.className}`} title={info.label}>
      <span className="diet-badge-icon" aria-hidden="true" />
      {info.label}
    </span>
  );
}
