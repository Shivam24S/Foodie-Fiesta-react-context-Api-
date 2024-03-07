import { useContext, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
export default function Modal({ children, open, onClose, className = "" }) {
  // here i m creating my portal through which i can show my modal component different in react dom

  const dialog = useRef(null);

  useEffect(() => {
    const modal = dialog.current;
    if (open) {
      modal.showModal();
    }
    return () => {
      modal.close();
    };
  }, [open]);

  return createPortal(
    <dialog className={`modal ${className}`} ref={dialog} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
