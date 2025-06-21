<h1>Firefox Mail Tracker Extension</h1>
<p>A lightweight Firefox extension that tracks when your Gmail emails are opened using a tracking pixel. Built using WebExtension APIs, Node.js, and Express. Major challenges I faced during the project was filtering out sender side rendering logs and image caching by gmail.</p>

<h2>Features Implemented</h2>
<li>Detects when the recipient opens the email</li>
<li>Logs IP address, timestamp, and pixel ID on the server</li>
<li>Sends a browser notification to the sender when the email is read (Currently working on it) </li>
<li>Deduplicates multiple reads and filters sender-side logs</li>

<h2>Working of the project</h2>
<li>When you compose and send an email in Gmail, the extension injects a hidden 1×1 pixel with a unique ID.</li>
<li>When the recipient opens the email, the pixel is loaded from your Node.js server.</li>
<li>The server logs the access and marks it as "seen".</li>
