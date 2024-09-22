---
sidebar_position: 2
---

# Typescript

یادگیری TypeScript به شما امکان می‌دهد کدهای جاوااسکریپت قابل اعتمادتر و مقیاس‌پذیرتری بنویسید. این زبان، با افزودن تایپ‌های استاتیک به جاوااسکریپت، توسعه‌دهندگان را در جلوگیری از خطاها و بهبود کیفیت کد یاری می‌کند. با استفاده از TypeScript می‌توان پروژه‌های بزرگ و پیچیده را بهتر مدیریت کرد.

<div dir="ltr">

- Basics

  Duck typing, Inference, Union, Intersection, `keyof`, `typeof`

- Narrowing
- Enum
- Generics (Constraints)
- Type Assertions
- Functions (overload, rest, interface)
- Index Signatures
- Indexed Access Types
- Mapped Types
- Conditional Types
- Utilities
- Declaration Merging

</div>

## منابع

- [Typescript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

## تمرین‌ها
تمرین‌های زیر را در playground ts پیاده‌سازی کرده و لینک آن‌ها را ارسال کنید.

1. تمرین‌های این [لینک](https://www.typescriptlang.org/play/?#code/PTAEEYCgVBhB7AdgZwJYBMCmAnUAXAC1WXwE8AHTSPCzUAOXjzoF5QBvSUfVPAG0wAuUMjzZUiAOYBuLvkwAPPMNHipsgL6RoYACKYAZhLoBDMpVAB3IgGMCoALYmA1phIm+fUOWzxK2PFQ3UHgDUAAVeHR4EUw8fBi-QKQPHXM6AHlyZMQPRmZQNm00gCY0hBQMHHwiEhpKalpQAAUcZCRCjjkjbFF6EwchETEJGTk+Ez6BodVR2W4AI1QAggBNTBNsYUQAVwcFnHnQSUxELC3QACInAUvQAB8rg0wbzEvNbRh9I0RTUF-LOkrLZ7MhMAIbHgSD0poNQAAyUATWF0Ay+BwtNodepUGA4zG9JD9OFFT5gADM5SQaHONWI6UaFgAsm5kCYTp1ONxxOhtnsDtgjugTMw+ftDnIwWccABJXn-fkS7g44SXZhKO6PS7kAhMeCXOTqvAAfhUI3Uch22D4puGajG3I2kNQ1LN9oA2gBdI52EVysUCj5pb7GUBmcKKPAs5Bsjn46yoOzeRPOdyeby+fyBYKhUDR2N0RQ2TDZIEmM6gK18NL4iNKfPs1igYowAAsVMqtMI9JxjLoAGVMDZsHFOXIMG65nJyJNkJZ4Nh5bMLVpg4ZQ2Z4yDHC5goPh6OdohfVIFgIwxXUGFLHQxKQErF4rwAOQkHx+HCBOoEXyWEg4XxsBrJojxPSQz0wfcR3iFhPgAKjSRQBnIARIBsal4jBA88HAYRQIIctwIEKDRzYLlQAnK5wEuAAaadZ3nRdVXAEpyVbABWAA2A1Vyw6DwAAOhnGNGPQTpLi4gB2AAOABOO4YF4KxUHTQhf1AACF0gODgBbMB2I7Glqm7OpaD7UAADFsB2XhkGJJtLhMcgULeB4rgXQjXK1BZy18g18SsmyYK6ZVJlFO0p24dCj2UBVxUFSBVy+ddfgvEIFgAKyHeIt3gMEMw-AJ71cUh3BHSzrNs+yLzE6w8rod8s3vAA3DwdmCTY6EC3hgIsbq8AAJU6Zs0k4wyqlwEyGXxfs8BFHYSDYV8dhsYsY2fNzn007ANseZ9AkGeAdjwXbQGfPh4BMdBRlO58MAEZ9ZDScIMl0DJhBDVLNyaABRbBANm+bvxFDSFBsPgdiwEhltW1kNvLMS7vQB7QDReAMUBvAFt6ug-oBuascWkagA) را با utility type های مناسب تکمیل کنید.

2. تایپ <span dir="ltr">`MyPartial<T>`</span> را طوری تعریف کنید که همه‌ی زیرمجموعه‌های تایپ T را شامل شود. [لینک](https://www.typescriptlang.org/play/?#code/C4TwDgpgBAsiAKBDATsAlogNgHgCoD4oBeKAIgAkJlo0BnKEAewFdko0BbMTCDiAO2CJ0jfgEJSAKEmhIUeFVqjiUAN6SoUfoj4AuKLWDI0-AOYaoiUxH39mHAEZULHLDagPGjHon6SAvtIA9EFQuBCGDCxsnNy8AkIi-B4gUMAAFhHQEAAeOnG0kiGWmJhQAG4oGA489E6YjADuBuksmAAmHtCVmGidABSNaBkswJb8qVTIjMgAlNIAxqKRkMhK-ADy-O5wSKgYOAprooQkqoGSS-wriqK4jYz6uyjoWNhH66dqFtp6UADkAEFelAciAAF7-AKLZZjVbrXDpag7BAvA7vW78L7qTRWdwARgAzNDLrCoPDRAAxaJPVH7N4fE4qHGWaz6fEANgANC43PojMwICSrjdjvxKWhyii9q9DpjsT8dO5-jAUCAdKCIf8ebi2VAAEyEnVQVw8fQAMywtCF-iAA)

3. تایپ <span dir="ltr">`ReadonlyType<T>`</span> را طوری تعریف کنید که همه‌ی پراپرتی‌های تایپ T را readonly کند. [لینک](https://www.typescriptlang.org/play/?#code/PTAECUFMEMBMHsB2AbAngFVQB0gHnQHygBOkALgK7GIDOo0oZ2kjAFtGaDeXdMsqCzF4OYmQCWkOvABmodI3gkYCFKgBQTHBBVI0mHPiIBeUACIAEpFKhxdVPCq2AtlmSRnkRGQ7ikAQjN1YJB5KU4HJ3FXd09vXyRQACNUNikWSAAPaBipTWZQAGF4eABrSVBTAG91UHoALi4yYnFEAHN1AF9ggGMkGk5oeuKyiurahtAAcgAhADEAUQA6WEgANymAGi71aCWGUymk8TaZYW8vWBX1qfVQgHkAaV7+ziT6qDg9DGZcEfLICZQDU6kNpvNlqsNjskvtKtNjqdzmRLtdoaEFsRhMQgA)

4. تایپ <span dir="ltr">`Equal<T,P>`</span> را طوری تعریف کنید که چک کند آیا دو تایپ T و P یکسان هستند یا خیر. [لینک](https://www.typescriptlang.org/play/?#code/PTAEEkFsAcBsFNLwHYBdQFECOBXAhrADwAqANKAAoB8oqA9qAMYAW8jA1qAJYBmtA7g1QBPaPADOoPACd43ACYpUXRgQB0AKBFjMuAiVLVQAXlAAiABLxZ3ScLo5p3GAiRo8yusgCEZjRpBQYgl0e0dnOEQlDy4vUAAjYVpWcTl4AA88Fwl-BHQ8UAAuXXwiPGRhcnLhGkDtOVNUaRx4DTymIpL9ZHgAN2tyHv7pWrB6k1pm1vb5TuxSwgByACEAMQxF8hX1xdHaUQbJlrb4dDli+f1tjfJxJq5kAHM98dMeAlST9D4LvSIARlAAB9QAAmcig4Ggf4vA4TJrHdqPOZ-QgAbwKxWQOEg8WsAF9yBisTi8dJ8bCdI0pl9QMwUQs0VJindpA9HuR4gB+YrxOh0BDlUCEpl4Fn3J7kRg8hL8wXIYWUw7vWCfdqcX6M5mgVnszkyvkC+BCkXa3WShK8uXGhUU0B1OFvD7wIA)

5. تایپ ‍‍<span dir="ltr">`MyRequired<T>`</span> را طوری تعریف کنید که تمام پراپرتی‌های تایپ T را به صورت required کند. [لینک](https://www.typescriptlang.org/play/?#code/PTAEEsFsAcBsFNLwHYBdQFkCeAleBHAV3ACd4ATAHgBUA+UAdwAtwBjJ0AZ3lU9AENYsUNBIB7aPBKpw8PmIBmoaqFRjQZIqQoA6AFCoskzLgLEyVOqAC8oAEQAJKfAh8sYwiQgwESNPxkxZABCOz09EAEhEXFJaVk+fjJQCUDkQQMjFwAFKU4gm1AAbz1QUHSkAH4ALi5UEnBkAHNSgSb4GvLCSAAjKVbIQQ7anrExBH5kPQBfcL1WIM50flrsPC0LSlySfOR6WyLZyIBREnEScIXkJdAe1dMNii28oP3i1or4WoByACEAMWOOnI8AAbt8ZhEwKdzpdFuhWPd1uYnttdm8SmV+O1agBGABMAGZISczmILvN4aByEizNoqGjXoVMW0vqACYSADQDIa1eqEeAk6FkilXG5stZ0zaMvbMj78JA-AFAkHg7lYnHsonq0CDBB8kgCoWgUGCcDkIA)

6. **تمرین بیشتر:** تایپ <span dir="ltr">`Filter<T,A>`</span> را طوری تعریف کنید که ‌همه‌ی تایپ‌هایی از T را که قابل اساین شدن به A هستند را به عنوان خروجی برگرداند. [لینک](https://www.typescriptlang.org/play/?#code/PTAEEsFsAcBsFNLwHYBdQDFy1fATgDwAqANAIIB8oA7gBbgDGtoAZtrngM6gCGssoVLXiCAntHjcWeAPaRQRQbR7oeeET06dwAc2Q8ARgkEzQZXsgAmodagCueZNx6hk8aoLtwRqcfAB0AFC+Epjs+MTkVAC8oABEABL4IuDcojIOEDAISGgq4DLIAIRxgYEgCpLo6ZlQ3rmo+YWgBqJKkiLwAB482ZLBfmagsVg4EQDaAIwkAOREVTMkoABMS6h4dvBLMxiyaDMAukvIdpAG+FQVU0vLBwOhAELDYWOE13MLN2sbW6A7e6hDktOOtwMgdJcwOMPiDFn9doVAXcQiIAMLPUYcAjveawr4WUTbBH7I6gEF4MEQ0BXGGApY8ZCE+EAw5AA)
