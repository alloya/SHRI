'use client'

import Link from "next/link"
import React from "react"

export default function Search({params}: {params: {slug: string[]}}) {

  return (
    <>
      {[1, 2, 3].map((el, i) => (
        <Link href={`movie/${el}`} key={i}>{`Film ${el}`}</Link>
      ))}
    </>
  )
}