(function () {
  var b = document.getElementById('menuBtn'), m = document.getElementById('menu');
  if (b && m) b.addEventListener('click', function () { var a = m.classList.toggle('aberto'); b.setAttribute('aria-expanded', a ? 'true' : 'false'); });

  // Aviso de cookies com o Modo de Consentimento do Google
  var aviso = document.getElementById('avisoCookies'), CHAVE = 'ff_consentimento';
  function ler() { try { return localStorage.getItem(CHAVE); } catch (e) { return null; } }
  function mostrar(sim) { if (!aviso) return; aviso.hidden = !sim; document.body.classList.toggle('com-aviso', sim); }
  function escolher(valor) {
    try { localStorage.setItem(CHAVE, valor); } catch (e) {}
    var v = valor === 'aceito' ? 'granted' : 'denied';
    if (typeof gtag === 'function') gtag('consent', 'update', { analytics_storage: v, ad_storage: v, ad_user_data: v, ad_personalization: v });
    if (valor !== 'aceito') {
      // apaga cookies do Google Analytics gravados antes
      var dom = location.hostname.replace(/^www[.]/, '');
      document.cookie.split(';').forEach(function (c) {
        var n = c.split('=')[0].trim();
        if (/^_ga/.test(n)) ['', '; domain=' + dom, '; domain=.' + dom].forEach(function (d) { document.cookie = n + '=; Max-Age=0; path=/' + d; });
      });
    }
    (window.dataLayer = window.dataLayer || []).push({ event: 'consentimento_' + valor });
    mostrar(false);
  }
  if (aviso) {
    aviso.addEventListener('click', function (e) { var t = e.target.closest('[data-consentimento]'); if (t) escolher(t.getAttribute('data-consentimento')); });
    if (!ler()) mostrar(true);
  }
  var pref = document.getElementById('prefCookies');
  if (pref) pref.addEventListener('click', function (e) { e.preventDefault(); mostrar(true); });
})();
