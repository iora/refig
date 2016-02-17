/** Promisify a node-style asynchronous callback function.
  */
export default function promisify(...fns) {
  let promisified = [];
  for (let fn of fns) {
    promisified.push(function(...args) {
      return new Promise((resolve, reject) => {
        fn(...args, function(err, ...results) {
          if (err) return reject(err);
          resolve(results);
        });
      });
    });
  }

  return ~promisified.length ? promisified : promisified[0];
}
