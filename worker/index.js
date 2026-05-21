const dns = require('dns');
if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder('ipv4first');
}
if (!globalThis.crypto) {
  globalThis.crypto = require('crypto');
}

// Dummy HTTP server to satisfy Render's port-scanning constraints on Web Services
const http = require('http');
const port = process.env.PORT || 10000;
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Worker Service Online\n');
});
server.listen(port, () => {
  console.log(`[Worker] Dummy web service listening on port ${port} to satisfy Render port scanning.`);
});

console.log("[Worker] Starting Multiplayer Coding Arena BullMQ Worker Service...");
require("./src/workers/submissionWorker");
