import { Dropdown } from "../drop-down/drop-down";
import { Input } from "../input/input";
import s from "./side-bar.module.css";

export const SideBar = () => {

  return <div className={s.wrapper}>
    <Input />
    <Dropdown text="Жанр"/>
    <Dropdown text="Кинотеатр"/>
  </div>
}