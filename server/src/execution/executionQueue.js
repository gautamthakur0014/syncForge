"use strict";

class ExecutionQueue {
  constructor(maxConcurrent = 3) {
    this.maxConcurrent = maxConcurrent;
    this.running = 0;
    this.queue = [];
  }

  add(job) {
    return new Promise((resolve, reject) => {
      this.queue.push({
        job,
        resolve,
        reject,
      });

      this.process();
    });
  }

  process() {
    while (this.running < this.maxConcurrent && this.queue.length > 0) {
      const item = this.queue.shift();

      this.running++;

      this.execute(item);
    }
  }

  async execute(item) {
    try {
      const result = await item.job();

      item.resolve(result);
    } catch (error) {
      item.reject(error);
    } finally {
      this.running--;

      this.process();
    }
  }

  getQueueSize() {
    return this.queue.length;
  }

  getRunningCount() {
    return this.running;
  }
}

const executionQueue = new ExecutionQueue(3);

module.exports = executionQueue;
