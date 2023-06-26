'use client'

import { Dropdown } from "../drop-down/drop-down";
import { Input } from "../input/input";
import s from "./side-bar.module.css";
import { useEffect, useMemo, useState } from "react";
import { genres } from "@/utils/enum";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setCinemasStore } from "@/redux/features/cinemas";
import { useGetCinemasQuery } from "@/redux/services/movieApi";
import { getCinemaFilter, getGenresFilter } from "@/utils/utils";

export const SideBar = ({callback}: {callback: () => void}) => {
  const dispatch = useAppDispatch();
  const cinemas = useAppSelector(store => store.cinemas);
  const { data, isLoading, error } = useGetCinemasQuery(undefined, { skip: Boolean(cinemas.length) });

  const filterGenres = getGenresFilter(genres);
  const filterCinemas = useMemo(() => getCinemaFilter(cinemas), [cinemas]);
  
  useEffect(() => {
    if (data) {
      dispatch(setCinemasStore(data))
    }
  }, [data, dispatch])

  const [urlObj, setUrlObj] = useState({genre: '', input: '', cinema: ''});

  useEffect(() => {
    console.log(urlObj)
  }, [urlObj])

  return <div className={s.wrapper}>
    <Input callback={(value) => setUrlObj({...urlObj, input: value})}/>
    <Dropdown text="Жанр" placeholder="Выберите жанр"
      list={filterGenres} callback={(value) => setUrlObj({...urlObj, genre: value})}
    />
    <Dropdown text="Кинотеатр" placeholder="Выберите кинотеатр"
      list={filterCinemas} callback={(value) => setUrlObj({...urlObj, cinema: value})}
    />
  </div>
}