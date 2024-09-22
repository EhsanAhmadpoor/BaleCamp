import * as React from 'react'
import ReactDOM from 'react-dom'

interface LoggerProps {
  label: string
}

function Logger(props: LoggerProps) {
  console.log(`${props.label} rendered`)
  return null // what is returned here is irrelevant...
}

const loggerElement = <Logger label="counter" />

export function Counter() {
  const [count, setCount] = React.useState(0)
  const increment = () => setCount((c) => c + 1)
  return (
    <div>
      <button onClick={increment}>The count is {count}</button>
      {loggerElement}
    </div>
  )
}

ReactDOM.render(<Counter />, document.getElementById('root'))