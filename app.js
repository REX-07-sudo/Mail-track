// Observe Gmail's compose area and inject a tracking pixel
const observer = new MutationObserver(() => {
    const composeAreas = document.querySelectorAll('[aria-label="Message Body"]');
  
    composeAreas.forEach(area => {
      if (area.dataset.pixelInjected) return;
  
      const pixel = document.createElement("img");
      pixel.src = "https://localhost:3000/track?id=UNIQUE_ID";
      pixel.style = "width:1px;height:1px;display:none;";
      area.appendChild(pixel);
  
      area.dataset.pixelInjected = "true";
      console.log("✅ Tracking pixel inserted.");
    });
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  