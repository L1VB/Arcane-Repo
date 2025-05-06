document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menuToggle');
  const menuContent = document.getElementById('menuContent');

  if (menuToggle && menuContent) {
      menuToggle.addEventListener('click', function() {
          if (menuContent.style.display === 'block') {
              menuContent.style.display = 'none';
          } else {
              menuContent.style.display = 'block';
          }
      });

      document.addEventListener('click', function(event) {
          if (!menuContent.contains(event.target) && event.target !== menuToggle) {
              menuContent.style.display = 'none';
          }
      });
  }
});
