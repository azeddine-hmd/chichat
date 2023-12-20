export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function delayPromise<T>(ms: number, promise: Promise<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      promise
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    }, ms);
  });
}
