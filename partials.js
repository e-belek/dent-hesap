// ponytail: no build step on this static site, so shared navbar/footer are
// injected client-side via fetch instead of duplicating markup in every page.
(function () {
  function include(id, url, onDone) {
    var el = document.getElementById(id);
    if (!el) return;
    fetch(url)
      .then(function (r) { return r.text(); })
      .then(function (html) {
        el.outerHTML = html;
        if (onDone) onDone();
      });
  }
  include('navbar-include', './partials/navbar.html', function () {
    var here = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.sidebar-links a').forEach(function (a) {
      if (a.getAttribute('href').replace('./', '') === here) {
        a.classList.add('active');
      }
    });
  });
  include('footer-include', './partials/footer.html');
})();
