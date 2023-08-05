const { Worker, isMainThread, parentPort } = require('node:worker_threads');

function chunkify(array, n) {
  let chunks = [];
  for (let i = n; i > 0; i--)
    chunks.push(array.splice(0, Math.ceil(array.length / i)));
  return chunks;

}

function run(jobs, concurrentWorkers) {
  const chunks = chunkify(jobs, concurrentWorkers);
  const start = performance.now();
  let completedWorkers = 0;
  chunks.forEach((data, i) => {
    const worker = new Worker(__filename);
    worker.postMessage(data);
    worker.on("message", () => {
      console.log(`worker ${i} completed.`);
      completedWorkers++;
      if (completedWorkers === concurrentWorkers) {
        const duration = (performance.now() - start) / 1000;
        console.log(`${concurrentWorkers} took ${duration.toFixed(2)}seconds`);
        process.exit();
      }
    })
  })
}

const jobs = Array.from({ length: 1e2 }, () => 1e7);

if (isMainThread) {

  run(jobs, 4);

} else {

  parentPort.on('message', (jobs) => {
    for (const job of jobs) {
      let count = 0;
      while (count < job)
        count++;
    }
    parentPort.postMessage('done');
  });
}