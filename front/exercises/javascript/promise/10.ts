type Grouped<T> = {
  [key: string]: T[];
};

export function groupBy<T>(array: T[], callback: (item: T) => string): Grouped<T> {
  return array.reduce((accumulator: Grouped<T>, currentItem: T) => {
    const key = callback(currentItem);
    if (!accumulator[key]) {
      accumulator[key] = [];
    }
    accumulator[key].push(currentItem);
    return accumulator;
  }, {});
}

// نمونه استفاده:
const data = [
  { name: 'Alice', age: 21 },
  { name: 'Bob', age: 21 },
  { name: 'Charlie', age: 23 },
];

const groupedByAge = groupBy(data, item => item.age.toString());
console.log(groupedByAge);
