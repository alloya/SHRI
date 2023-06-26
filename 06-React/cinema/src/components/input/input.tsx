import s from "./input.module.css";

export const Input = ({ value, callback }: { value: string | null, callback: (event: string) => void }) => {

  return <div className={s.wrapper}>
    <label htmlFor="title" className={s.label}>Название</label>
    <input type="text"
      className={s.input}
      value={value || undefined}
      id="title"
      name="title"
      placeholder="Введите название"
      onChange={(event) => callback(event.target.value)} />
  </div>
}