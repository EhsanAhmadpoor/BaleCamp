const promise1 = new Promise<number>((resolve) => {
  setTimeout(() => {
    resolve(10);
  }, 3000);
});

const promise2 = new Promise<number>((resolve) => {
  setTimeout(() => {
    resolve(20);
  }, 5000);
});

// این قسمت لاگ "Program in progress..." را چاپ می‌کند
console.log("Program in progress...");

// استفاده از Promise.all برای صبر کردن تا تکمیل هر دو Promise
Promise.all([promise1, promise2])
  .then((values) => {
    const sum = values.reduce((acc, curr) => acc + curr, 0);
    console.log("Sum:", sum);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
