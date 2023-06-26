'use client'

import React, { useState } from 'react';
import { decrement, increment, remove } from "@/redux/features/cart";
import s from './ticket-counter.module.css';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { selectProductAmount } from "@/redux/features/cart/selector";
import { createPortal } from 'react-dom';
import { Popup } from '../popup/popup';

export const TicketCounter = ({ id, cart = false }: { id: string, cart: boolean }) => {
  const count = useAppSelector(state => selectProductAmount(state, id));
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);

  const plus = () => dispatch(increment(id));

  const minus = () => {
    if (count === 1) {
      setShowModal(true);
    }
    else dispatch(decrement(id));
  }

  const clear = () => {
    dispatch(remove(id));
    setShowModal(false);
  };

  return (
    <div className={s.counters}>
      <button type='button'
        className={s.button_minus + ' ' + s.button + ' ' + (count == 0 && s.disabled)}
        onClick={minus}
      />
      <span className={s.counter}>{count}</span>
      <button type='button'
        className={s.button_plus + ' ' + s.button + ' ' + (count >= 30 && s.disabled)}
        onClick={plus}
      />
      {cart &&
        <button type='button'
          className={s.delete}
          onClick={() => setShowModal(true)}></button>
      }
      {showModal && createPortal(
        <Popup close={() => setShowModal(false)}>
          <div className={s.popup}>
            <h2 className={s.title}>Удаление билета</h2>
            <p className={s.description}>Вы уверены, что хотите удалить билет?</p>
            <div className={s.action_buttons}>
              <button type='button'
                className={s.action_button_yes + ' ' + s.action_button}
                onClick={() => clear()}
              >Да</button>
              <button type='button'
                className={s.action_button_no + ' ' + s.action_button}
                onClick={() => setShowModal(false)}
              >Нет</button>
            </div>
          </div>
        </Popup>, document.body
      )}
    </div>
  )
}