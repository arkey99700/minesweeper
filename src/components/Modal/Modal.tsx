import { ReactNode, useEffect, useRef } from "react";
import style from "../../assets/css/app.module.css";

type Props = {
  open: boolean;
  children: ReactNode;
};

const Modal = ({ open, children }: Props) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    open ? ref.current?.showModal() : ref.current?.close();
  }, [open]);

  return (
    <dialog
      className={`${style.modal} ${style.grey} ${style.borderOutset}`}
      ref={ref}
    >
      {children}
    </dialog>
  );
};

export default Modal;
