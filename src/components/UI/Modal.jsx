import { useContext, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import UserProgress from "../../store/UserProgress";
export default function Modal({ children, open, className = "" }) {
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

  const userProgressCtx = useContext(UserProgress);

  return createPortal(
    <dialog
      className={`modal ${className}`}
      ref={dialog}
      open={userProgressCtx.progress === "cart"}
    >
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
