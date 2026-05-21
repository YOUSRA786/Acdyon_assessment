const { createClient } = require("redis");

const rawUri = process.env.REDIS_URI;
const redisUrl = rawUri 
  ? rawUri.replace('@HOST:', '@') 
  : `redis://${process.env.REDIS_HOST || "127.0.0.1"}:${process.env.REDIS_PORT || 6379}`;

const client = createClient({ url: redisUrl });

client.on("error", err => {
  // Silence Redis errors to prevent log spamming
});

client.connect();

module.exports = client;