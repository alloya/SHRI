import s from "./drop-down.module.css";

export const Dropdown = ({ text }: { text: string }) => {

  return <div>
    <label htmlFor="genre" className={s.label}>{text}</label>
    <div className={s.dropdown} id="genre">
    </div>
  </div>
}