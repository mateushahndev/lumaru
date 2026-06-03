(function() {
  var container = document.getElementById('lumaru-type-finder');
  if (!container) {
    console.warn('[Lumaru Embed] Container #lumaru-type-finder not found');
    return;
  }

  var iframe = document.createElement('iframe');
  iframe.src = 'https://lumaruskin.com/tools/dark-circle-type-finder?embed=true';
  iframe.style.width = '100%';
  iframe.style.border = 'none';
  iframe.style.overflow = 'hidden';
  iframe.style.backgroundColor = 'transparent';
  iframe.scrolling = 'no';

  // Listen for resize messages from the iframe
  window.addEventListener('message', function(e) {
    if (e.data && e.data.type === 'lumaru-resize' && e.data.height) {
      iframe.style.height = e.data.height + 'px';
    }
  });

  container.innerHTML = '';
  container.appendChild(iframe);
})();