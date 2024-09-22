// TODO: Simulate user cancellation after 1.5 seconds
// TODO: fetchPromise should resolved after 3 seconds
let cancelToken = false;

const fetchPromise = new Promise((resolve, reject) => {
  const timeoutId = setTimeout(() => {
    if (cancelToken) {
      reject(new Error('cancelled'));
    } else {
      resolve('data fetched');
    }
  }, 3000);

  // چک کردن برای لغو پیش از موعد
  if (cancelToken) {
    clearTimeout(timeoutId);
    reject(new Error('cancelled'));
  }
});

fetchPromise
  .then((data) => console.log(data))
  .catch((error) => console.error(error.message));

// شبیه سازی لغو عملیات بعد از 1.5 ثانیه
setTimeout(() => {
  cancelToken = true;
}, 1500);
