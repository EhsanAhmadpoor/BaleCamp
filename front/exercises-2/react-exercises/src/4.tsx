import { useCustomHook4 } from "./hooks";

export default function Component() {
  const { width = 0, height = 0 } = useCustomHook4();

  return (
    <div>
      The current window dimensions are:{" "}
      <code>{JSON.stringify({ width, height })}</code>
    </div>
  );
}