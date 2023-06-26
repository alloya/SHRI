'use client'

import { Dropdown } from "../drop-down/drop-down";
import { Input } from "../input/input";
import s from "./side-bar.module.css";
import { useEffect, useMemo, useState } from "react";
import { genres } from "@/utils/enum";
import { useAppDispatch, useAppSelector, useDebounce } from "@/hooks/hooks";
import { setCinemasStore } from "@/redux/features/cinemas";
import { useGetCinemasQuery } from "@/redux/services/movieApi";
import { getCinemaFilter, getGenresFilter } from "@/utils/utils";
import { useRouter } from "next/navigation";

export const SideBar = ({search, genre, cinema}: {search: string | null, genre: string | null, cinema: string | null}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const cinemas = useAppSelector(store => store.cinemas);
  const { data, isLoading, error } = useGetCinemasQuery(undefined, { skip: Boolean(cinemas.length) });

  const filterGenres = getGenresFilter(genres);
  const filterCinemas = useMemo(() => getCinemaFilter(cinemas), [cinemas]);
  
  const [urlObj, setUrlObj] = useState<{[key: string]: string|null}>({genre, search, cinema});

  useEffect(() => {
    if (data) {
      dispatch(setCinemasStore(data))
    }
  }, [data, dispatch])

  const filterQuery = useDebounce(urlObj, 300);

  useEffect(() => {
    if (filterQuery) {
      router.push(`?${Object.keys(filterQuery).map(el => filterQuery[el]&&`${el}=${filterQuery[el]}`).filter(Boolean).join('&')}`)
    }
  }, [filterQuery, router])

  return <div className={s.wrapper}>
    <Input value={search} callback={(value) => setUrlObj({...urlObj, search: value})}/>
    <Dropdown value={genre} text="Жанр" placeholder="Выберите жанр"
      list={filterGenres} callback={(value) => setUrlObj({...urlObj, genre: value})}
    />
    <Dropdown value={cinema} text="Кинотеатр" placeholder="Выберите кинотеатр"
      list={filterCinemas} callback={(value) => setUrlObj({...urlObj, cinema: value})}
    />
  </div>
}