import { ReactNode, useEffect, useRef } from 'react';
import style from '../../assets/css/app.module.css';

type Props = {
  open: boolean;
  children: ReactNode;
};

export default function Modal({ open, children }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [open]);

  return (
    <dialog
      className={`${style.modal} ${style.grey} ${style.borderOutset}`}
      ref={ref}
    >
      {children}
    </dialog>
  );
}
