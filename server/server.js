import express from 'express';
const app = express();
const port = 3000;

app.set('trust proxy', true);

const pixelMap = new Map();

app.get('/track/:pixelId', (req, res) => {
  const { pixelId } = req.params;
  const ip = req.ip;  
  const ua = req.get('User-Agent') || '';
  const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  const entry = pixelMap.get(pixelId);

  const isGoogleImageProxy = ua.includes('GoogleImageProxy');
  const isGmailScanBot =
    ua.includes('Chrome/42.0') &&
    (ua.includes('Edge/12') || ua.includes('Windows NT 6.1')); 

  if (!entry) {
    
    pixelMap.set(pixelId, {
      senderIP: ip,
      senderUA: ua,
      timestamp: Date.now(),
      receiverLogged: false
    });
    console.log(`Sender pixel registered: id=${pixelId}, ip=${ip}, time=${timestamp}`);
  } else {
    if (!entry.receiverLogged) {
      if (isGmailScanBot) {
        console.log(`Gmail scan bot detected, ignoring open: id=${pixelId}`);
      } else {
        console.log(`Receiver opened email: id=${pixelId}, ip=${ip}, ua=${ua}, time=${timestamp}`);
        pixelMap.set(pixelId, {
          ...entry,
          receiverLogged: true
        });
      }
    }
     else {
      console.log(`Duplicate pixel load ignored: id=${pixelId}`);
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

app.get('/status/:pixelId', (req, res) => {
  const entry = pixelMap.get(req.params.pixelId);

  if (!entry) return res.json({ seen: false });

  res.json({ seen: entry.receiverLogged || false });
});

app.listen(port, () => {
  console.log(`Mail tracker running at http://localhost:${port}/`);
});
