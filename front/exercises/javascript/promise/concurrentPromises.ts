const requests = [
  () => fetch("https://jsonplaceholder.typicode.com/posts/1"),
  () => fetch("https://jsonplaceholder.typicode.com/posts/2"),
  () => fetch("https://jsonplaceholder.typicode.com/posts/3"),
  () => fetch("https://jsonplaceholder.typicode.com/posts/4"),
  () => fetch("https://jsonplaceholder.typicode.com/posts/5"),
  () => fetch("https://jsonplaceholder.typicode.com/posts/6"),
  () => fetch("https://jsonplaceholder.typicode.com/posts/7"),
  () => fetch("https://jsonplaceholder.typicode.com/posts/8"),
  () => fetch("https://jsonplaceholder.typicode.com/posts/9"),
];

const maxConcurrentCalls = 3;

/**
 * @param {() => Promise<any>} fetcher
 * @param {number} maximumRetryCount
 * @return {Promise<any>}
 */
function runConcurrentPromises<T>(
  fetchers: (() => Promise<T>)[],
  maxConcurrentCalls: number
) : Promise<T[]>{
  // your code here
  return new Promise((resolve, reject) => {
    const results: T[] = [];
    let currentIndex = 0;
    let runningCount = 0;
    let completedCount = 0;

    function runNext() {
      while (runningCount < maxConcurrentCalls && currentIndex < fetchers.length) {
        const fetcher = fetchers[currentIndex];
        const index = currentIndex;
        currentIndex++;
        runningCount++;

        fetcher()
          .then((result) => {
            results[index] = result;
          })
          .catch((error) => {
            results[index] = error; // or handle error as needed
          })
          .then(() => {
            runningCount--;
            completedCount++;
            if (completedCount === fetchers.length) {
              resolve(results);
            } else {
              runNext();
            }
          });
      }
    }

    runNext();
  });
}

runConcurrentPromises(requests, maxConcurrentCalls)
  .then((results) => {
    console.log("All promises completed with results:", results);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
