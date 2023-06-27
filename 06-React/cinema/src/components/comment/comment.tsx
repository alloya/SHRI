import { IReview } from "@/models/rewiew.model";
import s from "./comment.module.css";
import st from "../../utils/styles.module.css";
import classNames from "classnames";

export const Comment = ({ comment }: { comment: IReview }) => {
  const { name, text, rating } = comment;
  return (
    <div className={classNames(st.wrapper, st.d_flex)}>
      <div className={s.avatar}>
        <div className={s.no_image}></div>
      </div>
      <div className={s.text}>
        <div className={classNames(st.d_flex, st.justify_between, st.align_center, st.pb_3)}>
          <p className={st.text_bold}>{name}</p>
          <div>
            <span className={st.text_normal + ' ' + st.pr_2}>Оценка:</span>
            <span className={st.text_bold}>{rating}</span>
          </div>
        </div>
        <p className={st.text_normal}>{text}</p>
      </div>
    </div>
  )
}