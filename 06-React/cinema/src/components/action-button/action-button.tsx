import s from './action-button.module.css';

export const ActionButton = (props: {callback: () => void, text: string}) => {
  const {callback, text} = props;
  return (
    <button className={s.button} onClick={callback}>{text}</button>
  )
}