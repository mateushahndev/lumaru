(function() {
  var container = document.getElementById('lumaru-which-eye-cream');
  if (!container) {
    console.warn('[Lumaru Embed] Container #lumaru-which-eye-cream not found');
    return;
  }

  var iframe = document.createElement('iframe');
  iframe.src = '/tools/which-eye-cream-works-for-me?embed=true';
  iframe.style.width = '100%';
  iframe.style.border = 'none';
  iframe.style.overflow = 'hidden';
  iframe.style.backgroundColor = 'transparent';
  iframe.scrolling = 'no';

  window.addEventListener('message', function(e) {
    if (e.data && e.data.type === 'lumaru-resize' && e.data.height) {
      iframe.style.height = e.data.height + 'px';
    }
  });

  container.innerHTML = '';
  container.appendChild(iframe);
})();