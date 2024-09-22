---
sidebar_position: 3
---

# Javascript

یادگیری جاوااسکریپت به شما امکان می‌دهد تا وب‌سایت‌های تعاملی و پویا ایجاد کنید. این زبان برنامه‌نویسی، یکی از مهم‌ترین ابزارها برای توسعه‌دهندگان وب است که قابلیت‌های گسترده‌ای برای تعامل با کاربران و مدیریت داده‌ها ارائه می‌دهد.

<div dir="ltr">

- Objects
  - References
  - `this`
  - Methods
- Classes
- Function
  - Regular
  - Arrow
  - Closures
- Type coercion
- Scopes (Lexical, Function)
- Hoisting
- Collections (Array, Map, Set)
- Asynchronous
  - Promises
  - `async`, `await`
- Event loop
  - Queues (Macro, Micro)
  - `requestAnimationFrame`
- Garbage collection
- Regex

</div>

## منابع

- https://javascript.info/
- https://regexone.com/

## تمرین‌ها

1. تمرین‌های مربوط به مبحث کلاس‌ها و شی‌گرایی در جاوااسکریپت را با توجه به دستورالعمل‌های داده شده در فایل [README](https://gitlab.com/bale.ai/internship/bootcamp/-/tree/main/front/exercises/javascript/OOP)
   تکمیل کنید.

2. تمرین‌های مربوط به مبحث closure در جاوااسکریپت را با توجه به دستورالعمل‌های داده شده در فایل [README](https://gitlab.com/bale.ai/internship/bootcamp/-/tree/main/front/exercises/javascript/closure)
   تکمیل کنید.

3. دو Promise پیاده سازی کنید که یکی از آن‌ها پس از ۳ ثانیه با مقدار ۱۰ fullfill می‌شود و یکی دیگر پس از ۵ ثانیه با مقدار ۲۰ fullfill می‌شود. حال حاصل جمع این دو مقدار یعنی عدد ۳۰ را بعد از fullfill شدن هر دوی آن‌ها لاگ کنید. همچنین در مدتی که promise ها در استیت pending هستند Program in progress… را لاگ کنید.
   دقت کنید که تنها مجاز به استفاده از Promise هستید و نمی‌توانید از async/await استفاده کنید.
   راهنما: تاخیر های ذکر شده را با استفاده از ترکیب promise و setTimeout شبیه‌سازی کنید.

4. تابع [fetchDataWithRetry](https://gitlab.com/bale.ai/internship/bootcamp/-/blob/main/front/exercises/javascript/promise/retryPromise.ts) را با استفاده از promiseها طوری پیاده‌سازی کنید که بعد از فیل شدن ریکوئست fetchData بعد از یک timeout یک ثانیه ای شروع به ریترای به صورت exponential تا ۳ بار کند.

5. یک Promise پیاده‌سازی کنید که عملیات فچ کردن داده را با setTimeout سه ثانیه‌ای شبیه سازی می‌کند. یک توکن لغو برای آن تعریف کنید که می توان از آن برای کنسل کردن یک promise پیش از resolve شدن آن استفاده کرد. اگر عملیات کنسل شود promise باید با مسیج "cancelled" ریجکت شود. [لینک](https://gitlab.com/bale.ai/internship/bootcamp/-/blob/main/front/exercises/javascript/promise/cancelPromise.ts)

6. به دلیل محدودیت‌های شبکه یا سخت‌افزار یا عدم صفحه‌بندی،گاهی نیاز داریم تعداد درخواست‌های همزمان را محدود کنیم. در شبه کد زیر تابع [runConcurrentPromises](https://gitlab.com/bale.ai/internship/bootcamp/-/blob/main/front/exercises/javascript/promise/concurrentPromises.ts) را طوری پیاده سازی کنید که روی تعداد promise های همزمان محدودیت ایجاد کند.
   راهنما: از طریق تب network مرورگر می‌توان ریکويست‌های همزمان را بررسی کرد.

7. تفاوت local storage و session storage را بیان کنید.
8. یک wrapper برای localStorage پیاده‌سازی کنید که بتوان در هنگام ست کردن یک آیتم درون استوریج یک تاریخ انقضا برای آن مشخص کرد و داده‌های پس از گذشت این زمان منقضی شوند.

9. خروجی قطعه کدهای زیر را تحلیل کنید و به صورت صوت یا متن ارسال کنید.

```js title="example1.js"
console.log("start");
setTimeout(() => {
  console.log("setTimeout");
});
Promise.resolve().then(() => {
  console.log("resolve");
});
console.log("end");
```

```js title="example2.js"
const promise = new Promise((resolve, reject) => {
  console.log(1);
  setTimeout(() => {
    console.log("timerStart");
    resolve("success");
    console.log("timerEnd");
  }, 0);
  console.log(2);
});
promise.then((res) => {
  console.log(res);
});
requestAnimationFrame(() => {
  console.log(3);
});
console.log(4);
```

10. یک تابع بنویسید که دو ورودی دریافت می‌کند ورودی اول آرایه‌ای‌ است که می‌خوایم آن را گروه‌بندی کنیم و ورودی دوم یک کالبک است که نشان‌دهنده‌ی محور گروه‌بندی ست و در خروجی تابع باید آرایه را براساس شرط ورودی، گروه بندی کند.
    این تابع را با استفاده از تابع `reduce` آرایه‌ها پیاده‌سازی کنید.

11. خروجی قطعه کدهای زیر را تحلیل کنید و به صورت صوت یا متن ارسال کنید.

```js title="code11-1.js"
var x = 10;
function example() {
  console.log(x);
  var x = 20;
  console.log(x);
}
example();
console.log(x);
```

```js title="code11-2.js"
const person1 = {
  name: "Ali",
  age: 20,
  birthday: () => {
    console.log("Happy birthday", this.age);
    this.age++;
  },
};

const person2 = {
  name: "Reza",
  age: 20,
  birthday: function () {
    console.log("Happy birthday", this.age);
    this.age++;
  },
};

person1.birthday();
console.log(person1.age);
person2.birthday();
console.log(person2.age);
```
