'use client'

import { ActionButton } from "../action-button/action-button";
import React from 'react';
import { decrement, increment } from "@/redux/features/cart";
import s from './ticket-counter.module.css';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { selectProductAmount } from "@/redux/features/cart/selector";

export const TicketCounter = ({ id }: { id: string }) => {

  // The `state` arg is correctly typed as `RootState` already
  const count = useAppSelector(state => selectProductAmount(state, id));
  const dispatch = useAppDispatch();

  const plus = () => {
    dispatch(increment(id))
  }

  const minus = () => {
    dispatch(decrement(id))
  }

  return <div className={s.counters}>
    <button className={s.button_minus + ' ' + s.button + ' ' + (count == 0 && s.disabled)} onClick={minus} />
    <span className={s.counter}>{count}</span>
    <button className={s.button_plus + ' ' + s.button + ' ' + (count >= 30 && s.disabled)} onClick={plus} />
  </div>
}