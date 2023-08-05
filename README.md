# Node.js Parallel Processing Test using worker threads on an ArmV7 QuadCore Processor.

## RUN

`node single-thread.js` 

task yieled in 4 seconds.


`node multi-thread.js`

task yielded in 1.7 seconds.

Note : We do not get exactly 4x the performance, this is due to the difference in cores. While the main thread is always (assumably) a performance core, not all of them are the same. Some of the cores are for efficiency that yield lesser performant results.