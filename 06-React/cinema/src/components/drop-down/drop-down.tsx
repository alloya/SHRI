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
  const [coords, setCoords ] = useState({left: 0, width: 0, top: 0, height: 0})

  useEffect(() => {
    setElement(ref.current);
    if (ref.current)
    setCoords(ref.current.getBoundingClientRect())
  }, []);

  const handleClick = (value: string) => {
    callback(value);
  }

  useEffect(() => {
    window.addEventListener('scroll', ()=> setCoords(ref.current!.getBoundingClientRect()))
  }, [])

  return <div>
    <p className={classNames(st.text_small)}>{text}</p>
    <div ref={ref} onClick={() => setShowDD(!showDD)} className={s.relative}>
      <div className={classNames(st.text_small, st.w_100, s.select)}>
        {placeholder}
      </div>
      <span className={classNames(s.arrow_up, (showDD && s.arrow_down))} />
      {element && showDD && (
        <Options open={showDD} coords={coords} list={list} callback={(value) => handleClick(value)} close={() => setShowDD(false)} />
      )}
    </div>
  </div>
}

const Options = (props: { open: boolean, list: IFIlter[], coords: {left: number, width: number, top: number, height: number}, callback: (value: string) => void, close: () => void }) => {
  const { open, list, coords, callback, close } = props;
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
    <div className={classNames(st.text_small, st.w_100, s.select, s.shadow)} style={{ position: 'absolute', top: (coords.top || 0) + (coords.height || 0), width: coords.width, left: coords.left}}>{options}
    </div>
    ,
    document.body
  )
}