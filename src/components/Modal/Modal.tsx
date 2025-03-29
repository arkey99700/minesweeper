import { ReactNode, useEffect, useRef } from 'react';
import style from '../../assets/css/app.module.scss';

type Props = {
  isOpen: boolean;
  children: ReactNode;
};

export default function Modal({ isOpen, children }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog
      className={`${style.modal} ${style.grey} ${style.borderOutset}`}
      ref={ref}
    >
      {children}
    </dialog>
  );
}
