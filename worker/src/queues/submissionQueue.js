const { Queue } = require("bullmq");

const getRedisConnectionOptions = () => {
  let host = process.env.REDIS_HOST || "127.0.0.1";
  let port = parseInt(process.env.REDIS_PORT) || 6379;
  let password = undefined;

  let rawUri = process.env.REDIS_URI;
  if (rawUri) {
    const cleanUri = rawUri.replace('@HOST:', '@');
    try {
      const parsed = new URL(cleanUri);
      host = parsed.hostname;
      port = parseInt(parsed.port) || 6379;
      if (parsed.password) {
        password = decodeURIComponent(parsed.password);
      }
    } catch (e) {
      console.warn("Failed to parse REDIS_URI in BullMQ Queue config:", e.message);
    }
  }
  return { host, port, password };
};

const submissionQueue = new Queue("submissionQueue", {
  connection: getRedisConnectionOptions()
});

module.exports = submissionQueue;