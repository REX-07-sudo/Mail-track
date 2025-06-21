
function attachSendHandler(sendBtn) {
  if (sendBtn.dataset.trackingAttached) return; 
  sendBtn.dataset.trackingAttached = 'true';

 
  sendBtn.addEventListener('click', function handler(event) {
    event.preventDefault();
    event.stopPropagation();

    
    const pixelId = generateUniqueId();
    
    const pixelUrl = `https://server-3-8a90.onrender.com/track/${pixelId}`;

    
    const composeBody = document.querySelector('div[contenteditable][aria-label="Message Body"]');
    if (composeBody) {
      const img = document.createElement('img');
      img.src = pixelUrl;  
      img.width = 1;
      img.height = 1;
      img.style.display = 'none'; 
      composeBody.appendChild(img);
      chrome.runtime.sendMessage({
                action:  'trackPixel',
                pixelId: pixelId
               });


    }

    
    sendBtn.removeEventListener('click', handler, true);
    sendBtn.click();  
  }, true);
}


const observer = new MutationObserver(() => {
  
  const sendButtons = document.querySelectorAll('div[role="button"][data-tooltip^="Send"]');
  sendButtons.forEach(attachSendHandler);
});


observer.observe(document.body, { childList: true, subtree: true });

window.addEventListener('load', () => {
  const initialButtons = document.querySelectorAll('div[role="button"][data-tooltip^="Send"]');
  initialButtons.forEach(attachSendHandler);
});
