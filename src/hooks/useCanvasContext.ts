import { createContext, useContext } from "react";

export type CanvasContent = {
    image: number[]
    counter: number
    setImage:(c: number[]) => void
    incCounter: () => void
  }

export const CanvasContext = createContext<CanvasContent>({
    image: [], // set a default value
    counter: 0,
    incCounter: () => {},
    setImage: () => {},
})

export const useCanvasContext = () => useContext(CanvasContext);