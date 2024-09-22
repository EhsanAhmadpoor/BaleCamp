import { expect, describe, test } from "@jest/globals"
import { groupBy } from "./10"

describe("groupBy", () => {
  test("should group items by the result of the callback", () => {
    const data1 = [
      { name: 'Alice', age: 21 },
      { name: 'Bob', age: 21 },
      { name: 'Charlie', age: 23 },
    ];
    const data2 = [
      { name: 'Ehsan', role: 'front-end dev' },
      { name: 'Matin', role: 'front-end dev' },
      { name: 'Mohammad', role: 'front-end dev' },
      { name: 'Someone', role: 'back-end dev' },
      { name: 'Someone', role: 'back-end dev' },
      { name: 'Someone', role: 'back-end dev' },
    ]
    const groupedByAge = groupBy(data1, item => item.age.toString());
    expect(groupedByAge).toEqual({
      '21': [
        { name: 'Alice', age: 21 },
        { name: 'Bob', age: 21 },
      ],
      '23': [
        { name: 'Charlie', age: 23 },
      ],
    });
    const groupByRole = groupBy(data2, item => item.role);
    expect(groupByRole).toEqual({
      'front-end dev': [
        { name: 'Ehsan', role: 'front-end dev' },
        { name: 'Matin', role: 'front-end dev' },
        { name: 'Mohammad', role: 'front-end dev' },
      ],
      'back-end dev': [
        { name: 'Someone', role: 'back-end dev' },
        { name: 'Someone', role: 'back-end dev' },
        { name: 'Someone', role: 'back-end dev' },
      ],
    });
  });
});

