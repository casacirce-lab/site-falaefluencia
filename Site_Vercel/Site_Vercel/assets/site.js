(function () {
  var b = document.getElementById('menuBtn'), m = document.getElementById('menu');
  if (b && m) b.addEventListener('click', function () { var a = m.classList.toggle('aberto'); b.setAttribute('aria-expanded', a ? 'true' : 'false'); });
})();
