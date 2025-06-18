import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get('/track', (req, res) => {
  const id = req.query.id || 'unknown';
  const timestamp = new Date().toISOString();
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  const logEntry = `Mail Opened - ID: ${id} | Time: ${timestamp} | IP: ${ip}\n`;
  fs.appendFileSync('track.txt', logEntry);

  // Send 1x1 pixel image
  const pixelPath = path.join(__dirname, 'test.png');
  res.sendFile(pixelPath);
});

app.listen(PORT, () => {
  console.log(`✅Mail Tracker server running at http://localhost:${PORT}/track?id=example`);
});
