import { type FC, useRef, useEffect, type PropsWithChildren } from "react";
import { ModalUI } from "./index.ui";

export interface ModalProps extends PropsWithChildren {
  open: boolean;
  title?: string;
  onClose: () => void;
}

export const Modal: FC<ModalProps> = (props) => {
  const { open, onClose } = props;
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) dialogRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const { overflow } = document.body.style;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = overflow;
    };
  }, [open]);

  return <ModalUI {...props} ref={dialogRef} />;
};
