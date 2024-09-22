import { height, width } from "@mui/system";
import { setEngine } from "crypto";
import React, { useEffect, useReducer, useRef, useState } from "react";


export function useCustomHook3(value: any, delay: any) {

  const [latestValue, setLatestValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setLatestValue(value)
    }, delay)

    return () => clearTimeout(handler)
  }, [value, delay])

  return latestValue;
}

export function useCustomHook4() {

  const [height, setHeight] = useState(window.innerHeight)
  const [width, setWidth] = useState(window.innerWidth)

  window.addEventListener('resize', () => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  })

  return { width, height }
}

export function useCustomHook5({ threshold = 1, root = null }) {
  const [entry, setEntry] = useState<any>(null)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setEntry(entry)
      },
      {
        root: root,
        threshold: threshold
      }
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [root, threshold])

  const isIntersecting = entry ? entry.isIntersecting : false
  return { isIntersecting, ref }
}