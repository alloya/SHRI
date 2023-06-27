'use client'
import s from "./drop-down.module.css";
import st from "../../utils/styles.module.css";
import classNames from "classnames";
import { IFIlter } from "@/models/filter.model";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export const Dropdown = ({ placeholder, text, list, callback }: { placeholder: string, text: string, list: IFIlter[], callback: (value: string) => void }) => {
  
  const ref = useRef<HTMLDivElement>(null);
  const [element, setElement] = useState<HTMLDivElement | null>(null);
  const [showDD, setShowDD] = useState(false);

  useEffect(() => {
    setElement(ref.current);
  }, []);

  const handleClick = (value: string) => {
    callback(value);
  }

  return <div>
    <p className={classNames(st.text_small)}>{text}</p>
    <div ref={ref} onClick={() => setShowDD(!showDD)} className={s.relative}>
      <div className={classNames(st.text_small, st.w_100, s.select)}>
        {placeholder}
      </div>
      <span className={classNames(s.arrow_up, (showDD && s.arrow_down))}/>
      {element && showDD && (
        <Options open={showDD} element={element} list={list} callback={(value) => handleClick(value)} close={() => setShowDD(false)} />
      )}
    </div>
  </div>
}

const Options = (props: { open: boolean, list: IFIlter[], element: HTMLDivElement | null, callback: (value: string) => void, close: () => void }) => {
  const { open, list, element, callback, close } = props;
  if (!open) {
    return null;
  }

  const options = list.map(el => (
    <div className={s.padding} key={el.key} onClick={() => {
      close();
      callback(el.key)
    }}>{el.value}</div>
  ))

  return createPortal(
    <div className={classNames(st.text_small, st.w_100, s.select, s.shadow)}>{options}
    </div>,
    element || document.body
  )
}