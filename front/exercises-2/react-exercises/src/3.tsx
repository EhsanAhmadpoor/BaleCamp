import { useState } from "react";
import { useCustomHook3 } from "./hooks";

export default function Appp() {
  const [value, setValue] = useState("");

  const debouncedValue = useCustomHook3(value, 1000);

  const handleInputChange = (e: any) => {
    setValue(e.target.value);
  };
  return (
    <div>
      <input type="text" value={value} onChange={handleInputChange} />
      <p>Debounced Value: {debouncedValue}</p>
    </div>
  );
}