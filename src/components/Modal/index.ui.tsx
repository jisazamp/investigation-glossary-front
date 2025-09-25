import clsx from "clsx";
import type { ModalProps } from "./index.view";
import type { FC } from "react";

export const ModalUI: FC<ModalProps> = (props, ref) => {
  const { children, open, title, onClose } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <div
      className={clsx(
        "fixed inset-0 z-50 flex items-center justify-center p-4",
        open ? "visible" : "invisible",
      )}
      aria-hidden={!open}
    >
      <div
        className={clsx(
          "absolute inset-0 bg-black/50 transition-opacity",
          open ? "opacity-100" : "opacity-0",
        )}
        onMouseDown={handleClose}
      />

      <div
        ref={ref}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={clsx(
          "relative z-10 w-full max-w-2xl max-h-[80vh] overflow-hidden",
          "rounded-lg bg-white shadow-sm",
          "outline-none transition-transform",
          open ? "scale-100" : "scale-95",
        )}
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex items-center justify-between border-b border-gray-200 p-4">
          <h3 id="modal-title" className="text-xl font-semibold text-gray-900">
            {title}
          </h3>
          <button
            type="button"
            className="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-200 hover:text-gray-900"
            onClick={onClose}
          >
            <svg
              aria-hidden="true"
              className="h-3 w-3"
              fill="none"
              viewBox="0 0 14 14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
            <span className="sr-only">Cerrar modal</span>
          </button>
        </div>

        <div className="space-y-4 overflow-y-auto p-4">{children}</div>
      </div>
    </div>
  );
};
