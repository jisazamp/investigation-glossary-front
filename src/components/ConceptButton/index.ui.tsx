import type { FC } from "react";

interface ConceptButtonUIProps {
  color?: string;
  label: string;
  onClick?(): void;
}

export const ConceptButtonUI: FC<ConceptButtonUIProps> = (props) => {
  const { label, onClick } = props;
  return (
    <button
      className="py-3 px-2 cursor-pointer rounded-lg border border-gray-200 flex items-center gap-1.5 font-semibold"
      onClick={onClick}
    >
      <div className="h-6 w-6 rounded-full bg-red-500"></div>
      {label}
    </button>
  );
};
