const numArray = Array.from(
  {length:100},
  () => 1e7
);

const start = performance.now();

for (const num of numArray) {
  let count = 0;
  
  while (count < num)
    count++;
}

const stop = performance.now();

console.log(((stop-start)/1000).toFixed(1)+" seconds");
