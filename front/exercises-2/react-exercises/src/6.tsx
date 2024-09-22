import React, { useRef } from "react";
import CustomInput from "./customINput";
import { CustomInputPropsRef } from "./customINput";


export default function Form() {

  const ref = useRef<CustomInputPropsRef>(null)

  return (
    <>
      <CustomInput ref={ref} />
      <button onClick={() => ref.current?.clearInput()}>clear Input</button>
    </>
  )
}