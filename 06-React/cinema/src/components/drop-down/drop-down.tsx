import s from "./drop-down.module.css";
import st from "../../utils/styles.module.css";
import classNames from "classnames";
import { IFIlter } from "@/models/filter.model";

export const Dropdown = ({ value, placeholder, text, list, callback }: { value: string | null, placeholder: string, text: string, list: IFIlter[], callback: (value: string) => void }) => {

  return <div>
    <p className={classNames(st.text_small)}>{text}</p>
    <select className={classNames(st.text_small, st.w_100, s.select)}
      value={value || undefined} 
      onChange={(event) => callback(event.target.value)}
      placeholder={placeholder}
    >
      {list.map((el) => 
      <option className={s.option} value={el.key} key={el.key}>{el.value}</option>
      )}
    </select>
  </div>
}