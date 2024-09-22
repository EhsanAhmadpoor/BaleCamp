const maxRetryCount = 3;

/**
 * @param {() => Promise<any>} fetcher
 * @param {number} maximumRetryCount
 * @return {Promise<any>}
 */
function fetchDataWithRetry<T>(fetcher: () => Promise<T>, maximumRetryCount: number) {
  // your code here
  function attemptFetch(retryCount: number): Promise<T> {
    return fetcher().catch((error) => {
      if (retryCount < maximumRetryCount) {
        const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff: 1s, 2s, 4s
        return new Promise((resolve) =>
          setTimeout(resolve, delay)
        ).then(() => attemptFetch(retryCount + 1));
      } else {
        return Promise.reject(error);
      }
    });
  }

  return attemptFetch(0);
}

function fetchData() {
  return Promise.reject("Failed to fetch data");
}

fetchDataWithRetry(fetchData, maxRetryCount)
  .then((data) => {
    console.log("Data fetched successfully:", data);
  })
  .catch((error) => {
    console.error("Max retries reached. Last error:", error);
  });
