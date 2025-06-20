

import express from 'express';
const app = express();
const port = 3000;


app.use((req, res, next) => {

  next();
});


app.get('/track/:pixelId', (req, res) => {
  const { pixelId } = req.params;
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  console.log(`Pixel opened: id=${pixelId}, ip=${ip}, time=${timestamp}`);


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
  console.log(`Tracking server listening at http://localhost:${port}/`);
});
