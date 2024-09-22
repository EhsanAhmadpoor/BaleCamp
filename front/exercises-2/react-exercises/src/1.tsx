import { useState } from "react"
import React from "react"

export const ListWrapper = () => {
  const [items, setItems] = useState([
    { value: '' },
    { value: '' },
    { value: '' }
  ])
  return (
    <div>
      {/* {items.map((item, index) => (
        <Item
          id={index}
          value={item.value}
          onChange={(id, value) =>
            setState(state.map((item, index) => {
              return index !== id ? item : { value: value }
          })}
          />
      )} */}
      {items.map((item, index) => (
        <Item
          id={index}
          value={item.value}
          onChange={(id: number, value: string) =>
            setItems(items.map((item: any, index: number) => {
              return index !== id ? item : { value: value }
            }))}
        />
      ))}
    </div>
    // اول از همه کد پرانتز بسته کم داشت که گذاشتم
    // دوم اینکه برای استفاده از
    // useState
    // باید اسمی که اینجا انتخاب شده یعنی
    // items و setItems
    // استفاده بشه نه
    // state و setState
    // و همینطور فرض کردم کامپوننت
    // Item
    // ایمپلیمنت شده است
  )
}

interface ItemProps {
  id: number,
  value: string,
  onChange: any
}
function Item({ id, value, onChange }: ItemProps) {
  return (
    <>
      <p>item id: {id}</p>
      <p>item value: {value}</p>
      <input onChange={onChange(id ,value)} type="text"/>
    </>
  )
}