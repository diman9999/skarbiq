// Общий скрипт страниц SkarbIQ.
// После выхода в App Store поставьте RELEASED = true — все кнопки «Скачать» на сайте поведут в App Store.
(function () {
  var RELEASED = false;
  var APP_STORE = 'https://apps.apple.com/app/id6816230990';
  var TESTFLIGHT = 'https://testflight.apple.com/join/r9mnDBq1';
  window.SKARBIQ_RELEASED = RELEASED;

  var url = RELEASED ? APP_STORE : TESTFLIGHT;
  document.querySelectorAll('[data-download]').forEach(function (a) { a.href = url; });
  if (RELEASED) {
    document.querySelectorAll('[data-download-label]').forEach(function (s) { s.textContent = 'Скачать в App Store'; });
    var b = document.querySelector('[data-badge]'), bt = document.querySelector('[data-badge-text]');
    if (b) b.textContent = 'НОВОЕ';
    if (bt) bt.textContent = 'Теперь в App Store';
  }

  // Шапка становится матовой при прокрутке
  var nav = document.getElementById('nav');
  if (nav) {
    var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 20); };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }

  // Появление блоков
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('in-view'); });
  }

  // Оглавление: подсветка текущего раздела
  var toc = document.querySelectorAll('.toc a');
  if (toc.length && 'IntersectionObserver' in window) {
    var map = {};
    toc.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        toc.forEach(function (a) { a.classList.remove('on'); });
        var a = map[e.target.id]; if (a) a.classList.add('on');
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    Object.keys(map).forEach(function (id) { var s = document.getElementById(id); if (s) spy.observe(s); });
  }
  // Мобильное оглавление закрывается после перехода
  document.querySelectorAll('.toc-m a').forEach(function (a) { a.addEventListener('click', function () { a.closest('details').open = false; }); });
})();
