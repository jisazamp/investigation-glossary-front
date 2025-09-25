import type { FC } from "react";
import { ConceptButtonUI } from "./index.ui";

interface ConceptButtonProps {
  label: string;
  color?: string;
  onClick?(): void;
}

export const ConceptButton: FC<ConceptButtonProps> = (props) => {
  return <ConceptButtonUI {...props} />;
};
