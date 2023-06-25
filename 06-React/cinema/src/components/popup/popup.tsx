import { ReactNode } from "react";
import s from "./popup.module.css";

export const Popup = ({ children, close }: { close: () => void, children: ReactNode }) => {
  return (
    <div className={s.overlay} onClick={() => close()}>
      <div className={s.container}>
        <button type="button" className={s.close} onClick={() => close()}></button>
        {children}
      </div>
    </div>
  );
}