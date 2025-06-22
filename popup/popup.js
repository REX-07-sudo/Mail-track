
const SERVER_URL = 'https://server-2-u9i6.onrender.com';

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('statusFilter')
          .addEventListener('change', loadEmails);
  loadEmails();
});

async function loadEmails() {
  const tableBody = document.querySelector('#emailTable tbody');
  tableBody.innerHTML = '';

  // Ask the background script for the tracked map
  chrome.runtime.sendMessage({ action: 'getTrackedEmails' }, async ({ tracked }) => {
    // tracked is now   { pixelId1: { subject, receiverEmail }, pixelId2: {...}, … }
    const filter = document.getElementById('statusFilter').value;

    if (!tracked || Object.keys(tracked).length === 0) {
      tableBody.innerHTML = `
        <tr><td colspan="4" style="text-align:center;color:#666">
          No tracked emails found.
        </td></tr>`;
      return;
    }

    
    for (const [pixelId, info] of Object.entries(tracked)) {
      let isSeen = false, seenAt = '-';
      try {
        const res = await fetch(`${SERVER_URL}/status/${pixelId}`);
        const data = await res.json();
        isSeen = !!data.seen;
        if (data.timestamp) seenAt = data.timestamp;
      } catch (e) {
        console.error('Status fetch error', pixelId, e);
      }

      
      if ((filter === 'opened'     && !isSeen) ||
          (filter === 'not-opened' &&  isSeen)) {
        continue;
      }

      
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${info.receiverEmail||'-'}</td>
        <td>${info.subject||'-'}</td>
        <td style="text-align:center">
          <span style="color:${isSeen?'green':'gray'};font-size:1.2em">
            ${isSeen?'seen':'not seen'}
          </span>
        </td>
        <td>${seenAt}</td>
      `;
      tableBody.appendChild(row);
    }
  });
}
