
function generateUniqueId() {
    
    const randomPart = Math.random().toString(36).substr(2, 6);
    return 'pixel-' + Date.now() + '-' + randomPart;
  }
  
  
  if (typeof module !== 'undefined') {
    module.exports = { generateUniqueId };
  }
  