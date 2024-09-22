import React, { useImperativeHandle, forwardRef, Ref, useState } from "react";

export interface CustomInputPropsRef {
  clearInput: () => void
}

function CustomInput(props: any, ref: Ref<CustomInputPropsRef>) {

  const [input, setInput] = useState<string>("")

  const clearInput = () => {
    setInput("")
  }

  useImperativeHandle(ref, () => ({
    clearInput
  }))

  return (
    // <input type="text" placeholder="Type something..." />
    <>
      <input onChange={(e) => setInput(e.target.value)} type="text" placeholder="Type something..." value={input} />
    </>
  )
}

export default forwardRef(CustomInput)