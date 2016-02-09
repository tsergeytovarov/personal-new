'use strict';

(function() {
  var menuOpen = document.querySelector('.hamburger');
  var modalMenu = document.querySelector('.menu-overlay');
  menuOpen.addEventListener('click', function(evt) {
    evt.preventDefault();
    if (menuOpen.classList.contains('active')) {
      menuOpen.classList.remove('active');
      modalMenu.classList.remove('active');
    } else {
      menuOpen.classList.add('active');
      modalMenu.classList.add('active');
    }
  });
})();
