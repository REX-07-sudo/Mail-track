import express from 'express';
const app = express();
const port = 3000;

const pixelMap = new Map(); 

app.get('/track/:pixelId', (req, res) => {
  const { pixelId } = req.params;
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const ua = req.headers['user-agent'];
  const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  const now = Date.now();
  const threshold = 5000; 

  const entry = pixelMap.get(pixelId);

  if (!entry) {
    
    pixelMap.set(pixelId, {
      senderIP: ip,
      senderUA: ua,
      timestamp: now,
      receiverLogged: false
    });
    console.log(`Sender pixel loaded: id=${pixelId}, ip=${ip}, time=${timestamp}`);
  } else {
    const isSameDevice = ip === entry.senderIP && ua === entry.senderUA;
    const isTooSoon = now - entry.timestamp < threshold;

    if (!entry.receiverLogged && (!isSameDevice || !isTooSoon)) {
      console.log(`Receiver opened mail: id=${pixelId}, ip=${ip}, time=${timestamp}`);
      entry.receiverLogged = true;
    } else {
      console.log(`Duplicate or sender open ignored for id=${pixelId}`);
    }
  }

  res.setHeader('Content-Type', 'image/gif');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  const pixelGif = Buffer.from(
    'R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
    'base64'
  );
  res.send(pixelGif);
});

app.listen(port, () => {
  console.log(`Mail tracker running at http://localhost:${port}/`);
});
