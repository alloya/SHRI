import { useState } from "react";
import st from "../../utils/styles.module.css";
import s from "./accordeon.module.css";
import classNames from "classnames";

export const Accordeon = ({ question, answer }: { question: string, answer: string }) => {
  const [show, setShow] = useState(false);

  return (
    <div className={classNames(st.wrapper)}
      onClick={() => setShow(!show)}
    >
      <div className={classNames(st.text_bold, st.text_medium, st.d_flex, st.justify_between, st.align_center)}>
        {question}
        <span className={classNames(s.arrow_up, (!show && s.arrow_down))} />
      </div>
      {show && <p className={classNames(st.text_small, s.padding, st.pt_3)}>{answer}</p>}
    </div>
  )
}