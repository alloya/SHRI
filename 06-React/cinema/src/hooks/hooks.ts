import { AppDispatch, RootState } from '@/redux/store';
import { useState, useEffect } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useDebounce = (value:any, milliSeconds: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
 
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, milliSeconds);
 
    return () => {
      clearTimeout(handler);
    };
  }, [value, milliSeconds]);
 
  return debouncedValue;
 };