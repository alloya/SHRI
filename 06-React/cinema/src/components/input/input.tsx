import s from "./input.module.css";

export const Input = ({ callback }: { callback: (event: string) => void }) => {

  return <div className={s.wrapper}>
    <label htmlFor="title" className={s.label}>Название</label>
    <input type="text" className={s.input} id="title" name="title" placeholder="Введите название" onChange={(event) =>callback(event.target.value)}/>
  </div>
}