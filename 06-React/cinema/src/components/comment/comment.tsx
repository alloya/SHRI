import { IReview } from "@/models/rewiew.model";
import s from "./comment.module.css";
import Image from 'next/image';

export const Comment = ({ comment }: { comment: IReview }) => {
  const { name, text, rating } = comment;
  return (
    <div className={s.wrapper}>
      <div className={s.avatar}>
        <div className={s.no_image}></div>
      </div>
      <div className={s.text}>
        <div className={s.name}>
          <p className={s.key}>{name}</p>
          <div>
            <span className={s.value + ' ' + s.pr_2}>Оценка:</span>
            <span className={s.key}>{rating}</span>
          </div>
        </div>
        <p className={s.value}>{text}</p>
      </div>
    </div>
  )
}