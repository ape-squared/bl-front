// Wait for Givebutter widget to load
window.addEventListener('load', function() {
  // Initialize Givebutter widget with custom styling
  if (window.Givebutter) {
    window.Givebutter.setOptions({
      theme: {
        primary: '#4a90e2',
        background: 'transparent',
        text: '#ffffff'
      },
      strings: {
        donateButtonText: 'Support BuffaloLink',
        defaultDonationAmount: 25
      }
    });
  }
});
