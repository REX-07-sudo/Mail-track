<h1>Firefox Mail Tracker Extension</h1>
<p>A lightweight Firefox extension that tracks when your Gmail emails are opened using a tracking pixel. Built using WebExtension APIs, Node.js, and Express.</p>

<h2>Features Implemented</h2>
<li>Detects when the recipient opens the email</li>
<li>Logs timestamp and pixel ID on the server</li>
<li>Sends a browser notification to the sender when the email is read  </li>
<li>Deduplicates multiple reads and filters sender-side logs</li>
<li>Added a dashboard in extension toolbar where user can see his opened and not opened mails</li>

<h2>Working of the project</h2>
<li>When you compose and send an email in Gmail, the extension injects a hidden 1×1 pixel with a unique ID.</li>
<li>When the recipient opens the email, the pixel is loaded from your Node.js server.</li>
<li>The server logs the access and marks it as "seen".</li>

<h2>Instructions for testing the extension</h2>
<li>Clone this repo on your code editor</li>
<li>Install all the dependencies by npm install</li>
<li>Deploy the server.js file on Render(or any other platform)</li>
<li>Load the firefox extension by going to about:debugging and click "Load Temporary Add-on"</li>
<li>Select the manifest.json file and upload it</li>
<li>Open gmail and start testing by sending mails</li>

<h2>Asumptions for evaluation</h2>
<li>The recipient will open the email in a browser that allows image loading</li>
<li>Gmail will not aggressively cache or proxy the tracking pixel in a way that blocks the server hit</li>
<li>The server is publicly hosted (e.g., via Render) and accessible without requiring authentication</li>
<li>Gmail continues to use accessible aria-label attributes like "Send" and "Message Body" to locate DOM elements</li>

<h2>Additional Features</h2>
<li>User-Agent + IP-based sender/receiver filtering</li>
<li>Real-time browser notifications when mail is opened</li>
<li>Automatic unique pixel ID generation</li>
<li>Added dashboard for tracking the time when the mail was opened</li>
