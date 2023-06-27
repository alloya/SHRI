import s from "./input.module.css";
import st from "../../utils/styles.module.css";
import classNames from "classnames";

export const Input = ({ value, callback }: { value: string | null, callback: (event: string) => void }) => {

  return <div className={s.wrapper}>
    <label htmlFor="title" className={st.text_small}>Название</label>
    <input type="text"
      className={classNames(st.text_small, s.input)}
      value={value || undefined}
      id="title"
      name="title"
      placeholder="Введите название"
      onChange={(event) => callback(event.target.value)} />
  </div>
}